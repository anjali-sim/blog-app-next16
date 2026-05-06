# TechBlog

A mini developer blog platform built with **Next.js 16** showcasing App Router, Server/Client Components, Caching, Data Fetching, and more.
🌐 **Live Demo:** (https://blog-app-next16.vercel.app/)

## Features

- 📝 **Blog** — Browse and read blog posts with dynamic routing
- 💬 **Comments** — Add comments to blog posts
- ❤️ **Likes** — Like/unlike posts
- 🔍 **Search & Filter** — Search and filter blog posts
- 📊 **Dashboard** — View blog analytics
- 🔐 **Admin Panel** — Create, delete, and manage posts (with login/logout)
- 🌱 **Seed API** — Seed the database with sample data

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB (via Mongoose)
- **React:** React 19

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/anjali-sim/blog-app-next16.git
cd blog-app-next16/my-app
npm install
```

### Environment Variables

Create a `.env.local` file in the `my-app` directory:

```env
MONGODB_URI=your_mongodb_connection_string
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
├── page.tsx              # Home page
├── blog/                 # Blog listing & individual post pages
├── dashboard/            # Dashboard with analytics
├── admin/                # Admin panel (create/delete posts, login)
├── api/                  # API routes (posts, comments, seed)
├── components/           # Shared UI components
├── lib/                  # Database connection & models
└── actions/              # Server actions
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |
