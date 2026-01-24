# URL Shortening Service

A **production-ready URL Shortening Service** (similar to Bitly) built using **Fastify**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**.  
This project demonstrates clean backend architecture, validation, database modeling, and REST API design.

---

## Features

- Create short URLs
- Redirect short URLs to original URLs
- URL analytics (click count, creation date)
- Input validation using Zod
- Database integration using Prisma + PostgreSQL
- Clean architecture (Routes → Controllers → Services)
- Prisma integrated via Fastify plugin

---

## 🛠 Tech Stack

- **Backend Framework:** Fastify (Node.js)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod

---

## Project Structure

```text
node_modules/
prisma/
├─ migrations/
├─ schema.prisma

src/
├─ config/
│  └─ prisma.ts
├─ modules/
│  └─ url/
│     ├─ url.controller.ts
│     ├─ url.routes.ts
│     ├─ url.schema.ts
│     └─ url.service.ts
├─ utils/
│  ├─ appError.ts
│  └─ handlerError.ts
├─ app.ts
└─ server.ts

.env
.env.sample
package.json
tsconfig.json
```

---

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/hritikchauhanji/URL-Shortening-Service.git
cd URL-Shortening-Service
```

---

### Install dependencies

```bash
npm install
```

---

### Configure environment variables

Create a `.env` file using `.env.sample` as reference:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/url_shortener"
```

---

### Run Prisma migrations

```bash
npx prisma migrate dev
```

---

### Start the development server

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## API Endpoints

### Create Short URL

**POST** `/api/shorten`

#### Request Body

```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

#### Response

```json
{
  "shortUrl": "http://localhost:3000/abc123",
  "code": "abc123"
}
```

---

### Redirect to Original URL

**GET** `/:code`

- Redirects to the original URL
- Increments click count
- Returns `404` if code does not exist

---

### URL Analytics

**GET** `/api/analytics/:code`

#### Response

```json
{
  "originalUrl": "https://example.com/very/long/url",
  "shortCode": "abc123",
  "clicks": 12,
  "createdAt": "2026-01-20T10:30:00Z"
}
```

---

## Error Handling

| Status Code | Meaning                          |
| ----------- | -------------------------------- |
| 400         | Invalid input / validation error |
| 404         | Short URL not found              |
| 500         | Internal server error            |

---

## Architecture Overview

```
Route
  ↓
Controller (HTTP only)
  ↓
Service (Business logic + Prisma)
  ↓
Database (PostgreSQL)
```

- Controllers handle request & response only
- Services contain validation, logic, and DB access
- Prisma is injected via Fastify plugin

---

## Validation

- Request bodies and route params are validated using **Zod**
- Invalid data never reaches the database

---

## Future Improvements

- Rate limiting
- Custom domain support
- URL expiration
- Authentication & user-based URLs
- Caching using Redis

---

## Author

**Hritik Chauhan**  
Backend Developer | TypeScript | Fastify | Prisma

GitHub: [@hritikchauhanji](https://github.com/hritikchauhanji)

---

## License

This project is licensed under the **ISC License**.
