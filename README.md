# Resume Builder

AI-powered resume builder built with Next.js App Router and TypeScript. Collects personal and experience details, validates them, then generates a structured resume via a secure server-side proxy to Anthropic.

## Features
- Multi-step resume form with dynamic experience entries
- Client and server validation (required fields + email + experience)
- Server-side AI generation to keep API keys safe
- ATS-friendly prompt and formatting
- Copy-to-clipboard result screen

## Tech Stack
- Next.js App Router
- React + TypeScript
- Anthropic API (server-side)

## Getting Started

### 1) Install dependencies

```
npm install
```

### 2) Configure environment

Create `.env.local` in the project root:

```
ANTHROPIC_API_KEY=your_anthropic_api_key
ANTHROPIC_MODEL=claude-sonnet-4-20250514
```

### 3) Run the app

```
npm run dev
```

Open http://localhost:3000

## Scripts
- `npm run dev` - Start the dev server
- `npm run build` - Create a production build
- `npm run start` - Run the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format files with Prettier

## API

`POST /api/generate`

Request body:

```
{
  "form": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "title": "",
    "summary": "",
    "experience": [{ "company": "", "role": "", "duration": "", "description": "" }],
    "education": "",
    "skills": "",
    "language": "English"
  }
}
```

Response:

```
{ "resume": "..." }
```

## Deployment

### Vercel
1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Add `ANTHROPIC_API_KEY` and optional `ANTHROPIC_MODEL` in Settings → Environment Variables (Production + Preview).
4. Deploy.
5. After deploy, verify `/api/generate` works from the production URL.

### Render
1. Create a new Web Service.
2. Set the build command to `npm run build` and the start command to `npm run start`.
3. Add `ANTHROPIC_API_KEY` and optional `ANTHROPIC_MODEL` as environment variables.

## Notes
- The API key is only used server-side via `/api/generate`.
- Client requests never call the Anthropic API directly.
