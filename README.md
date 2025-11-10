⚓ FuelEU Maritime Compliance Platform
A Full-Stack Application for Monitoring, Banking & Pooling GHG Compliance (EU Regulation 2023/1805)
)

🧭 Overview

This project implements a FuelEU Maritime compliance management system, including backend APIs and a frontend dashboard.
It allows shipping companies to track their routes, compute Compliance Balance (CB), perform banking of surplus CBs, and pool multiple ships for compliance optimization.

Built using a Hexagonal (Ports & Adapters) architecture for clear separation of concerns and easy scalability.
🧱 Tech Stack
Layer	Technologies
Frontend	React + TypeScript + TailwindCSS (Vite)
Backend	Node.js + Express + TypeScript
Database	PostgreSQL + Prisma ORM
Architecture	Hexagonal / Clean Architecture
Testing	Vitest + Supertest
AI Tools	ChatGPT (GPT-5), GitHub Copilot, Cursor Agent for generation/refactoring
🗂️ Folder Structure
# repo/
# │ │ │ ├── BankingRepoPrisma.ts
# │ │ │ └── PoolRepoPrisma.ts
# │ │ └── infrastructure/
# │ │ └── server/index.ts
# │ └── tests/
# │ ├── ComputeCB.test.ts
# │ ├── ComputeComparison.test.ts
# │ ├── Banking.test.ts
# │ ├── Pooling.test.ts
# │ └── http.e2e.test.ts
# └── frontend/
# ├── package.json
# ├── tsconfig.json
# ├── vite.config.ts
# ├── index.html
# ├── postcss.config.cjs
# ├── tailwind.config.cjs
# └── src/
# ├── main.tsx
# ├── index.css
# ├── shared/
# │ └── constants.ts
# ├── core/
# │ ├── domain/
# │ │ ├── Route.ts
# │ │ ├── Comparison.ts
# │ │ ├── Banking.ts
# │ │ └── Pool.ts
# │ ├── application/
# │ │ ├── ListRoutes.ts
# │ │ ├── GetComparison.ts
# │ │ ├── GetCB.ts
# │ │ └── CreatePool.ts
# │ └── ports/
# │ ├── ApiPort.ts
# │ └── ChartPort.ts
# ├── adapters/
# │ ├── infrastructure/
# │ │ └── ApiClient.ts
# │ └── ui/
# │ ├── App.tsx
# │ ├── components/
# │ │ ├── Tabs.tsx
# │ │ ├── RoutesTab.tsx
# │ │ ├── CompareTab.tsx
# │ │ ├── BankingTab.tsx
# │ │ └── PoolingTab.tsx
# │ └── hooks/
# │ └── useApi.ts
⚙️ Setup Instructions
🧩 1. Clone the Repository
git clone https://github.com/<your-username>/fueleu-maritime.git
cd fueleu-maritime

🧱 2. Backend Setup
Install dependencies
cd backend
npm install
Configure Environment Variables

Create .env file in /backend:
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/fueleu?schema=public"
PORT=4000
Migrate Database Schema
npx prisma migrate dev --name init
npx prisma generate
Seed Sample Data
npm run db:seed
Start Backend Server
npm run dev

🌊 3. Frontend Setup
Install dependencies
cd frontend
npm install
Configure proxy (already set)

vite.config.ts proxies all /api requests to backend on port 4000.

Start development server
npm run dev
🧠 Core Logic (FuelEU Calculations)
1. Compliance Balance (CB)

Formula:
Energy (MJ) = fuelConsumption × 41,000 MJ/t
CB = (TargetIntensity − ActualIntensity) × Energy

Positive CB → Surplus (good)

Negative CB → Deficit (non-compliant)

TargetIntensity (2025) = 89.3368 gCO₂e/MJ
2. Banking (Article 20)

Ships with positive CB can bank surplus.
Banked CB can later be applied to ships with a deficit.
3. Pooling (Article 21)

Multiple ships can form a compliance pool:

∑ adjusted CB ≥ 0

Deficit ships cannot exit worse

Surplus ships cannot exit negative
🖥️ Frontend Tabs Summary
Tab	Functionality
Routes	View all routes, filter by vessel/fuel/year, set baseline
Compare	Compare each route’s GHG intensity with baseline and target
Banking	View CB, bank surplus, or apply banked CB
Pooling	Create compliance pools and view adjusted balances

🧰 Backend API Summary
Endpoint	Method	Description
/api/routes	GET	Fetch all routes
/api/routes/:id/baseline	POST	Set baseline route
/api/routes/comparison	GET	Compare baseline vs others
/api/compliance/cb	GET	Compute & fetch Compliance Balance
/api/compliance/adjusted-cb	GET	Fetch CB after banking
/api/banking/records	GET	Fetch bank records
/api/banking/bank	POST	Bank positive CB
/api/banking/apply	POST	Apply banked surplus
/api/pools	POST	Create pool & distribute CB

🧪 Testing

Run unit and integration tests:
npm run test
Unit tests → core domain logic (ComputeCB, BankSurplus, CreatePool, etc.)

Integration tests → HTTP endpoints with supertest.
📊 Seed Data Summary
Table	Example Rows
Route	5 sample routes (R001–R005)
ShipCompliance	baseline CB records
BankEntry	banked + applied entries
Pool	1 sample pool (2025)
PoolMember	3 sample pool members

📸 Dashboard Preview

Tabs:

🛳️ Routes → All ship routes & emission data

⚖️ Compare → Baseline vs others chart + compliance

💰 Banking → Bank/apply surplus

🤝 Pooling → Pool creation and CB distribution


