import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) => {
    const profile = item.account.user_profile;
    // Some profiles (like on YouTube) might use 'handle' instead of 'username'
    // This sanitization ensures they display correctly and don't break string methods.
    return {
      ...profile,
      username: profile.username || profile.handle || profile.user_id || "unknown",
      fullname: profile.fullname || profile.username || profile.handle || "Unknown",
    };
  });
}

export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  if (!query) return profiles;
  const lowerQuery = query.toLowerCase();
  return profiles.filter((p) => {
    const u = p.username || p.handle || "";
    const f = p.fullname || "";
    const matchUsername = u.toLowerCase().includes(lowerQuery);
    const matchFullname = f.toLowerCase().includes(lowerQuery);
    return matchUsername || matchFullname;
  });
}

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

export function getPlatformLabel(platform: Platform): string {
  if (platform === "instagram") return "Instagram";
  if (platform === "youtube") return "YouTube";
  return "TikTok";
}

export function calculateEngagementRate(data: {
  followers: number;
  avg_likes?: number;
  avg_comments?: number;
  engagement_rate?: number;
  engagements?: number;
}): number {
  if (!data.followers) return 0;

  if (data.avg_likes !== undefined || data.avg_comments !== undefined) {
    const likes = data.avg_likes || 0;
    const comments = data.avg_comments || 0;
    return (likes + comments) / data.followers;
  }

  if (data.engagement_rate !== undefined) {
    return data.engagement_rate;
  }

  if (data.engagements !== undefined) {
    return data.engagements / data.followers;
  }

  return 0;
}

export function generateMockStatHistory(user: {
  followers: number;
  avg_likes?: number;
  avg_comments?: number;
  engagements?: number;
}): any[] {
  const currentFollowers = user.followers || 0;
  // Try to estimate likes/comments based on engagements if they are missing
  let currentLikes = user.avg_likes;
  let currentComments = user.avg_comments;
  
  if (currentLikes === undefined && user.engagements) {
    currentLikes = user.engagements * 0.9;
    currentComments = user.engagements * 0.1;
  }
  
  currentLikes = currentLikes || (currentFollowers * 0.01);
  currentComments = currentComments || (currentFollowers * 0.001);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month, i) => {
    // Generate a trend that roughly ends up at the current stats
    // Let's make it grow slightly each month (so Jun is 100%, Jan is ~90%)
    const factor = 0.9 + (i * 0.02); 
    
    // Add some random noise
    const noise = 1 + (Math.random() * 0.05 - 0.025);
    
    return {
      month,
      followers: Math.floor(currentFollowers * factor * noise),
      avg_likes: Math.floor(currentLikes! * factor * noise),
      avg_comments: Math.floor(currentComments! * factor * noise),
    };
  });
}
