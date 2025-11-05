# -------------------
# Step 1 : base
# -------------------
FROM node:22-slim AS base
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libc6 \
    git \
    openssl
WORKDIR /app
EXPOSE 3000

# -------------------
# Step 2 : builder
# -------------------
FROM base AS builder
WORKDIR /app
COPY package*.json ./

# Install dependencies
COPY . .
RUN npm install

# Build Next.js
RUN npm run build

# -------------------
# Step 3 : production
# -------------------
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

CMD ["npm", "run", "start"]

# -------------------
# Step 4 : dev
# -------------------
FROM base AS dev
WORKDIR /app

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

COPY package*.json ./
RUN npm install
COPY . .

# RUN npx prisma generate

CMD ["npm", "run", "dev"]