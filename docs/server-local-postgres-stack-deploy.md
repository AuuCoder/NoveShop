# NoveShop + NovaPay 服务器本机 PostgreSQL 上线命令

以下示例以 Ubuntu / Debian 服务器为例，假设：

- `NovaPay` 部署目录：`/srv/novapay`
- `NoveShop` 部署目录：`/srv/noveshop`
- 支付域名：`pay.example.com`
- 商城域名：`shop.example.com`
- 数据库安装在同一台服务器本机

## 1. 安装运行环境

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

## 2. 创建 PostgreSQL 用户和数据库

```bash
sudo -u postgres psql <<'SQL'
CREATE USER novapay_user WITH PASSWORD 'replace-with-strong-novapay-db-password';
CREATE USER noveshop_user WITH PASSWORD 'replace-with-strong-noveshop-db-password';
CREATE DATABASE novapay OWNER novapay_user;
CREATE DATABASE noveshop OWNER noveshop_user;
\q
SQL
```

可选检查：

```bash
sudo -u postgres psql -lqt
```

## 3. 准备 NovaPay

```bash
cd /srv/novapay
cp .env.server-local.example .env
nano .env
```

安装依赖并生成客户端：

```bash
npm ci
npm run db:generate
```

执行数据库迁移：

```bash
npm run db:migrate:deploy
```

生产预检：

```bash
npm run env:check:prod
```

构建：

```bash
npm run build
```

使用 PM2 启动：

```bash
pm2 start ecosystem.config.cjs --only novapay-web
pm2 start ecosystem.config.cjs --only novapay-callbacks-worker
pm2 start ecosystem.config.cjs --only novapay-finance-worker
pm2 save
```

## 4. 准备 NoveShop

先为后台密码生成哈希：

```bash
cd /srv/noveshop
npm ci
npm run security:hash-admin -- 'replace-with-a-strong-admin-password'
```

把输出的哈希填入 `.env`：

```bash
cp .env.server-local.example .env
nano .env
```

生成 Prisma Client：

```bash
npm run db:generate
```

如果是全新空库：

```bash
npm run db:push:postgres
```

如果要迁移旧 SQLite 数据：

```bash
TARGET_DATABASE_URL="postgresql://noveshop_user:replace-with-strong-db-password@127.0.0.1:5432/noveshop?schema=public" npm run db:migrate:sqlite-to-target
```

如有历史明文敏感数据，再执行一次：

```bash
npm run security:encrypt-data
```

生产预检：

```bash
npm run env:check:prod
```

构建并启动：

```bash
npm run build
pm2 start ecosystem.config.cjs --only noveshop-web
pm2 save
```

## 5. 配置 PM2 开机自启

```bash
pm2 startup systemd
pm2 save
```

按屏幕提示执行补充命令即可。

## 6. 配置 Nginx 反向代理

NovaPay：

```bash
sudo tee /etc/nginx/sites-available/novapay >/dev/null <<'EOF'
server {
  listen 80;
  server_name pay.example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
  }
}
EOF
```

NoveShop：

```bash
sudo tee /etc/nginx/sites-available/noveshop >/dev/null <<'EOF'
server {
  listen 80;
  server_name shop.example.com;

  location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
  }
}
EOF
```

启用站点：

```bash
sudo ln -sf /etc/nginx/sites-available/novapay /etc/nginx/sites-enabled/novapay
sudo ln -sf /etc/nginx/sites-available/noveshop /etc/nginx/sites-enabled/noveshop
sudo nginx -t
sudo systemctl reload nginx
```

## 7. 首次上线检查

```bash
curl -I http://127.0.0.1:3000
curl -I http://127.0.0.1:3001
curl http://127.0.0.1:3000/api/health
curl http://127.0.0.1:3001/api/health
pm2 status
```

业务检查建议：

1. 先登录 `NovaPay` 后台，创建并审核一个商户，配置至少一个支付通道
2. 再登录 `NoveShop` 后台，创建平台收款商户或商户自营收款配置
3. 创建商品、导入卡密、前台下单、完成支付
4. 检查 `NoveShop` 订单页是否自动发卡
