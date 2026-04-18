# NoveShop

NoveShop 是一个面向数字商品、卡密、兑换码与自动发货场景的多店铺商城前台与履约中台。  
NoveShop is a multi-storefront commerce and fulfillment system built for digital goods, license keys, redemption codes, and automatic delivery flows.

它负责商品展示、SKU 与库存管理、游客下单、订单查询、支付状态同步，以及支付成功后的自动发卡；支付链路本身由配套项目 `NovaPay` 提供。  
It handles product presentation, SKU and inventory management, guest checkout, order lookup, payment status synchronization, and automatic card delivery after successful payment, while the payment gateway itself is provided by the companion project `NovaPay`.

## 项目定位 / What NoveShop Is

如果把整套系统拆开来看：  
If you look at the full stack as two separate systems:

- `NoveShop` 负责商品、店铺、订单、库存、卡密履约  
  `NoveShop` owns products, storefronts, orders, inventory, and digital fulfillment
- `NovaPay` 负责多商户支付、签名 API、通道实例、回调重试、退款与财务流水  
  `NovaPay` owns multi-merchant payments, signed APIs, channel instances, callback retries, refunds, and payment operations

这两个项目可以分开部署，也可以放在同一台服务器上协同工作。  
The two projects can be deployed separately or run together on the same server.

## 当前能力 / Current Capabilities

- 平台官方店与商户独立店铺前台  
  Platform storefront plus isolated merchant storefronts
- 商品、SKU、库存与卡密管理  
  Product, SKU, stock, and secret/card inventory management
- 游客邮箱下单与公开查单  
  Guest checkout with email and public order lookup
- 多支付方式展示与默认支付方式配置  
  Multiple checkout methods with configurable default payment channel
- 对接 `NovaPay` 创建支付单、刷新支付状态、接收异步回调  
  Integration with `NovaPay` for payment creation, status refresh, and async callbacks
- 支付成功后自动发货，并在订单页展示卡密  
  Automatic delivery after successful payment, with secrets shown on the order page
- 管理后台与商户后台  
  Admin console and merchant console
- 开发环境 SQLite，生产环境 PostgreSQL / MySQL  
  SQLite for development, PostgreSQL / MySQL for production

## 适用场景 / Typical Use Cases

- 数字商品售卖  
  Selling digital goods
- 卡密、兑换码、账号发放  
  Delivering keys, redemption codes, or account credentials
- 平台直营 + 商户自营混合商城  
  Mixed platform-operated and merchant-operated storefronts
- 需要把商城前台和支付网关拆开的系统  
  Systems that want storefront and payment gateway responsibilities separated

## 技术栈 / Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Prisma 7
- SQLite / PostgreSQL / MySQL

## 快速开始 / Quick Start

### 1. 安装依赖 / Install dependencies

```bash
npm install
```

### 2. 复制环境变量 / Copy environment variables

```bash
cp .env.example .env
```

### 3. 至少确认以下配置 / At minimum, confirm these settings

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

关键说明 / Notes:

- `NOVAPAY_BASE_URL` 必须指向可访问的 `NovaPay` 服务  
  `NOVAPAY_BASE_URL` must point to a reachable `NovaPay` service
- `SHOP_PUBLIC_BASE_URL` 必须能被 `NovaPay` 浏览器返回与服务端回调访问到  
  `SHOP_PUBLIC_BASE_URL` must be reachable by both `NovaPay` browser returns and server-side callbacks
- `NOVAPAY_MERCHANT_CODE / API_KEY / API_SECRET / NOTIFY_SECRET` 只建议作为单商户开发兜底配置  
  `NOVAPAY_MERCHANT_CODE / API_KEY / API_SECRET / NOTIFY_SECRET` are best treated as single-merchant development fallback values only
- 正式环境更推荐 `ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP="false"`，改为在后台维护支付配置  
  In production, prefer `ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP="false"` and manage payment profiles in the admin UI

### 4. 初始化本地数据库 / Initialize the local database

```bash
npm run db:init
```

如需快速生成演示数据：  
If you want demo data quickly:

```bash
npm run db:seed-demo
```

### 5. 启动开发环境 / Start the development server

```bash
npm run dev
```

### 6. 打开这些页面 / Open these pages

```text
http://localhost:3001
http://localhost:3001/store/platform
http://localhost:3001/admin/login
http://localhost:3001/query
```

