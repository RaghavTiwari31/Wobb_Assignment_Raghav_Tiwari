import type { ProfileDetailResponse, SearchData, FullUserProfile } from "@/types";
import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

const allSearchData: SearchData[] = [
  instagramData as SearchData,
  youtubeData as SearchData,
  tiktokData as SearchData,
];

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const exactPath = `../assets/data/profiles/${username}.json`;
  let loader = profileModules[exactPath];

  if (!loader) {
    // Try case-insensitive match
    const lowerUsername = username.toLowerCase();
    const matchPath = Object.keys(profileModules).find(
      (path) => path.toLowerCase() === `../assets/data/profiles/${lowerUsername}.json`
    );
    if (matchPath) {
      loader = profileModules[matchPath];
    }
  }

  if (loader) {
    const result = await loader();
    const data =
      (result as { default?: ProfileDetailResponse }).default ?? result;
    return data as ProfileDetailResponse;
  }

  // Fallback to search data
  for (const platformData of allSearchData) {
    const accountMatch = platformData.accounts.find(
      (acc) => {
        const p = acc.account.user_profile;
        const u = p.username || p.handle || p.user_id || "";
        return u.toLowerCase() === username.toLowerCase();
      }
    );

    if (accountMatch) {
      return {
        data: {
          success: true,
          user_profile: accountMatch.account.user_profile as FullUserProfile,
        },
      };
    }
  }

  return null;
}
