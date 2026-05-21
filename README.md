# 🌌 Premium Full-Stack Developer Portfolio

An immersive, high-performance developer portfolio built as a production-grade full-stack monorepo. It features sleek dark-mode glassmorphic aesthetics, custom real-time GitHub integrations, and interactive motion systems.

🔗 **Live Website**: [portfolio-frontend-puce-psi.vercel.app](https://portfolio-frontend-puce-psi.vercel.app/)

---

## 🚀 Key Features

*   **Cinematic Background Systems**: Layered visual engine featuring a slow-moving Gradient Mesh, a React-driven Floating Particle System, and an interactive Cursor Glow following mouse positioning without bottlenecking performance.
*   **Dynamic GitHub Integrations**: Replaced unreliable third-party SVG badges with a custom native React developer dashboard fetching real-time repository summaries, followers, total stars, and forks, along with a computed top-languages chart.
*   **Contribution Heatmap Fallback**: Intelligent error boundary handling for the contribution chart that automatically falls back to an elegant simulated activity grid if the external chart service is rate-limited.
*   **Monorepo Workspace**: Professionally structured monorepo using npm workspaces, dividing the codebase into decoupled Client (`frontend`) and API Server (`backend`) layers.
*   **Clipboard-Enabled Contact Cards**: A series of premium glassmorphic CTA blocks offering one-click email clipboard copy functions and responsive social redirects.

---

## 📂 Project Architecture

```
portfolio/
├── package.json               # Root workspace configurations & scripts
├── README.md                  # Main project documentation
├── .gitignore                 # Monorepo global ignore rules
│
├── frontend/                  # Next.js Frontend Application
│   ├── src/
│   │   ├── app/               # Next.js App Router (pages & layouts)
│   │   ├── components/        # UI modules (effects, layout, sections)
│   │   ├── hooks/             # Custom React hooks (magnetic, cursor)
│   │   └── lib/               # Shared logic, animations, and constants
│   ├── next.config.ts         # Next.js framework configuration
│   └── tailwind.config.ts     # Tailwind design tokens
│
└── backend/                   # Express.js REST API
    ├── src/
    │   └── server.ts          # Server entrypoint and API controllers
    ├── .env.example           # Environment variables template
    └── tsconfig.json          # TypeScript compilation settings
```

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: Next.js (App Router)
*   **Styling**: TailwindCSS & Vanilla CSS
*   **Animations**: Framer Motion
*   **Icons**: Lucide React

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Language**: TypeScript
*   **API Client**: Axios

---

## 💻 Local Setup & Development

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm (v9+) installed.

### 2. Clone the Repository
```bash
git clone https://github.com/2403031560033-art/portfolio.git
cd portfolio
```

### 3. Install Dependencies
Run the install command in the root folder to download dependencies for both workspaces:
```bash
npm install
```

### 4. Setup Environment Variables
Create a `.env` file in the `backend/` directory:
```bash
# Inside backend/.env
PORT=5001
GITHUB_USERNAME=2403031560033-art
GITHUB_TOKEN=your_optional_github_token_to_bypass_rate_limits
```

Create a `.env.local` file in the `frontend/` directory:
```bash
# Inside frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 5. Run the Project
Start both development servers concurrently from the root directory:
```bash
npm run dev
```

The frontend will start on [http://localhost:3000](http://localhost:3000) and the backend API gateway on [http://localhost:5001](http://localhost:5001).

---

## 🛡️ Production & Deployment

### Backend API Server
Deploy the `backend` workspace to Node hosting environments (Render, Koyeb, Railway):
*   **Build Command**: `npm run build --workspace=backend`
*   **Start Command**: `npm start --workspace=backend`
*   **Environment Variables**: Ensure `PORT`, `GITHUB_USERNAME`, and `GITHUB_TOKEN` are set.

### Frontend Application
Deploy the `frontend` workspace to **Vercel**:
*   **Root Directory**: Set to `frontend/`
*   **Framework Preset**: Next.js
*   **Environment Variables**: Add `NEXT_PUBLIC_API_URL` pointing to your deployed Express backend URL.
