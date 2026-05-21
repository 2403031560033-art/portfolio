import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "2403031560033-art";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

app.use(cors());
app.use(express.json());

// Helper for GitHub requests with authorization if token is provided
const getGithubHeaders = () => {
  const headers: Record<string, string> = {
    "User-Agent": "portfolio-backend-service",
  };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `token ${GITHUB_TOKEN}`;
  }
  return headers;
};

// Hardcoded fallback data for projects
const PROJECT_METADATA = [
  {
    id: "vendorvue",
    title: "VendorVue",
    subtitle: "Hyperlocal Vendor Operating System",
    description: "A real-time hyperlocal vendor platform supporting 100+ concurrent sessions with live order tracking, OTP-based pickups, vendor dashboards, and payment workflows. Reduced order update latency by ~40% via bi-directional Socket.IO synchronization.",
    category: "Full Stack",
    tags: ["Next.js", "Node.js", "Flask", "PostgreSQL", "Redis", "Socket.IO", "Razorpay"],
    liveUrl: "https://vendor-vue-xi.vercel.app",
    githubUrl: `https://github.com/${GITHUB_USERNAME}/vendorvue`,
    metrics: [
      { label: "Latency Reduction", value: "~40%" },
      { label: "Concurrent Sessions", value: "100+" },
      { label: "Order Placement Time", value: "-35%" }
    ],
    role: "Full Stack Lead (CORELOOP)",
    architecture: [
      "Next.js App Router for server-rendered UI and dynamic routing",
      "Node.js & Express backend integrated with Flask microservices for specialized tasks",
      "Redis for real-time caching and pub/sub message brokering",
      "Socket.IO connection pool for live status updates and geolocation tracking",
      "PostgreSQL database handling high-concurrency order transaction records"
    ]
  },
  {
    id: "dpdp-compliance",
    title: "DPDP Compliance & Data Mapper",
    subtitle: "AI-Assisted Privacy Automation",
    description: "An AI-assisted compliance automation system using BERT NER for PII detection across unstructured documents and Isolation Forest for network anomaly identification with ~85% detection accuracy. Generates India's DPDP Act 2023 aligned reporting workflows.",
    category: "AI/ML",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "BERT NER", "Isolation Forest", "Python"],
    liveUrl: "#",
    githubUrl: `https://github.com/${GITHUB_USERNAME}/dpdp-compliance`,
    metrics: [
      { label: "PII Detection Accuracy", value: "~85%" },
      { label: "Audit Review Time", value: "-60%" },
      { label: "Compliance Risk Flagging", value: "Real-time" }
    ],
    role: "Core AI/Backend Engineer",
    architecture: [
      "FastAPI server hosting machine learning inference endpoints",
      "Hugging Face BERT model fine-tuned for Name Entity Recognition (NER) to redact PII data",
      "Scikit-learn Isolation Forest algorithm running on network telemetry logs for anomaly detection",
      "PostgreSQL database storing version-controlled compliance reports and network topologies"
    ]
  },
  {
    id: "aalok-solar",
    title: "Aalok Solar Dashboard",
    subtitle: "Real-Time IoT Solar Analytics",
    description: "A responsive solar monitoring dashboard with real-time plant analytics, secure Supabase authentication, protected routes, and client-facing operational insights. Delivered a scalable frontend enabling rapid client onboarding.",
    category: "Dashboard",
    tags: ["React.js", "Supabase", "TailwindCSS", "Recharts", "Flask", "REST APIs"],
    liveUrl: "#",
    githubUrl: `https://github.com/${GITHUB_USERNAME}/aalok-solar-dashboard`,
    metrics: [
      { label: "Real-Time Telemetry", value: "<1s latency" },
      { label: "Onboarding Overhead", value: "Minimal" },
      { label: "Data Integrity Score", value: "99.9%" }
    ],
    role: "React Developer (Dyulabs)",
    architecture: [
      "React.js Single Page App optimized for dashboard speed and real-time graph re-renders",
      "Supabase integration providing out-of-the-box user auth, PostgreSQL bindings, and row-level security",
      "Recharts for interactive visual analytics showing historical and real-time generation metrics",
      "Flask backend proxying hardware level IoT sensor data stream safely to the client UI"
    ]
  }
];