## 推荐联调顺序 / Suggested Integration Flow

1. 先启动 `NovaPay`  
   Start `NovaPay` first
2. 在 `NovaPay` 后台创建并启用至少一个可用商户与支付通道  
   Create and enable at least one merchant and payment channel in `NovaPay`
3. 回到 `NoveShop` 后台创建商品、SKU 并导入卡密  
   Create products and SKUs in `NoveShop`, then import card inventory
4. 在店铺前台发起下单并跳转到 `NovaPay`  
   Create an order from the storefront and jump into `NovaPay`
5. 支付成功后检查 `/orders/{token}` 是否自动显示卡密  
   After successful payment, verify that `/orders/{token}` shows delivered secrets automatically

## 常用命令 / Common Commands

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

## 数据库策略 / Database Strategy

- 开发阶段：默认使用 SQLite，方便快速启动  
  Development: SQLite is the default for fast startup
- 生产阶段：推荐 PostgreSQL 或 MySQL  
  Production: PostgreSQL or MySQL is recommended
- 若已有 SQLite 历史数据，可先迁移到目标数据库，再上线正式环境  
  If you already have SQLite data, migrate it to the target database before production rollout

## 生产部署 / Production Deployment

正式环境建议不要继续使用 SQLite，也不建议长期依赖环境变量里的单商户兜底支付配置。  
For production, do not keep using SQLite and do not rely on single-merchant environment fallbacks long term.

推荐步骤 / Recommended flow:

1. 切换到 PostgreSQL 或 MySQL  
   Move to PostgreSQL or MySQL
2. 如有历史 SQLite 数据，执行 `npm run db:migrate:sqlite-to-target`  
   If you have historical SQLite data, run `npm run db:migrate:sqlite-to-target`
3. 对历史敏感数据执行 `npm run security:encrypt-data`  
   Encrypt historical sensitive data with `npm run security:encrypt-data`
4. 执行 `npm run env:check:prod`  
   Run `npm run env:check:prod`
5. 执行 `npm run build && npm run start`  
   Run `npm run build && npm run start`

如果你使用 Docker 或分层部署，可以直接参考这些文档：  
If you use Docker or layered deployment, start with these docs:

- [生产运行手册 / Production Runbook](./docs/production-runbook.md)
- [Docker 全栈部署 / Full Docker Deployment](./docs/docker-full-compose-deploy.md)
- [Docker + 宿主 PostgreSQL 部署 / Docker with Host PostgreSQL](./docs/docker-host-postgres-deploy.md)
- [本机 PostgreSQL 栈部署 / Local PostgreSQL Stack Deployment](./docs/server-local-postgres-stack-deploy.md)

## 和 NovaPay 的关系 / Relationship to NovaPay

`NoveShop` 不自己实现支付网关，而是把支付职责交给 `NovaPay`。  
`NoveShop` does not implement its own payment gateway. It delegates payment responsibilities to `NovaPay`.

- NoveShop 发起订单  
  NoveShop creates the commerce order
- NovaPay 负责签名、下单、通道路由、托管支付页、回调与退款  
  NovaPay handles signing, upstream payment creation, channel routing, hosted checkout pages, callbacks, and refunds
- 支付完成后，NoveShop 再根据结果自动发货  
  After payment completion, NoveShop fulfills the order automatically

如果你要单独开源或单独部署商城前台，这种拆分会更清晰。  
If you want to open-source or deploy the storefront independently, this split keeps responsibilities clean.

## 开源发布注意事项 / Open Source Publishing Notes

公开发布时请不要提交以下内容：  
Do not commit the following when publishing the repository publicly:

- 真实 `.env`  
  Real `.env` files
- 真实支付商户号 / API 密钥 / 回调密钥  
  Real payment merchant IDs, API keys, or callback secrets
- 真实卡密库存  
  Real digital inventory / secret stock
- 生产数据库文件或导出  
  Production database files or exports

建议只保留：  
Recommended public content includes:

- 示例配置  
  Example configuration
- 数据库结构  
  Database schema
- 演示数据脚本  
  Demo seed scripts
- 部署文档  
  Deployment docs

## 相关项目 / Related Project

- `NovaPay`：多商户支付网关、商户 API、回调与退款中台  
  `NovaPay`: multi-merchant payment gateway, merchant API layer, callbacks, and refund operations
