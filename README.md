# ThinkBox 🧠

A secure backend API for your personal "second brain" — save, organize, and share links, tweets, YouTube videos, and documents.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Setup environment (copy .env.example to .env and fill in)
cp .env.example .env

# Run migrations
bun prisma migrate dev

# Start dev server
bun run dev
```

## 🛠️ Tech Stack

- **Bun** - JavaScript runtime
- **TypeScript** + **Express.js**
- **Prisma** + **PostgreSQL**
- **JWT** + **Bcrypt** - Authentication
- **Zod** - Validation

## 🔐 Features

- JWT authentication with access/refresh tokens
- Token rotation for security
- HTTP-only cookies
- Content CRUD (links, tweets, YouTube, docs)
- Tagging system
- Shareable links (WIP)

## 📚 API Endpoints

### Auth (`/auth`)
- `POST /signup` - Register
- `POST /login` - Login
- `POST /refresh` - Refresh token
- `POST /logout` - Logout
- `GET /me` - Current user

### Content (`/api/v1`)
- `POST /content` - Create
- `GET /content` - List all
- `DELETE /content` - Delete

### Health
- `GET /health` - Server status

## 📝 Environment Variables

```env
DATABASE_URL="postgresql://..."
ACCESS_TOKEN_SECRET="your-secret"
REFRESH_TOKEN_SECRET="your-secret"
CORS_ORIGIN="http://localhost:3000"
NODE_ENV="development"
```

## 📁 Structure

```
src/
├── index.ts          # Entry
├── app.ts            # Express config
├── controller/       # Business logic
├── routes/          # API routes
├── middleware/      # Auth middleware
├── validation/      # Zod schemas
└── utils/           # JWT & password
```

## 🔒 Security

- HTTP-only cookies
- SameSite=strict
- Bcrypt password hashing
- Token hashing in DB
- Input validation

---

Built with Bun + TypeScript
