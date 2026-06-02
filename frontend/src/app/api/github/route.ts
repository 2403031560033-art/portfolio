import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const GITHUB_USERNAME = "2403031560033-art";
  
  try {
    // Fetch profile and repos in parallel
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        next: { revalidate: 3600 }
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
        next: { revalidate: 3600 }
      })
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error("Failed to fetch from GitHub API");
    }

    const profileData = await profileRes.json();
    const reposData = await reposRes.json();

    // Map profile data
    const profile = {
      name: profileData.name || "Satyam Patel",
      bio: profileData.bio || "AI-native Full Stack Engineer",
      publicRepos: profileData.public_repos || 0,
      followers: profileData.followers || 0,
      following: profileData.following || 0,
      avatarUrl: profileData.avatar_url || "https://github.com/identicons/satyam-patel.png",
      githubUrl: profileData.html_url || `https://github.com/${GITHUB_USERNAME}`
    };

    // Filter and map repos data (exclude forks if desired, but we'll include them for now)
    const repos = Array.isArray(reposData) ? reposData.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      url: repo.html_url,
      updatedAt: repo.updated_at
    })) : [];

    return NextResponse.json({ profile, repos });
  } catch (error) {
    console.error("Error in /api/github route:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
