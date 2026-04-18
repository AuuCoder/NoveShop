import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

function resolveDatabaseFile(rawUrl: string) {
  const normalized = rawUrl.startsWith("file:") ? rawUrl.slice("file:".length) : rawUrl;
  return path.isAbsolute(normalized) ? normalized : path.resolve(process.cwd(), normalized);
}

function columnExists(db: Database.Database, table: string, column: string) {
  const rows = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  return rows.some((row) => row.name === column);
}

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const databaseFile = resolveDatabaseFile(databaseUrl);

fs.mkdirSync(path.dirname(databaseFile), { recursive: true });

const db = new Database(databaseFile);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS Product (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  description TEXT,
  priceCents INTEGER NOT NULL,
  saleMode TEXT NOT NULL DEFAULT 'SINGLE' CHECK (saleMode IN ('SINGLE', 'MULTI')),
  paymentProfileId TEXT,
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ACTIVE', 'ARCHIVED')),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ProductSku (
  id TEXT PRIMARY KEY NOT NULL,
  productId TEXT NOT NULL,
  name TEXT NOT NULL,
  summary TEXT,
  priceCents INTEGER NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1)),
  sortOrder INTEGER NOT NULL DEFAULT 0,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS MerchantAccount (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  passwordHash TEXT NOT NULL,
  isActive INTEGER NOT NULL DEFAULT 1 CHECK (isActive IN (0, 1)),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS PaymentProfile (
  id TEXT PRIMARY KEY NOT NULL,
  ownerId TEXT,
  name TEXT NOT NULL,
  merchantCode TEXT NOT NULL,
  apiKey TEXT NOT NULL,
  apiSecret TEXT NOT NULL,
  notifySecret TEXT,
  defaultChannelCode TEXT NOT NULL,
  enabledChannelCodes TEXT,
  isActive INTEGER NOT NULL DEFAULT 1 CHECK (isActive IN (0, 1)),
  isDefault INTEGER NOT NULL DEFAULT 0 CHECK (isDefault IN (0, 1)),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ownerId) REFERENCES MerchantAccount(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ShopOrder (
  id TEXT PRIMARY KEY NOT NULL,
  orderNo TEXT NOT NULL UNIQUE,
  publicToken TEXT NOT NULL UNIQUE,
  productId TEXT NOT NULL,
  paymentProfileId TEXT,
  skuId TEXT,
  quantity INTEGER NOT NULL,
  customerEmail TEXT NOT NULL,
  amountCents INTEGER NOT NULL,
  channelCode TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING_PAYMENT' CHECK (status IN ('PENDING_PAYMENT', 'FULFILLED', 'FAILED', 'EXPIRED')),
  novapayOrderId TEXT,
  novapayStatus TEXT,
  checkoutUrl TEXT,
  hostedCheckoutUrl TEXT,
  failureMessage TEXT,
  expiresAt DATETIME NOT NULL,
  paidAt DATETIME,
  fulfilledAt DATETIME,
  lastSyncedAt DATETIME,
  lastNovaCreateResponse TEXT,
  lastNovaPayload TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ShopPaymentAttempt (
  id TEXT PRIMARY KEY NOT NULL,
  shopOrderId TEXT NOT NULL,
  externalOrderId TEXT NOT NULL UNIQUE,
  novapayOrderId TEXT,
  merchantChannelAccountId TEXT,
  channelCode TEXT NOT NULL,
  amountCents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'CREATED'
    CHECK (status IN ('CREATED', 'PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED')),
  checkoutUrl TEXT,
  hostedCheckoutUrl TEXT,
  expiresAt DATETIME,
  callbackEventId TEXT,
  traceId TEXT NOT NULL,
  createRequestPayload TEXT,
  createResponsePayload TEXT,
  lastRemotePayload TEXT,
  lastSyncedAt DATETIME,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shopOrderId) REFERENCES ShopOrder(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS WebhookEventLog (
  id TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL,
  externalEventId TEXT NOT NULL,
  externalOrderId TEXT,
  eventType TEXT NOT NULL,
  traceId TEXT,
  signatureValid INTEGER NOT NULL CHECK (signatureValid IN (0, 1)),
  requestHeaders TEXT,
  requestBody TEXT NOT NULL,
  processingStatus TEXT NOT NULL,
  processingError TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS OrderSyncTask (
  id TEXT PRIMARY KEY NOT NULL,
  taskType TEXT NOT NULL,
  shopOrderId TEXT,
  paymentAttemptId TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED')),
  scheduledAt DATETIME NOT NULL,
  startedAt DATETIME,
  finishedAt DATETIME,
  retryCount INTEGER NOT NULL DEFAULT 0,
  lastError TEXT,
  payload TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shopOrderId) REFERENCES ShopOrder(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (paymentAttemptId) REFERENCES ShopPaymentAttempt(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS CardItem (
  id TEXT PRIMARY KEY NOT NULL,
  productId TEXT NOT NULL,
  skuId TEXT,
  batchName TEXT,
  secret TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'RESERVED', 'SOLD')),
  orderId TEXT,
  reservedAt DATETIME,
  soldAt DATETIME,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (orderId) REFERENCES ShopOrder(id) ON DELETE SET NULL ON UPDATE CASCADE
);
`);

if (!columnExists(db, "CardItem", "skuId")) {
  db.exec(`ALTER TABLE CardItem ADD COLUMN skuId TEXT;`);
}

if (!columnExists(db, "Product", "saleMode")) {
  db.exec(`ALTER TABLE Product ADD COLUMN saleMode TEXT NOT NULL DEFAULT 'SINGLE';`);
}

if (!columnExists(db, "Product", "paymentProfileId")) {
  db.exec(`ALTER TABLE Product ADD COLUMN paymentProfileId TEXT;`);
}

if (!columnExists(db, "ShopOrder", "skuId")) {
  db.exec(`ALTER TABLE ShopOrder ADD COLUMN skuId TEXT;`);
}

if (!columnExists(db, "ShopOrder", "paymentProfileId")) {
  db.exec(`ALTER TABLE ShopOrder ADD COLUMN paymentProfileId TEXT;`);
}

if (!columnExists(db, "PaymentProfile", "name")) {
  db.exec(`ALTER TABLE PaymentProfile ADD COLUMN name TEXT;`);
}

if (!columnExists(db, "PaymentProfile", "isDefault")) {
  db.exec(`ALTER TABLE PaymentProfile ADD COLUMN isDefault INTEGER NOT NULL DEFAULT 0;`);
}

if (!columnExists(db, "PaymentProfile", "ownerId")) {
  db.exec(`ALTER TABLE PaymentProfile ADD COLUMN ownerId TEXT;`);
}

if (!columnExists(db, "PaymentProfile", "enabledChannelCodes")) {
  db.exec(`ALTER TABLE PaymentProfile ADD COLUMN enabledChannelCodes TEXT;`);
}

if (!columnExists(db, "WebhookEventLog", "externalOrderId")) {
  db.exec(`ALTER TABLE WebhookEventLog ADD COLUMN externalOrderId TEXT;`);
}

const envMerchantCode = process.env.NOVAPAY_MERCHANT_CODE?.trim() ?? "";
const envApiKey = process.env.NOVAPAY_API_KEY?.trim() ?? "";
const envApiSecret = process.env.NOVAPAY_API_SECRET?.trim() ?? "";
const envNotifySecret = process.env.NOVAPAY_NOTIFY_SECRET?.trim() || null;
const envDefaultChannelCode = process.env.DEFAULT_CHANNEL_CODE?.trim() || "alipay.page";
const allowEnvPaymentProfileBootstrap =
  process.env.ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP === "true" ||
  (process.env.NODE_ENV !== "production" &&
    Boolean(envMerchantCode && envApiKey && envApiSecret));

if (allowEnvPaymentProfileBootstrap && envMerchantCode && envApiKey && envApiSecret) {
  db.prepare(`
    INSERT INTO PaymentProfile (
      id,
      name,
      merchantCode,
      apiKey,
      apiSecret,
      notifySecret,
      defaultChannelCode,
      enabledChannelCodes,
      isActive,
      isDefault,
      createdAt,
      updatedAt
    )
    SELECT
      'paycfg_' || lower(hex(randomblob(12))),
      '环境默认商户',
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      1,
      1,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    WHERE NOT EXISTS (SELECT 1 FROM PaymentProfile);
  `).run(
    envMerchantCode,
    envApiKey,
    envApiSecret,
    envNotifySecret,
    envDefaultChannelCode,
    envDefaultChannelCode,
  );
}

db.exec(`
UPDATE PaymentProfile
SET name = COALESCE(NULLIF(name, ''), merchantCode, '默认商户');

UPDATE PaymentProfile
SET isDefault = 0
WHERE isDefault IS NULL;

UPDATE PaymentProfile
SET isDefault = 0
WHERE isActive != 1;

UPDATE PaymentProfile
SET isDefault = 1
WHERE id = (
  SELECT PaymentProfile.id
  FROM PaymentProfile
  WHERE PaymentProfile.isActive = 1
  ORDER BY PaymentProfile.updatedAt DESC, PaymentProfile.createdAt DESC
  LIMIT 1
)
AND NOT EXISTS (
  SELECT 1
  FROM PaymentProfile AS ExistingDefault
  WHERE ExistingDefault.isActive = 1
    AND ExistingDefault.isDefault = 1
);

INSERT INTO ProductSku (id, productId, name, summary, priceCents, enabled, sortOrder, createdAt, updatedAt)
SELECT
  'sku_' || lower(hex(randomblob(12))),
  Product.id,
  '默认规格',
  '由旧版单规格商品自动迁移',
  Product.priceCents,
  1,
  0,
  Product.createdAt,
  CURRENT_TIMESTAMP
FROM Product
LEFT JOIN ProductSku ON ProductSku.productId = Product.id
WHERE ProductSku.id IS NULL;

UPDATE CardItem
SET skuId = (
  SELECT ProductSku.id
  FROM ProductSku
  WHERE ProductSku.productId = CardItem.productId
  ORDER BY ProductSku.sortOrder ASC, ProductSku.createdAt ASC
  LIMIT 1
)
WHERE skuId IS NULL OR skuId = '';

UPDATE ShopOrder
SET skuId = (
  SELECT ProductSku.id
  FROM ProductSku
  WHERE ProductSku.productId = ShopOrder.productId
  ORDER BY ProductSku.sortOrder ASC, ProductSku.createdAt ASC
  LIMIT 1
)
WHERE skuId IS NULL OR skuId = '';

UPDATE ShopOrder
SET paymentProfileId = (
  SELECT PaymentProfile.id
  FROM PaymentProfile
  WHERE PaymentProfile.isActive = 1
  ORDER BY PaymentProfile.updatedAt DESC, PaymentProfile.createdAt DESC
  LIMIT 1
)
WHERE (paymentProfileId IS NULL OR paymentProfileId = '')
  AND EXISTS (SELECT 1 FROM PaymentProfile WHERE PaymentProfile.isActive = 1);

UPDATE Product
SET paymentProfileId = (
  SELECT PaymentProfile.id
  FROM PaymentProfile
  WHERE PaymentProfile.isActive = 1
  ORDER BY PaymentProfile.isDefault DESC, PaymentProfile.updatedAt DESC, PaymentProfile.createdAt DESC
  LIMIT 1
)
WHERE (paymentProfileId IS NULL OR paymentProfileId = '')
  AND EXISTS (SELECT 1 FROM PaymentProfile WHERE PaymentProfile.isActive = 1);

INSERT INTO ShopPaymentAttempt (
  id,
  shopOrderId,
  externalOrderId,
  novapayOrderId,
  merchantChannelAccountId,
  channelCode,
  amountCents,
  status,
  checkoutUrl,
  hostedCheckoutUrl,
  expiresAt,
  callbackEventId,
  traceId,
  createRequestPayload,
  createResponsePayload,
  lastRemotePayload,
  lastSyncedAt,
  createdAt,
  updatedAt
)
SELECT
  'pat_' || lower(hex(randomblob(12))),
  ShopOrder.id,
  ShopOrder.orderNo,
  ShopOrder.novapayOrderId,
  NULL,
  ShopOrder.channelCode,
  ShopOrder.amountCents,
  CASE
    WHEN ShopOrder.status = 'FULFILLED' THEN 'SUCCEEDED'
    WHEN ShopOrder.status = 'EXPIRED' THEN 'EXPIRED'
    WHEN ShopOrder.status = 'FAILED' AND ShopOrder.novapayStatus = 'CANCELLED' THEN 'CANCELLED'
    WHEN ShopOrder.status = 'FAILED' THEN 'FAILED'
    WHEN ShopOrder.novapayStatus = 'PROCESSING' THEN 'PROCESSING'
    ELSE 'PENDING'
  END,
  ShopOrder.checkoutUrl,
  ShopOrder.hostedCheckoutUrl,
  ShopOrder.expiresAt,
  NULL,
  'trace_' || lower(hex(randomblob(12))),
  NULL,
  ShopOrder.lastNovaCreateResponse,
  ShopOrder.lastNovaPayload,
  ShopOrder.lastSyncedAt,
  ShopOrder.createdAt,
  CURRENT_TIMESTAMP
FROM ShopOrder
LEFT JOIN ShopPaymentAttempt ON ShopPaymentAttempt.externalOrderId = ShopOrder.orderNo
WHERE ShopPaymentAttempt.id IS NULL;

UPDATE Product
SET saleMode = CASE
  WHEN (
    SELECT COUNT(*)
    FROM ProductSku
    WHERE ProductSku.productId = Product.id
  ) > 1 THEN 'MULTI'
  ELSE 'SINGLE'
END;

UPDATE Product
SET priceCents = COALESCE((
  SELECT MIN(ProductSku.priceCents)
  FROM ProductSku
  WHERE ProductSku.productId = Product.id AND ProductSku.enabled = 1
), priceCents);

CREATE INDEX IF NOT EXISTS Product_status_createdAt_idx ON Product(status, createdAt);
CREATE INDEX IF NOT EXISTS Product_paymentProfileId_createdAt_idx ON Product(paymentProfileId, createdAt);
CREATE INDEX IF NOT EXISTS ProductSku_productId_enabled_sortOrder_createdAt_idx
  ON ProductSku(productId, enabled, sortOrder, createdAt);
CREATE INDEX IF NOT EXISTS ProductSku_productId_sortOrder_createdAt_idx
  ON ProductSku(productId, sortOrder, createdAt);
CREATE UNIQUE INDEX IF NOT EXISTS MerchantAccount_email_key ON MerchantAccount(email);
CREATE INDEX IF NOT EXISTS MerchantAccount_isActive_createdAt_idx ON MerchantAccount(isActive, createdAt);
CREATE UNIQUE INDEX IF NOT EXISTS PaymentProfile_ownerId_key ON PaymentProfile(ownerId);
CREATE INDEX IF NOT EXISTS PaymentProfile_isActive_isDefault_createdAt_idx
  ON PaymentProfile(isActive, isDefault, createdAt);
CREATE INDEX IF NOT EXISTS CardItem_productId_status_createdAt_idx ON CardItem(productId, status, createdAt);
CREATE INDEX IF NOT EXISTS CardItem_skuId_status_createdAt_idx ON CardItem(skuId, status, createdAt);
CREATE INDEX IF NOT EXISTS CardItem_orderId_idx ON CardItem(orderId);
CREATE INDEX IF NOT EXISTS ShopOrder_status_expiresAt_idx ON ShopOrder(status, expiresAt);
CREATE INDEX IF NOT EXISTS ShopOrder_customerEmail_createdAt_idx ON ShopOrder(customerEmail, createdAt);
CREATE INDEX IF NOT EXISTS ShopOrder_productId_createdAt_idx ON ShopOrder(productId, createdAt);
CREATE INDEX IF NOT EXISTS ShopOrder_paymentProfileId_createdAt_idx ON ShopOrder(paymentProfileId, createdAt);
CREATE INDEX IF NOT EXISTS ShopOrder_skuId_createdAt_idx ON ShopOrder(skuId, createdAt);
CREATE INDEX IF NOT EXISTS ShopPaymentAttempt_shopOrderId_createdAt_idx
  ON ShopPaymentAttempt(shopOrderId, createdAt);
CREATE INDEX IF NOT EXISTS ShopPaymentAttempt_status_createdAt_idx
  ON ShopPaymentAttempt(status, createdAt);
CREATE INDEX IF NOT EXISTS ShopPaymentAttempt_merchantChannelAccountId_createdAt_idx
  ON ShopPaymentAttempt(merchantChannelAccountId, createdAt);
CREATE INDEX IF NOT EXISTS ShopPaymentAttempt_traceId_idx
  ON ShopPaymentAttempt(traceId);
CREATE UNIQUE INDEX IF NOT EXISTS WebhookEventLog_provider_externalEventId_key
  ON WebhookEventLog(provider, externalEventId);
CREATE INDEX IF NOT EXISTS WebhookEventLog_eventType_createdAt_idx
  ON WebhookEventLog(eventType, createdAt);
CREATE INDEX IF NOT EXISTS WebhookEventLog_provider_externalOrderId_createdAt_idx
  ON WebhookEventLog(provider, externalOrderId, createdAt);
CREATE INDEX IF NOT EXISTS WebhookEventLog_processingStatus_createdAt_idx
  ON WebhookEventLog(processingStatus, createdAt);
CREATE INDEX IF NOT EXISTS OrderSyncTask_status_scheduledAt_idx
  ON OrderSyncTask(status, scheduledAt);
CREATE INDEX IF NOT EXISTS OrderSyncTask_shopOrderId_status_scheduledAt_idx
  ON OrderSyncTask(shopOrderId, status, scheduledAt);
CREATE INDEX IF NOT EXISTS OrderSyncTask_paymentAttemptId_status_scheduledAt_idx
  ON OrderSyncTask(paymentAttemptId, status, scheduledAt);
`);

db.close();

console.log(`SQLite database initialized at ${databaseFile}`);
