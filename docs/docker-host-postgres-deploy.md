# Docker 部署应用 + 服务器本机 PostgreSQL

适用场景：

- `NovaPay` 和 `NoveShop` 用 Docker 部署
- PostgreSQL 直接安装在服务器本机，不放进容器
- Linux 服务器使用 Docker Engine / Docker Compose

## 目录约定

- `NovaPay`：`/srv/novapay`
- `NoveShop`：`/srv/noveshop`

## 0. 先确认容器环境

这套文档默认要求：

- 使用真正的 `Docker Engine`
- 使用 `Docker Compose v2` 插件
- 不使用 `podman` 兼容层去冒充 `docker`

先执行：

```bash
docker --version
docker compose version
```

如果你看到下面这类输出，就说明当前不是标准 Docker 环境：

- `Emulate Docker CLI using podman`
- `Executing external compose provider "/usr/bin/docker-compose"`
- `docker.errors.DockerException: Error while fetching server API version`

这通常是：

- 机器上实际装的是 `podman-docker`
- 系统调用了旧版 Python `docker-compose v1`
- 当前 `docker compose` 并不是 Docker 官方 Compose v2

建议直接切回官方 Docker：

```bash
sudo apt remove -y podman-docker docker-compose
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
docker compose version
```

确认 `docker compose version` 能正常输出后，再继续下面的迁移和启动命令。

## 1. 准备本机 PostgreSQL

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
```

创建数据库与用户：

```bash
sudo -u postgres psql <<'SQL'
CREATE USER novapay_user WITH PASSWORD 'replace-with-strong-novapay-db-password';
CREATE USER noveshop_user WITH PASSWORD 'replace-with-strong-noveshop-db-password';
CREATE DATABASE novapay OWNER novapay_user;
CREATE DATABASE noveshop OWNER noveshop_user;
\q
SQL
```

## 2. 配置 NovaPay

```bash
cd /srv/novapay
cp .env.docker-host-db.example .env
nano .env
```

关键点：

- `DATABASE_URL` 使用 `host.docker.internal`
- `NOVAPAY_PUBLIC_BASE_URL` 改成你的正式支付域名
- `ADMIN_BOOTSTRAP_*` 改成正式管理员信息

执行迁移与预检：

```bash
docker compose -f deploy/docker-compose.host-db.yml --profile ops run --rm migrate
docker compose -f deploy/docker-compose.host-db.yml --profile ops run --rm preflight
```

启动：

```bash
docker compose -f deploy/docker-compose.host-db.yml up -d web callbacks-worker finance-worker
```

## 3. 配置 NoveShop

先本地生成后台密码哈希：

```bash
cd /srv/noveshop
npm ci
npm run security:hash-admin -- 'replace-with-a-strong-admin-password'
```

复制模板并填写 `.env`：

```bash
cp .env.docker-host-db.example .env
nano .env
```

关键点：

- `DATABASE_URL` 使用 `host.docker.internal`
- `SHOP_PUBLIC_BASE_URL` 改成你的正式商城域名
- `NOVAPAY_BASE_URL` 改成正式 `NovaPay` 域名
- `ADMIN_PASSWORD_HASH` 填入刚刚生成的哈希

如果是新空库：

```bash
docker compose -f deploy/docker-compose.host-db.yml --profile ops run --rm db-push
```

如果要把旧 SQLite 数据迁到本机 PostgreSQL：

```bash
TARGET_DATABASE_URL="postgresql://noveshop_user:replace-with-strong-db-password@host.docker.internal:5432/noveshop?schema=public" npm run db:migrate:sqlite-to-target
```

如果有旧明文敏感数据：

```bash
npm run security:encrypt-data
```

生产预检与启动：

```bash
docker compose -f deploy/docker-compose.host-db.yml --profile ops run --rm preflight
docker compose -f deploy/docker-compose.host-db.yml up -d web
```

## 4. 查看状态

```bash
docker compose -f /srv/novapay/deploy/docker-compose.host-db.yml ps
docker compose -f /srv/noveshop/deploy/docker-compose.host-db.yml ps
curl http://127.0.0.1:3000/api/health
curl http://127.0.0.1:3001/api/health
```

## 5. 更新发布

NovaPay：

```bash
cd /srv/novapay
docker compose -f deploy/docker-compose.host-db.yml build
docker compose -f deploy/docker-compose.host-db.yml up -d web callbacks-worker finance-worker
```

NoveShop：

```bash
cd /srv/noveshop
docker compose -f deploy/docker-compose.host-db.yml build
docker compose -f deploy/docker-compose.host-db.yml up -d web
```
