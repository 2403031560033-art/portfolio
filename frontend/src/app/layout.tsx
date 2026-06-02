import type { Metadata } from "next";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import CursorGlow from "@/components/effects/CursorGlow";
import "./globals.css";

export const metadata: Metadata = {
  title: "Satyam Patel | AI-Native Full Stack Engineer",
  description: "Portfolio of Satyam Patel — AI-native Full Stack Engineer specializing in MERN stack, real-time systems, and AI integrations. Top hackathon competitor and builder of scalable products.",
  keywords: ["Satyam Patel", "Full Stack Developer", "AI Engineer", "Next.js", "React", "Portfolio", "Node.js", "PostgreSQL", "Socket.IO", "Redis"],
  authors: [{ name: "Satyam Patel" }],
  openGraph: {
    title: "Satyam Patel | AI-Native Full Stack Engineer",
    description: "Building intelligent, real-time digital experiences.",
    url: "https://vendor-vue-xi.vercel.app",
    siteName: "Satyam Patel Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Satyam Patel Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satyam Patel | AI-Native Full Stack Engineer",
    description: "Building intelligent, real-time digital experiences.",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#A78BFA]/30 selection:text-white">
        <SmoothScroll>
          <CursorGlow />
          <Navbar />
          {children}
          <Toaster closeButton position="bottom-right" theme="dark" richColors />
        </SmoothScroll>
      </body>
    </html>
  );
}
