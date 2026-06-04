#!/usr/bin/env bash
set -euo pipefail

cd /srv/NoveShop
LOG=/srv/NoveShop/backups/deploy.log
COMPOSE="docker compose -f deploy/docker-compose.prod.yml"

echo "===== DEPLOY START $(date -u +%FT%TZ) =====" >"$LOG"

if [ ! -f /swapfile-build ]; then
  echo "[0/4] creating temp swap..." >>"$LOG"
  dd if=/dev/zero of=/swapfile-build bs=1M count=4096 status=none
  chmod 600 /swapfile-build
  mkswap /swapfile-build >>"$LOG" 2>&1
  swapon /swapfile-build >>"$LOG" 2>&1
fi

echo "[1/4] pulling latest code..." >>"$LOG"
git fetch origin >>"$LOG" 2>&1
git merge --ff-only origin/main >>"$LOG" 2>&1
git log --oneline -1 >>"$LOG" 2>&1

echo "[2/4] building web image..." >>"$LOG"
$COMPOSE build web >>"$LOG" 2>&1

echo "[3/4] recreating web container..." >>"$LOG"
$COMPOSE up -d --force-recreate web >>"$LOG" 2>&1

echo "[4/4] waiting for health..." >>"$LOG"
for i in $(seq 1 40); do
  status=$(docker inspect -f '{{.State.Health.Status}}' noveshop-web-1 2>/dev/null || echo "none")
  echo "  health check $i: $status" >>"$LOG"
  if [ "$status" = "healthy" ]; then
    break
  fi
  sleep 5
done

echo "===== health endpoint =====" >>"$LOG"
curl -sS http://127.0.0.1:3001/api/health >>"$LOG" 2>&1 || echo "curl failed" >>"$LOG"
echo >>"$LOG"

swapoff /swapfile-build >>"$LOG" 2>&1 || true
rm -f /swapfile-build
echo "===== DEPLOY DONE $(date -u +%FT%TZ) =====" >>"$LOG"
