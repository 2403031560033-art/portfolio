import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

const PROJECT_METADATA = [
  {
    id: "vendorvue",
    title: "VendorVue",
    subtitle: "Hyperlocal Vendor Operating System",
    description: "A real-time hyperlocal vendor platform supporting 100+ concurrent sessions with live order tracking, OTP-based pickups, vendor dashboards, and payment workflows. Reduced order update latency by ~40% via bi-directional Socket.IO synchronization.",
    category: "Full Stack",
    tags: ["Next.js", "Node.js", "Flask", "PostgreSQL", "Redis", "Socket.IO"],
    liveUrl: "https://vendor-vue-xi.vercel.app",
    githubUrl: "https://github.com/2403031560033-art/vendorvue",
    metrics: [
      { label: "Latency Reduction", value: "~40%" },
      { label: "Concurrent Sessions", value: "100+" },
      { label: "Order Placement Time", value: "-35%" }
    ],
    role: "Full Stack Lead",
    architecture: [
      "Next.js App Router for server-rendered UI and dynamic routing",
      "Node.js & Express backend integrated with Flask microservices",
      "Redis for real-time caching and pub/sub message brokering",
      "Socket.IO connection pool for live status updates",
      "PostgreSQL database handling high-concurrency order records"
    ]
  },
  {
    id: "dpdp-compliance",
    title: "DPDP Compliance & Data Mapper",
    subtitle: "AI-Assisted Privacy Automation",
    description: "An AI-assisted compliance automation system using BERT NER for PII detection across unstructured documents and Isolation Forest for network anomaly identification with ~85% detection accuracy.",
    category: "AI/ML",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "BERT", "Python"],
    liveUrl: "#",
    githubUrl: "https://github.com/2403031560033-art/dpdp-compliance",
    metrics: [
      { label: "PII Detection Accuracy", value: "~85%" },
      { label: "Audit Review Time", value: "-60%" },
      { label: "Compliance Risk Flagging", value: "Real-time" }
    ],
    role: "Core AI/Backend Engineer",
    architecture: [
      "FastAPI server hosting machine learning inference endpoints",
      "Hugging Face BERT model fine-tuned for Name Entity Recognition (NER)",
      "Scikit-learn Isolation Forest algorithm running on network telemetry logs",
      "PostgreSQL database storing version-controlled compliance reports"
    ]
  },
  {
    id: "aalok-solar-dashboard",
    title: "Aalok Solar Dashboard",
    subtitle: "Real-Time IoT Solar Analytics",
    description: "A responsive solar monitoring dashboard with real-time plant analytics, secure Supabase authentication, protected routes, and client-facing operational insights.",
    category: "Dashboard",
    tags: ["React.js", "Supabase", "TailwindCSS", "Recharts", "Flask"],
    liveUrl: "#",
    githubUrl: "https://github.com/2403031560033-art/aalok-solar-dashboard",
    metrics: [
      { label: "Real-Time Telemetry", value: "<1s latency" },
      { label: "Onboarding Overhead", value: "Minimal" },
      { label: "Data Integrity Score", value: "99.9%" }
    ],
    role: "React Developer",
    architecture: [
      "React.js Single Page App optimized for dashboard speed",
      "Supabase integration providing out-of-the-box user auth & PostgreSQL bindings",
      "Recharts for interactive visual analytics",
      "Flask backend proxying hardware level IoT sensor data stream"
    ]
  }
];

export async function GET() {
  try {
    const enrichedProjects = await Promise.all(
      PROJECT_METADATA.map(async (project) => {
        try {
          const repoName = project.githubUrl.split("/").pop();
          if (repoName && repoName !== "#") {
            const repoResponse = await fetch(`https://api.github.com/repos/2403031560033-art/${repoName}`, {
              next: { revalidate: 3600 }
            });
            if (repoResponse.ok) {
              const data = await repoResponse.json();
              return {
                ...project,
                githubStars: data.stargazers_count,
                githubForks: data.forks_count,
              };
            }
          }
        } catch (e) {
          // Ignore individual fetch errors
        }
        return {
          ...project,
          githubStars: 0,
          githubForks: 0,
        };
      })
    );
    return NextResponse.json(enrichedProjects);
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return NextResponse.json(PROJECT_METADATA);
  }
}
