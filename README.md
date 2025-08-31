🎓 CampusHub — MTech in AI Resource Platform

**A collabo*   **Next.js 15** — App Router, Server Actions, Partial Prerendering.
*   **React 19** — concurrent UI and improved hooks.
*   **TailwindCSS** — utility‑first styling.
*   **Prisma** — ORM for PostgreSQL with type safety.
*   **Auth.js (NextAuth)** — authentication and session management.
*   **Vercel Blob** — serverless file storage.
*   **next‑mdx‑remote** & **Shiki** — MDX rendering with syntax highlighting.
*   **Zod** — server‑side validation.
*   **Perplexity AI** — AI-powered tutoring with expert models.eb application for MTech in AI students (IITJ)** to upload, share, and discover lecture notes, assignments, lab materials, and blog posts. Everything is neatly organized by **Semester** **→** **Subject** **→** **Series** and includes fine‑grained visibility controls. Features an AI-powered Tutor Buddy for personalized learning assistance.

✨ Features

Authentication & Profiles

*   Google OAuth + email/password login via Auth.js.
*   User profiles with role‑based access: **Admin**, **Moderator**, **Student**.

AI-Powered Tutor Buddy

*   Chat with specialized AI tutors: **ML Expert**, **AI Expert**, and **DSA Expert**
*   Real-time assistance using Perplexity AI
*   Personalized learning experience with adaptive responses
*   Secure API key management for each user
*   Context-aware responses based on student's level

Content Types

*   **Posts:** Blog entries and notes written in MDX (Markdown with JSX). Code blocks are highlighted using Shiki.
*   **Docs:** Upload files (PDFs, slides, code archives) or attach external resources (e.g. Google Drive, ArXiv, YouTube).
*   **Series:** Group multi‑part content under one subject (e.g. “Week 1–4”).

Organization

*   Hierarchical structure: **Classrooms** **→** **Semesters** **→** **Subjects** **→** **Series**.
*   Tags for cross‑cutting topics like algorithms, machine learning, or NLP.
*   Quick navigation by semester via the landing page hero.

Blog

*   Public stream of published posts that respects visibility rules.
*   MDX rendering with remark‑gfm and rehype‑pretty‑code for GitHub‑style markdown and syntax highlighting.
*   Partial Prerendering (PPR) for snappy initial loads and streaming content.

Visibility & Sharing

*   Granular scopes: PUBLIC, SCHOOL, CLASSROOM, SEMESTER, SUBJECT, SERIES, CUSTOM, and LINK.
*   Generate shareable **link‑only tokens** for restricted access.
*   Secure proxy download for documents to ensure only authorized users can fetch files.

RBAC & Moderation

*   Role‑based permissions: Only Admins and Moderators can mark posts as “Official”.
*   Extendable to approval workflows and audit logs for content changes.

Modern UI

*   Responsive landing page branded specifically for the **MTech in AI** cohort.
*   Clean, minimal design using TailwindCSS with a hero section, feature grid, and call‑to‑action.
*   Interactive chat interface with real-time responses.
*   Supports shadcn/ui components and animations for future enhancements.

🛠 Tech Stack

*   **Next.js 15** — App Router, Server Actions, Partial Prerendering.
*   **React 19** — concurrent UI and improved hooks.
*   **TailwindCSS** — utility‑first styling.
*   **Prisma** — ORM for PostgreSQL with type safety.
*   **Auth.js (NextAuth)** — authentication and session management.
*   **Vercel Blob** — serverless file storage.
*   **next‑mdx‑remote** & **Shiki** — MDX rendering with syntax highlighting.
*   **Zod** — server‑side validation.

🏁 Getting Started

1\. Clone & Install

git clone <your repo url>  
cd campus-hub  
pnpm install

2\. Configure Environment

Copy .env.example to .env and fill in the following variables:

NEXTAUTH\_URL=http://localhost:3000  
NEXTAUTH\_SECRET=<generate random string>  
  
DATABASE\_URL=postgresql://user:password@localhost:5432/campus\_hub  
  
AUTH\_GOOGLE\_ID=<your Google client ID>  
AUTH\_GOOGLE\_SECRET=<your Google client secret>  
  
BLOB\_READ\_WRITE\_TOKEN=<your Vercel Blob token>

