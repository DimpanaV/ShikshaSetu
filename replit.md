# ShikshaSetu

## Overview

ShikshaSetu is an AI-powered multilingual learning platform for Indian students. It features lesson generation, quizzes, a mentor chat, and progress tracking across subjects (Math, Science, History, Physics, Chemistry, Biology, English). Supports languages: English, Hindi, Kannada, Tamil, Bengali, and Hinglish.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/shikshasetu)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM (lib/db)
- **Validation**: Zod (zod/v4), drizzle-zod
- **API codegen**: Orval (from OpenAPI spec)
- **Charts**: Recharts
- **Routing**: Wouter
- **Animations**: Framer Motion
- **Themes**: next-themes (light/dark)

## Key Features

- **Learn Page**: Generate lessons by subject, topic, grade, language, and mode (5 content sections)
- **Practice Page**: 10-question MCQ quizzes with instant feedback and explanations
- **Mentor Chat**: AI mentor "Shiksha Mentor" with quick prompts per page
- **Dashboard**: Real metrics from DB — topics studied, avg score, streak, weekly chart
- **Progress**: Bar chart + topic mastery heatmap from real data
- **Settings**: Font size, theme, language preference
- **Curriculum DB**: Built-in content for 7 subjects × multiple topics (simulates RAG)

## Architecture

```
artifacts/
  api-server/         # Express 5 backend
    src/
      data/           # CURRICULUM_DB, topic content
      services/       # lessonService, quizService, mentorService
      routes/         # lessons, quiz, mentor, progress, dashboard
  shikshasetu/        # React + Vite frontend
    src/
      pages/          # home, dashboard, learn, practice, progress, settings
      components/     # layout (sidebar, main-layout), mentor-chat, ui
      lib/            # store (AppProvider React Context), utils
lib/
  api-spec/           # OpenAPI spec (source of truth)
  api-client-react/   # Generated React Query hooks
  api-zod/            # Generated Zod schemas
  db/                 # Drizzle schema (progress table)
```

## Key Commands

- `pnpm run typecheck` — full typecheck
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate hooks from OpenAPI
- `pnpm --filter @workspace/db run push` — push DB schema changes
- `pnpm --filter @workspace/api-server run dev` — run API server
- `pnpm --filter @workspace/shikshasetu run dev` — run frontend

## API Endpoints

- `POST /api/lessons/generate` — Generate a lesson
- `POST /api/quiz/generate` — Generate quiz questions
- `POST /api/mentor/ask` — Get mentor response
- `GET/POST /api/progress` — Get/save progress records
- `GET /api/dashboard/summary` — Dashboard metrics
- `GET /api/dashboard/weekly` — Weekly progress data
- `GET /api/dashboard/activity` — Recent activity

## Database

PostgreSQL (Replit built-in). One table: `progress` (id, topic, subject, score, total, percent, language, created_at).
