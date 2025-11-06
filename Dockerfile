# ---------- BASE ----------
FROM node:20-slim AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --include=dev

# ---------- BUILDER ----------
FROM base AS builder
WORKDIR /app

COPY . .
# Generate Prisma Client
RUN npx prisma generate
RUN npm run build

# ---------- RUNNER ----------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# create non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy only the necessary files with direct ownership
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate
# Create and open rights for Next.js cache (for optimized images)
RUN mkdir -p .next/cache && chmod -R 777 .next/cache

USER nextjs

EXPOSE 3000
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