FROM oven/bun:latest
WORKDIR /app
# Copy config files
COPY package.json bun.lock tsconfig.json prisma.config.ts ./
# Copy prisma schema and migrations
COPY prisma/ ./prisma/
# Copy source code
COPY src/ ./src/
# Install dependencies and generate Prisma client
RUN bun install && bun prisma generate
# Expose port 3000
EXPOSE 3000
# Run migrations then start server
CMD ["sh", "-c", "bun prisma migrate deploy && bun src/index.ts"]