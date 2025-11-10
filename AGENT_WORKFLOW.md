# 🤖 AI Agent Workflow Log

## 🧩 Agents Used

- **ChatGPT (GPT-5)** — for planning architecture, generating domain logic, API design, and documentation.
- **GitHub Copilot** — for quick inline code completions and refactoring.
- **Cursor Agent** — for incremental scaffolding and fast file generation inside the IDE.
- **Claude Code** — for rewriting sections of TypeScript and improving error handling.
- **VS Code IntelliSense + Prisma VS Extension** — for type inference and schema validation.

---

## 🪜 Development Workflow (Step-by-Step)

### 1️⃣ Project Initialization
- Prompted ChatGPT to **design a FuelEU Maritime compliance platform** following *Hexagonal Architecture*.
- GPT-5 generated a clean folder structure separating `core`, `adapters`, and `infrastructure`.
- Used **Cursor Agent** to auto-generate base folders (`inbound/http`, `outbound/postgres`, `core/domain`, etc.).
- Verified with ChatGPT that all ports matched adapters correctly.

### 2️⃣ Backend Domain & Use-Cases
- GPT-5 helped draft all domain logic:
  - `ComputeCB` (Compliance Balance calculation)
  - `CompareRoutes`
  - `BankSurplus`, `ApplyBanked`
  - `CreatePool` (pooling algorithm)
- I refined formulas manually and validated results with sample values.
- Used Copilot for quick type declarations and return interfaces.
- Cursor formatted everything and ensured dependency direction stayed correct (core → ports → adapters).

### 3️⃣ Database & ORM Setup
- GPT-5 guided me in writing the **Prisma schema** and seeding logic.
- Cursor generated initial models (Route, ShipCompliance, BankEntry, Pool, PoolMember).
- I verified the schema by running `npx prisma migrate dev` and checking via `prisma studio`.
- Later added custom seed data for routes, compliance balances, banking entries, and pools (suggested by GPT-5).

### 4️⃣ Frontend (React + TypeScript + Tailwind)
- GPT-5 generated the entire UI scaffold using **Vite + Tailwind**.
- Cursor Agent auto-created the components: `RoutesTab`, `CompareTab`, `BankingTab`, `PoolingTab`, and a tabbed layout.
- I customized styling and made sure API endpoints aligned with the backend routes.
- Copilot helped generate repetitive JSX like tables and forms faster.

### 5️⃣ Debugging & Testing
- I used ChatGPT (GPT-5) interactively to fix:
  - Prisma connection errors
  - TypeScript config mismatches
  - Missing npm scripts (like `db:seed`)
- Created Vitest unit tests for the major functions with GPT-5’s help.
- Verified endpoints via Postman and curl commands.
- GPT-5 guided me on resolving Postgres auth (P1000) error and password reset steps.

### 6️⃣ Documentation
- GPT-5 generated this README and structured workflow summary.
- I reviewed all markdowns manually to ensure everything reflected my actual development process.
- Added comments, fixed grammar, and adjusted to my tone (practical + student-level but confident).

---

## 🧩 Validation / Corrections

- **Agent outputs verified manually** by:
  - Running the actual commands suggested by GPT.
  - Fixing Prisma schema typos and mismatched relations.
  - Adjusting frontend imports (case-sensitive file names).
- Some agent outputs were hallucinated (like wrong import paths) — I corrected those manually after TypeScript compilation failed.

---

## 🔍 Observations

| Area | AI Helpfulness |
|------|----------------|
| **Architecture & Setup** | Saved 4–5 hours of setup time. |
| **Domain Logic** | GPT-5 gave clean, formula-based code. |
| **Frontend Boilerplate** | Copilot + GPT combo generated 80% UI instantly. |
| **Debugging** | GPT-5 was best at explaining Postgres & TSConfig errors. |
| **Refactoring** | Cursor’s inline refactor was smooth and fast. |

---

## 💡 Best Practices Followed
- Used Cursor’s `tasks.md` for guided generation.
- Let Copilot complete small repetitive code blocks only after verifying correctness.
- Validated every AI-generated SQL/Prisma model manually.
- Kept GPT-5 prompts specific (e.g., “Generate Hexagonal adapter for Prisma repository”).
- Wrote tests manually to ensure domain logic wasn’t hallucinated.

---

## 🏁 Summary
This project was built as a **human–AI collaboration**.  
AI helped me in scaffolding, reasoning, and debugging — while I focused on domain modeling, correctness, and clarity.  
Every major code commit was validated manually before merging.
