FROM node:20-bookworm

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY scripts/render-prisma-provider-schemas.ts ./scripts/render-prisma-provider-schemas.ts
RUN npm ci

COPY . .

RUN npm run db:generate
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3001

CMD ["npm", "run", "start"]
