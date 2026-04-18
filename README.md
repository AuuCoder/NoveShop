[简体中文](./README.zh-CN.md)

# NoveShop

NoveShop is a multi-storefront commerce and fulfillment system built for digital goods, license keys, redemption codes, and automatic delivery flows.

It handles product presentation, SKU and inventory management, guest checkout, order lookup, payment status synchronization, and automatic card delivery after successful payment, while the payment gateway itself is provided by the companion project `NovaPay`.

## What NoveShop Is

If you look at the full stack as two separate systems:

- `NoveShop` owns products, storefronts, orders, inventory, and digital fulfillment.
- `NovaPay` owns multi-merchant payments, signed APIs, channel instances, callback retries, refunds, and payment operations.

The two projects can be deployed separately or run together on the same server.

## Current Capabilities

- Platform storefront plus isolated merchant storefronts
- Product, SKU, stock, and secret/card inventory management
- Guest checkout with email and public order lookup
- Multiple checkout methods with configurable default payment channel
- Integration with `NovaPay` for payment creation, status refresh, and async callbacks
- Automatic delivery after successful payment, with secrets shown on the order page
- Admin console and merchant console
- SQLite for development, PostgreSQL / MySQL for production

## Typical Use Cases

- Selling digital goods
- Delivering keys, redemption codes, or account credentials
- Mixed platform-operated and merchant-operated storefronts
- Systems that want storefront and payment gateway responsibilities separated

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Prisma 7
- SQLite / PostgreSQL / MySQL

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Copy environment variables

```bash
cp .env.example .env
```

### 3. At minimum, confirm these settings

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

Notes:

- `NOVAPAY_BASE_URL` must point to a reachable `NovaPay` service.
- `SHOP_PUBLIC_BASE_URL` must be reachable by both `NovaPay` browser returns and server-side callbacks.
- `NOVAPAY_MERCHANT_CODE / API_KEY / API_SECRET / NOTIFY_SECRET` are best treated as single-merchant development fallback values only.
- In production, prefer `ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP="false"` and manage payment profiles in the admin UI.

### 4. Initialize the local database

```bash
npm run db:init
```

If you want demo data quickly:

```bash
npm run db:seed-demo
```

### 5. Start the development server

```bash
npm run dev
```

### 6. Open these pages

```text
http://localhost:3001
http://localhost:3001/store/platform
http://localhost:3001/admin/login
http://localhost:3001/query
```

## Suggested Integration Flow

1. Start `NovaPay` first.
2. Create and enable at least one merchant and payment channel in `NovaPay`.
3. Create products and SKUs in `NoveShop`, then import card inventory.
4. Create an order from the storefront and jump into `NovaPay`.
5. After successful payment, verify that `/orders/{token}` shows delivered secrets automatically.

## Common Commands

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

## Database Strategy

- Development: SQLite is the default for fast startup.
- Production: PostgreSQL or MySQL is recommended.
- If you already have SQLite data, migrate it to the target database before production rollout.

## Production Deployment

For production, do not keep using SQLite and do not rely on single-merchant environment fallbacks long term.

Recommended flow:

1. Move to PostgreSQL or MySQL.
2. If you have historical SQLite data, run `npm run db:migrate:sqlite-to-target`.
3. Encrypt historical sensitive data with `npm run security:encrypt-data`.
4. Run `npm run env:check:prod`.
5. Run `npm run build && npm run start`.

If you use Docker or layered deployment, start with these docs:

- [Production Runbook](./docs/production-runbook.md)
- [Full Docker Deployment](./docs/docker-full-compose-deploy.md)
- [Docker with Host PostgreSQL](./docs/docker-host-postgres-deploy.md)
- [Local PostgreSQL Stack Deployment](./docs/server-local-postgres-stack-deploy.md)

## Relationship to NovaPay

`NoveShop` does not implement its own payment gateway. It delegates payment responsibilities to `NovaPay`.

- NoveShop creates the commerce order.
- NovaPay handles signing, upstream payment creation, channel routing, hosted checkout pages, callbacks, and refunds.
- After payment completion, NoveShop fulfills the order automatically.

If you want to open-source or deploy the storefront independently, this split keeps responsibilities clean.

## Open Source Publishing Notes

Do not commit the following when publishing the repository publicly:

- Real `.env` files
- Real payment merchant IDs, API keys, or callback secrets
- Real digital inventory / secret stock
- Production database files or exports

Recommended public content includes:

- Example configuration
- Database schema
- Demo seed scripts
- Deployment docs

## Related Project

- `NovaPay`: multi-merchant payment gateway, merchant API layer, callbacks, and refund operations
