export const PROFILE = {
  name: "SATYAM PATEL",
  title: "AI-Native Full Stack Engineer",
  location: "Vadodara, Gujarat",
  email: "satyam.patel.tech@gmail.com",
  phone: "+91 9140693061",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/2403031560033-art",
  linkedin: "https://linkedin.com/in/satyam-patel-b16920360",
  leetcode: "https://leetcode.com/u/a6EpPqwsbw/",
  taglines: [
    "Building AI-native digital experiences.",
    "Engineering real-time intelligent systems.",
    "Full Stack + AI Engineer.",
    "Designing scalable MVPs for startups."
  ]
};

export const SKILL_CATEGORIES = [
  {
    name: "Languages & Core",
    skills: ["JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS"]
  },
  {
    name: "Frontend Stack",
    skills: ["React.js", "Next.js", "TailwindCSS", "Bootstrap"]
  },
  {
    name: "Backend Engines",
    skills: ["Node.js", "Express.js", "Flask", "FastAPI"]
  },
  {
    name: "Databases & Caching",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Supabase", "Redis"]
  },
  {
    name: "AI & ML Frameworks",
    skills: ["LLM Integration", "Prompt Engineering", "OpenAI Whisper (STT)", "BioBERT NLP", "BERT NER", "Isolation Forest"]
  },
  {
    name: "Cloud & Devops",
    skills: ["Socket.IO", "Docker", "AWS", "Git/GitHub", "REST APIs", "Vercel", "Render"]
  }
];

export const PROJECTS = [
  {
    id: "vendorvue",
    title: "VendorVue",
    subtitle: "Hyperlocal Vendor Operating System",
    description: "A real-time hyperlocal vendor platform supporting 100+ concurrent sessions with live order tracking, OTP-based pickups, vendor dashboards, and payment workflows. Reduced order update latency by ~40% via bi-directional Socket.IO synchronization.",
    category: "Full Stack",
    tags: ["Next.js", "Node.js", "Flask", "PostgreSQL", "Redis", "Socket.IO", "Razorpay"],
    liveUrl: "https://vendor-vue-xi.vercel.app",
    githubUrl: "https://github.com/2403031560033-art/vendorvue", // fallback or placeholder
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
    liveUrl: "#", // local/demo
    githubUrl: "https://github.com/2403031560033-art/dpdp-compliance",
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
    githubUrl: "https://github.com/2403031560033-art/aalok-solar-dashboard",
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

export const EXPERIENCE = [
  {
    id: "coreloop",
    role: "Full Stack Developer",
    company: "Team CORELOOP",
    location: "SunHacks 2K26",
    period: "2 Weeks | National Hackathon",
    type: "hackathon",
    achievement: "Top 10 Team recognition among all participating national-level teams",
    description: [
      "Led full-stack development of VendorVue, a scalable vendor operating platform for hyperlocal commerce digitization.",
      "Integrated Socket.IO, PostgreSQL, Redis, and Razorpay payment systems into a unified backend workflow."
    ]
  },
  {
    id: "gdg",
    role: "Frontend Developer",
    company: "GDG Hacker Cup 2026",
    location: "National Hackathon",
    period: "2 Weeks | National Hackathon",
    type: "hackathon",
    achievement: "Top 5 — Best AI Track recognition at the national level",
    description: [
      "Developed AI-powered healthcare triage workflows using React, FastAPI, OpenAI Whisper STT, and BioBERT NLP.",
      "Engineered intelligent symptom parsing and patient prioritization pipelines."
    ]
  },
  {
    id: "dyulabs",
    role: "React Developer",
    company: "Dyulabs",
    location: "Remote",
    period: "2024 (Freelance)",
    type: "freelance",
    achievement: "Delivered a client-facing solar production management dashboard",
    description: [
      "Implemented Supabase authentication systems and responsive frontend workflows for the Aalok Solar Dashboard.",
      "Optimized client-side rendering for highly dynamic data charts and real-time device tracking."
    ]
  }
];

export const EDUCATION = {
  degree: "Bachelor of Technology (B.Tech)",
  major: "Computer Science & Engineering - IEP (Oracle Specialization)",
  institution: "Parul University, Vadodara, Gujarat",
  period: "2024 – 2028"
};

export const CERTIFICATIONS = [
  { name: "Oracle Certified Foundations Associate (Java)", issuer: "Oracle University", year: "2025" },
  { name: "Blueprint 6.0", issuer: "IIT Delhi", year: "2025" },
  { name: "Dev Heat Hackathon", issuer: "IIIT Surat", year: "2025" },
  { name: "Changethon", issuer: "IIT Roorkee", year: "2026" }
];

export const TESTIMONIALS = [
  {
    quote: "Satyam's ability to architect high-concurrency systems under tight hackathon deadlines was key to our top-10 finish. His integration of Socket.IO and Redis resolved critical real-time syncing bugs that other teams struggled with.",
    author: "SunHacks Team Partner",
    role: "Backend Collaborator, CORELOOP",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
  },
  {
    quote: "During the GDG Hacker Cup, Satyam single-handedly managed the React integration with our FastAPI speech-to-text models. His code was modular, fast, and very easy to merge. Absolute team player and AI builder.",
    author: "GDG Hackathon Lead",
    role: "AI Lead, GDG Hacker Cup Team",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80"
  },
  {
    quote: "Satyam delivered the Aalok Solar Dashboard well within our timeline. His integration of Supabase made the platform secure and ready for our first set of clients. We highly recommend him for React and frontend gigs.",
    author: "Founder, Dyulabs",
    role: "Freelance Client",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
  },
  {
    quote: "Satyam showed deep curiosity for machine learning at our campus hackathon. He quickly picked up BERT and NER concepts to build a working prototype that impressed the judging panel.",
    author: "Hackathon Judge",
    role: "Senior Staff Engineer",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80"
  }
];
