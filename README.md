# NoveShop

一个面向数字商品和发卡场景的最小中台，支付链路对接同目录下的 `NovaPay`。

当前版本包含：

- 前台商品展示
- 游客邮箱下单
- 订单查询
- NovaPay 下单签名接入
- NovaPay 异步回调验签
- 支付成功自动发卡
- 后台商品管理
- 后台卡密导入
- 后台订单查看

## 环境变量

复制一份示例配置：

```bash
cp .env.example .env
```

开发环境至少确认这些值：

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

- `NOVAPAY_BASE_URL` 始终需要填写为 `NovaPay` 服务地址
- `NOVAPAY_MERCHANT_CODE / API_KEY / API_SECRET / NOTIFY_SECRET` 现在只作为可选单商户兜底配置
- 默认推荐 `ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP="false"`，改为在后台维护平台直营商户和商户自营的支付配置
- `SHOP_PUBLIC_BASE_URL` 要能被 `NovaPay` 回调访问到

## 本地启动

1. 安装依赖

```bash
npm install
```

2. 初始化本地 SQLite 数据库

```bash
npm run db:init
```

3. 启动开发环境

```bash
npm run dev
```

4. 打开页面

```text
http://localhost:3001
http://localhost:3001/admin/login
http://localhost:3001/query
```

## 首次联调建议

1. 先启动 `NovaPay`
2. 在 `NovaPay` 后台确认当前商户已审核通过，并创建好支付通道实例
3. 回到 `NoveShop` 后台创建商品并导入卡密
4. 用前台商品页下单，跳转到 `NovaPay` 支付页
5. 支付成功后检查 `/orders/{token}` 是否已自动发卡

## 生产上线

正式环境建议直接参考 [docs/production-runbook.md](./docs/production-runbook.md)。

核心步骤：

1. 切换到 PostgreSQL 或 MySQL
2. 如有旧 SQLite 数据，执行 `npm run db:migrate:sqlite-to-target`
3. 执行 `npm run security:encrypt-data`
4. 执行 `npm run env:check:prod`
5. 执行 `npm run build && npm run start`

## 备注

- 当前为了保证本机体验，开发环境仍支持 `npm run db:init` 初始化 SQLite
- 正式环境默认禁止 SQLite 启动，且不建议再使用 env 级单商户兜底配置
