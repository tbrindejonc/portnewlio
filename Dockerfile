FROM node:22-slim AS base

# -------------------
# Step 1 : dependencies
# -------------------
FROM base AS deps
RUN apt-get update && apt-get install -y libc6-dev gcc g++ make python3
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# -------------------
# Step 2 : builder
# -------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# -------------------
# Step 3 : production image, copy all the files and run next
# -------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs /app/public ./public
COPY --from=builder --chown=nextjs /app/package.json ./package.json
COPY --from=builder --chown=nextjs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs /app/.next ./.next
COPY --from=builder --chown=nextjs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
ENV HOSTNAME="0.0.0.0"
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