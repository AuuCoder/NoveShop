[English](./README.md)

# NoveShop

NoveShop 是一个面向数字商品、卡密、兑换码与自动发货场景的多店铺商城前台与履约中台。

它负责商品展示、SKU 与库存管理、游客下单、订单查询、支付状态同步，以及支付成功后的自动发卡；支付链路本身由配套项目 `NovaPay` 提供。

## 项目定位

如果把整套系统拆开来看：

- `NoveShop` 负责商品、店铺、订单、库存、卡密履约
- `NovaPay` 负责多商户支付、签名 API、通道实例、回调重试、退款与财务流水

这两个项目可以分开部署，也可以放在同一台服务器上协同工作。

## 当前能力

- 平台官方店与商户独立店铺前台
- 商品、SKU、库存与卡密管理
- 游客邮箱下单与公开查单
- 多支付方式展示与默认支付方式配置
- 对接 `NovaPay` 创建支付单、刷新支付状态、接收异步回调
- 支付成功后自动发货，并在订单页展示卡密
- 管理后台与商户后台
- 开发环境 SQLite，生产环境 PostgreSQL / MySQL

## 适用场景

- 数字商品售卖
- 卡密、兑换码、账号发放
- 平台直营 + 商户自营混合商城
- 需要把商城前台和支付网关拆开的系统

## 技术栈

- Next.js 16
- React 19
- TypeScript 5
- Prisma 7
- SQLite / PostgreSQL / MySQL

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 复制环境变量

```bash
cp .env.example .env
```

### 3. 至少确认以下配置

```bash
DATABASE_URL="file:./prisma/dev.db"
SHOP_PUBLIC_BASE_URL="http://localhost:3001"

ADMIN_USERNAME="admin"
ADMIN_PASSWORD="change-me"
ADMIN_SESSION_SECRET="replace-with-a-long-random-secret"
MERCHANT_SESSION_SECRET="replace-with-a-second-long-random-secret"
DATA_ENCRYPTION_KEY="replace-with-a-32-byte-or-longer-random-secret"

NOVAPAY_BASE_URL="http://localhost:3000"
DEFAULT_CHANNEL_CODE="alipay.page"
ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP="false"
NOVAPAY_MERCHANT_CODE=""
NOVAPAY_API_KEY=""
NOVAPAY_API_SECRET=""
NOVAPAY_NOTIFY_SECRET=""
```

说明：

- `NOVAPAY_BASE_URL` 必须指向可访问的 `NovaPay` 服务。
- `SHOP_PUBLIC_BASE_URL` 必须能被 `NovaPay` 浏览器返回与服务端回调访问到。
- `NOVAPAY_MERCHANT_CODE / API_KEY / API_SECRET / NOTIFY_SECRET` 只建议作为单商户开发兜底配置。
- 正式环境更推荐 `ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP="false"`，改为在后台维护支付配置。

### 4. 初始化本地数据库

```bash
npm run db:init
```

如需快速生成演示数据：

```bash
npm run db:seed-demo
```

### 5. 启动开发环境

```bash
npm run dev
```

### 6. 打开这些页面

```text
http://localhost:3001
http://localhost:3001/store/platform
http://localhost:3001/admin/login
http://localhost:3001/query
```

## 推荐联调顺序

1. 先启动 `NovaPay`
2. 在 `NovaPay` 后台创建并启用至少一个可用商户与支付通道
3. 回到 `NoveShop` 后台创建商品、SKU 并导入卡密
4. 在店铺前台发起下单并跳转到 `NovaPay`
5. 支付成功后检查 `/orders/{token}` 是否自动显示卡密

## 常用命令

```bash
npm run dev
npm run build
npm run lint

npm run db:init
npm run db:seed-demo
npm run db:generate
npm run db:push
npm run db:push:postgres
npm run db:push:mysql
npm run db:migrate:sqlite-to-target

npm run security:encrypt-data
npm run security:hash-admin
npm run env:check:prod
```

## 数据库策略

- 开发阶段：默认使用 SQLite，方便快速启动
- 生产阶段：推荐 PostgreSQL 或 MySQL
- 若已有 SQLite 历史数据，可先迁移到目标数据库，再上线正式环境

## 生产部署

正式环境建议不要继续使用 SQLite，也不建议长期依赖环境变量里的单商户兜底支付配置。

推荐步骤：

1. 切换到 PostgreSQL 或 MySQL
2. 如有历史 SQLite 数据，执行 `npm run db:migrate:sqlite-to-target`
3. 对历史敏感数据执行 `npm run security:encrypt-data`
4. 执行 `npm run env:check:prod`
5. 执行 `npm run build && npm run start`

如果你使用 Docker 或分层部署，可以直接参考这些文档：

- [生产运行手册](./docs/production-runbook.md)
- [Docker 全栈部署](./docs/docker-full-compose-deploy.md)
- [Docker + 宿主 PostgreSQL 部署](./docs/docker-host-postgres-deploy.md)
- [本机 PostgreSQL 栈部署](./docs/server-local-postgres-stack-deploy.md)

## 和 NovaPay 的关系

`NoveShop` 不自己实现支付网关，而是把支付职责交给 `NovaPay`。

- NoveShop 发起订单
- NovaPay 负责签名、下单、通道路由、托管支付页、回调与退款
- 支付完成后，NoveShop 再根据结果自动发货

如果你要单独开源或单独部署商城前台，这种拆分会更清晰。

## 开源发布注意事项

公开发布时请不要提交以下内容：

- 真实 `.env`
- 真实支付商户号 / API 密钥 / 回调密钥
- 真实卡密库存
- 生产数据库文件或导出

建议只保留：

- 示例配置
- 数据库结构
- 演示数据脚本
- 部署文档

## 相关项目

- `NovaPay`：多商户支付网关、商户 API、回调与退款中台
