# NoveShop Production Runbook

## 目标

这份文档用于把 NoveShop 从本地 SQLite 预览切换到正式生产环境。

当前推荐形态：

- 应用：`npm run build` + `npm run start`
- 数据库：PostgreSQL 或 MySQL
- 支付配置：优先在后台维护 NovaPay 收款商户，不依赖环境变量兜底

## 1. 准备生产环境变量

复制生产示例：

```bash
cp .env.production.example .env
```

如果应用和 PostgreSQL 都准备使用 Docker Compose，建议改用：

```bash
cp .env.docker-compose.example .env
```

如果数据库直接装在服务器本机，可以直接使用：

```bash
cp .env.server-local.example .env
```

如果应用准备使用 Docker、数据库仍然使用服务器本机 PostgreSQL，建议改用：

```bash
cp .env.docker-host-db.example .env
```

整套 `NoveShop + NovaPay` 的服务器本机 PostgreSQL 上线命令见：

`docs/server-local-postgres-stack-deploy.md`

如果你要走 Docker 应用 + 本机 PostgreSQL，请直接参考：

`docs/docker-host-postgres-deploy.md`

至少确认这些值：

```bash
DATABASE_URL="postgresql://..."
SHOP_PUBLIC_BASE_URL="https://shop.example.com"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="..."
ADMIN_SESSION_SECRET="..."
MERCHANT_SESSION_SECRET="..."
DATA_ENCRYPTION_KEY="..."
NOVAPAY_BASE_URL="https://pay.example.com"
ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP="false"
```

说明：

- `DATABASE_URL` 正式环境不要再使用 SQLite
- `ADMIN_PASSWORD_HASH` 可通过 `npm run security:hash-admin` 生成
- `NOVAPAY_BASE_URL` 指向正式 NovaPay 域名
- `ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP` 建议保持 `false`，改为后台维护多商户收款配置

## 2. 初始化目标数据库

生成 Prisma Client：

```bash
npm install
npm run db:generate
```

如果目标库是全新空库，先推送结构：

```bash
npm run db:push:postgres
```

如使用 MySQL：

```bash
npm run db:push:mysql
```

## 3. 从 SQLite 迁移到目标库

如果当前已有 SQLite 运营数据，执行：

```bash
TARGET_DATABASE_URL="postgresql://..." npm run db:migrate:sqlite-to-target
```

如需覆盖一个空目标库，可追加：

```bash
CLEAR_TARGET=true
```

## 4. 加密历史敏感数据

如果旧数据里还存在明文支付密钥或卡密，执行一次：

```bash
npm run security:encrypt-data
```

## 5. 生产预检

```bash
npm run env:check:prod
```

预检会检查：

- 当前数据库不是 SQLite
- 数据库可连通
- 至少存在一个可用的支付商户，或显式允许 env 级兜底
- 站点与 NovaPay 公网地址已配置

## 6. 发布应用

```bash
npm run build
npm run start
```

### Docker Compose

仓库已提供单机部署示例：

先确认当前机器使用的是官方 `Docker Engine + Docker Compose v2`。
如果命令输出里出现 `Emulate Docker CLI using podman` 或 `Executing external compose provider "/usr/bin/docker-compose"`，说明当前跑的是 `podman` 兼容层或旧版 `docker-compose v1`，需要先切回官方 Docker，再执行下面的命令。

```bash
docker compose -f deploy/docker-compose.prod.yml --profile ops run --rm db-push
docker compose -f deploy/docker-compose.prod.yml --profile ops run --rm preflight
docker compose -f deploy/docker-compose.prod.yml up -d web
```

如果希望连同内置 PostgreSQL 一起启动：

```bash
docker compose -f deploy/docker-compose.prod.yml up -d postgres web
```

如果使用 Compose 里自带的 PostgreSQL，请把 `DATABASE_URL` 改成容器内地址，例如：

```bash
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/noveshop?schema=public"
```

也可以直接从：

```bash
cp .env.docker-compose.example .env
```

开始。

如果数据库是服务器本机 PostgreSQL，请改用：

```bash
docker compose -f deploy/docker-compose.host-db.yml --profile ops run --rm db-push
docker compose -f deploy/docker-compose.host-db.yml --profile ops run --rm preflight
docker compose -f deploy/docker-compose.host-db.yml up -d web
```

### PM2

仓库也提供了 `ecosystem.config.cjs`：

```bash
pm2 start ecosystem.config.cjs
pm2 save
```

## 7. 上线后检查

建议至少确认：

1. `GET /api/health` 返回数据库可达
2. 后台管理员可登录
3. 至少一个支付商户处于启用状态
4. 前台商品可下单并跳转 NovaPay
5. 支付完成后 `/orders/[token]` 能自动发卡