// Endpoint 1: Fetch GitHub profile data with caching fallback
app.get("/api/github/profile", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: getGithubHeaders(),
    });
    
    const { name, bio, public_repos, followers, following, avatar_url, html_url } = response.data;
    res.json({
      name,
      bio,
      publicRepos: public_repos,
      followers,
      following,
      avatarUrl: avatar_url,
      githubUrl: html_url,
    });
  } catch (error: any) {
    console.error("Error fetching GitHub profile:", error?.message || error);
    // Graceful fallback in case of rate limits or offline mode
    res.json({
      name: "Satyam Patel",
      bio: "AI-native Full Stack Engineer specializing in React.js, Next.js, Node.js, Flask, FastAPI, MongoDB, PostgreSQL, Socket.IO, and AI integrations.",
      publicRepos: 18,
      followers: 24,
      following: 10,
      avatarUrl: "https://github.com/identicons/satyam-patel.png",
      githubUrl: `https://github.com/${GITHUB_USERNAME}`,
      isFallback: true
    });
  }
});

// Endpoint 2: Fetch GitHub public repositories with pagination/limit
app.get("/api/github/repos", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, {
      headers: getGithubHeaders(),
    });

    const repos = response.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      url: repo.html_url,
      updatedAt: repo.updated_at
    }));

    res.json(repos);
  } catch (error: any) {
    console.error("Error fetching GitHub repos:", error?.message || error);
    // Graceful fallback mock repos
    res.json([
      {
        name: "vendorvue",
        description: "A hyperlocal vendor operating system supporting real-time tracking, OTP workflows, and concurrent order management.",
        stars: 12,
        forks: 3,
        language: "TypeScript",
        url: `https://github.com/${GITHUB_USERNAME}/vendorvue`,
        updatedAt: new Date().toISOString()
      },
      {
        name: "dpdp-compliance",
        description: "AI-assisted compliance automation using BERT NER and Anomaly detection models for PII mapping.",
        stars: 8,
        forks: 1,
        language: "Python",
        url: `https://github.com/${GITHUB_USERNAME}/dpdp-compliance`,
        updatedAt: new Date().toISOString()
      },
      {
        name: "aalok-solar-dashboard",
        description: "React dashboard representing real-time solar plant telemetries with Supabase integration.",
        stars: 6,
        forks: 2,
        language: "JavaScript",
        url: `https://github.com/${GITHUB_USERNAME}/aalok-solar-dashboard`,
        updatedAt: new Date().toISOString()
      }
    ]);
  }
});

// Endpoint 3: Fetch projects dynamically, enriching them with GitHub stats if possible
app.get("/api/projects", async (req: Request, res: Response) => {
  try {
    const enrichedProjects = await Promise.all(
      PROJECT_METADATA.map(async (project) => {
        try {
          // Attempt to fetch specific repository details from GitHub to enrich stars & forks
          const repoName = project.githubUrl.split("/").pop();
          if (repoName && repoName !== "#") {
            const repoResponse = await axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`, {
              headers: getGithubHeaders(),
              timeout: 2000 // Don't block if GitHub is slow
            });
            return {
              ...project,
              githubStars: repoResponse.data.stargazers_count,
              githubForks: repoResponse.data.forks_count,
            };
          }
        } catch (e) {
          // If repo-specific fetch fails, just return base metadata
        }
        return {
          ...project,
          githubStars: 0,
          githubForks: 0,
        };
      })
    );
    res.json(enrichedProjects);
  } catch (error: any) {
    res.json(PROJECT_METADATA);
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Portfolio backend running on port ${PORT}`);
  console.log(`👤 Target GitHub Profile: ${GITHUB_USERNAME}`);
  console.log(`=========================================`);
});
