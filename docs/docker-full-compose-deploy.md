# Docker Compose 全容器部署

适用场景：

- `NovaPay` 用 Docker Compose 部署
- `NoveShop` 用 Docker Compose 部署
- 两边的 PostgreSQL 也都放进各自的容器
- 不依赖服务器本机数据库

## 目录约定

- `NovaPay`：`/srv/NovaPay`
- `NoveShop`：`/srv/NoveShop`

## 0. 先确认容器环境

需要使用：

- 官方 `Docker Engine`
- 官方 `Docker Compose v2`

先执行：

```bash
docker --version
docker compose version
```

如果输出里出现下面这些内容，说明当前不是标准 Docker 环境：

- `Emulate Docker CLI using podman`
- `Executing external compose provider "/usr/bin/docker-compose"`

这时先切回官方 Docker，再继续下面步骤。

## 1. 启动 NovaPay

复制生产模板：

```bash
cd /srv/NovaPay
cp .env.docker-compose.example .env
nano .env
```

关键点：

- `DATABASE_URL` 保持为 `postgres`，因为这里连接的是 Compose 里的数据库容器
- `NOVAPAY_POSTGRES_*` 改成正式数据库名、用户名、密码
- `NOVAPAY_PUBLIC_BASE_URL` 改成正式支付域名
- `ADMIN_BOOTSTRAP_*` 改成正式管理员信息

先迁移和预检：

```bash
docker compose -f deploy/docker-compose.prod.yml --profile ops run --rm migrate
docker compose -f deploy/docker-compose.prod.yml --profile ops run --rm preflight
```

启动：

```bash
docker compose -f deploy/docker-compose.prod.yml up -d postgres web callbacks-worker finance-worker
```

## 2. 启动 NoveShop

复制生产模板：

```bash
cd /srv/NoveShop
cp .env.docker-compose.example .env
nano .env
```

关键点：

- `DATABASE_URL` 保持为 `postgres`
- `NOVESHOP_POSTGRES_*` 改成正式数据库名、用户名、密码
- `SHOP_PUBLIC_BASE_URL` 改成正式商城域名
- `NOVAPAY_BASE_URL` 改成正式 `NovaPay` 域名
- `ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP` 生产建议保持 `false`

先构建镜像，再生成后台密码哈希：

```bash
docker compose -f deploy/docker-compose.prod.yml build web
docker compose -f deploy/docker-compose.prod.yml run --rm web npm run security:hash-admin -- 'replace-with-a-strong-password'
```

把上一步输出的哈希填回 `.env` 的 `ADMIN_PASSWORD_HASH`。

如果是新空库：

```bash
docker compose -f deploy/docker-compose.prod.yml --profile ops run --rm db-push
```

如果要迁移旧 SQLite 数据：

```bash
docker compose -f deploy/docker-compose.prod.yml run --rm \
  -e TARGET_DATABASE_URL="postgresql://postgres:replace-with-strong-db-password@postgres:5432/noveshop?schema=public" \
  web npm run db:migrate:sqlite-to-target
```

如果有旧明文敏感数据：

```bash
npm run security:encrypt-data
```

生产预检并启动：

```bash
docker compose -f deploy/docker-compose.prod.yml --profile ops run --rm preflight
docker compose -f deploy/docker-compose.prod.yml up -d postgres web
```

## 3. 查看状态

```bash
docker compose -f /srv/NovaPay/deploy/docker-compose.prod.yml ps
docker compose -f /srv/NoveShop/deploy/docker-compose.prod.yml ps
curl http://127.0.0.1:3000/api/health
curl http://127.0.0.1:3001/api/health
```

## 4. 更新发布

NovaPay：

```bash
cd /srv/NovaPay
docker compose -f deploy/docker-compose.prod.yml build
docker compose -f deploy/docker-compose.prod.yml up -d postgres web callbacks-worker finance-worker
```

NoveShop：

```bash
cd /srv/NoveShop
docker compose -f deploy/docker-compose.prod.yml build
docker compose -f deploy/docker-compose.prod.yml up -d postgres web
```