_Obtaining_ _AUTH\_GOOGLE\_ID_ _and_ _AUTH\_GOOGLE\_SECRET_

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/) and create or select a project.
2.  Navigate to **APIs & Services** **→** **OAuth consent screen**. Choose **External**, fill in the app name and contact details, and save.
3.  Navigate to **APIs & Services** **→** **Credentials** **→** **Create credentials** **→** **OAuth client ID**.
4.  Choose **Web application** and add the following:
5.  **Authorized redirect URI:** http://localhost:3000/api/auth/callback/google
6.  (Add your production domain when deploying.)
7.  After creation you will receive a **Client ID** and **Client Secret**. Use these for AUTH\_GOOGLE\_ID and AUTH\_GOOGLE\_SECRET.

_Obtaining_ _BLOB\_READ\_WRITE\_TOKEN_

In the Vercel dashboard, go to **Storage** **→** **Blob** and generate a read‑write token. Set it as BLOB\_READ\_WRITE\_TOKEN in your .env.

_Getting a Perplexity API Key_

1. Visit [Perplexity AI](https://www.perplexity.ai/) and create an account
2. Navigate to your account settings to generate an API key
3. Users will need to provide their own API keys for the Tutor Buddy feature

3\. Migrate Database

Run migrations with Prisma:

pnpm dlx prisma migrate dev --name init

4\. Seed Demo Data

pnpm dlx tsx scripts/seed.ts

This seed script creates sample classrooms, semesters, subjects, and a demo post.

5\. Run Development Server

pnpm dev

Visit [http://localhost:3000](http://localhost:3000) in your browser. Sign in with Google or email to start using CampusHub.

🚀 Deployment

To deploy on Vercel:

1.  Push your repository to GitHub or another Git provider.
2.  Import the project into [Vercel](https://vercel.com/).
3.  Configure environment variables in the Vercel dashboard (mirroring your .env).
4.  Connect to a remote Postgres database (e.g. Neon or Vercel Postgres).
5.  Run migrations in production:

pnpm dlx prisma migrate deploy

1.  Update the OAuth redirect URI in your Google Cloud Console to use your production domain (e.g. https://your-app.vercel.app/api/auth/callback/google).

After deployment, your site will be live at your Vercel domain.

👩‍💻 Contributing

Contributions are welcome! If you want to fix bugs, add features, or improve documentation:

1.  Fork the repository and create a new branch:

git checkout -b feature/your-feature-name

1.  Make your changes and ensure the codebase lints and builds without errors:

pnpm lint  
pnpm build

1.  Commit your changes with a clear message and push to your fork:

git commit -m "feat: add your feature"  
git push origin feature/your-feature-name

1.  Open a Pull Request on GitHub describing your changes and follow the PR template.

Code Style

*   Use **TypeScript** throughout the project.
*   TailwindCSS is the preferred way to style components.
*   Use Server Actions instead of creating separate REST API routes when possible.
*   Validate inputs on the server using **Zod**.
*   Always run pnpm lint before submitting a PR.

Ideas for Contributions

*   Add more sample seed data (new subjects, semesters, or series).
*   Implement full‑text search (Postgres tsvector or integrate Meilisearch).
*   Build advanced moderation features (approval queue, audit log).
*   Add email or push notifications when new resources are published.
*   Enhance the UI with shadcn/ui components and animations.
*   Extend Tutor Buddy with more specialized experts and features.
*   Add conversation history and bookmarking for chat sessions.

📂 Project Structure

src/  
├─ app/  
│  ├─ layout.tsx            \# Global layout and navigation  
│  ├─ page.tsx              \# Landing page (hero + features)  
│  ├─ blog/                 \# Public blog stream and individual posts  
│  ├─ c/\[...\]/              \# Dynamic routes: Classroom/Semester/Subject/Series pages  
│  ├─ create/               \# Create post and document forms  
│  ├─ api/auth/             \# NextAuth API routes for authentication  
│  └─ ...                   \# Other app routes  
├─ actions/                 \# Server Actions for create/update/delete operations  
├─ components/              \# Reusable React components (editors, lists, cards)  
├─ lib/                     \# Utility modules (database, authentication, RBAC, visibility)  
├─ prisma/                  \# Prisma schema and generated client  
├─ scripts/                 \# Seed script and other utilities  
└─ .env.example             \# Example environment variables

📜 License

This project is licensed under the **MIT License**. Feel free to use, modify, and share it.

🙌 Authors & Contributors

*   **Praveen Kumar** ([g25ait1119@iitj.ac.in](mailto:g25ait1119@iitj.ac.in))
*   **MTech in AI Cohort at IIT Jodhpur**

We welcome contributions from all classmates and beyond. Feel free to open issues or pull requests to enhance the platform!