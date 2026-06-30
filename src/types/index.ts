export type Platform = "instagram" | "youtube" | "tiktok";

export interface UserProfileSummary {
  user_id: string;
  username: string;
  url: string;
  picture: string;
  fullname: string;
  is_verified: boolean;
  followers: number;
  engagements?: number;
  engagement_rate?: number;
  handle?: string;
  avg_views?: number;
}

export interface SearchAccount {
  account: {
    user_profile: UserProfileSummary;
    audience_source: string;
  };
}

export interface SearchData {
  total: number;
  accounts: SearchAccount[];
}

export interface StatHistory {
  month: string;
  followers: number;
  following?: number;
  avg_likes?: number;
  avg_comments?: number;
}

export interface AudienceData {
  demographics: {
    age: { range: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
    locations: { name: string; percentage: number }[];
  };
  interests: string[];
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  activity: {
    day: string;
    hours: number[]; // e.g. 6 elements for 4-hour blocks
  }[];
}

export interface FullUserProfile extends UserProfileSummary {
  type?: string;
  description?: string;
  is_business?: boolean;
  posts_count?: number;
  avg_likes?: number;
  avg_comments?: number;
  avg_reels_plays?: number;
  gender?: string;
  age_group?: string;
  stat_history?: StatHistory[];
  audience?: AudienceData;
}

export interface ProfileDetailResponse {
  cached?: boolean;
  data: {
    success: boolean;
    user_profile: FullUserProfile;
  };
}
