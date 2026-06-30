import { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { PlatformFilter } from "@/components/search/PlatformFilter";
import { ProfileList } from "@/components/profile/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useStore } from "@/store/useStore";

export function SearchPage() {
  const { platform, searchQuery } = useStore();

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  
  const displayedProfiles = useMemo(() => {
    return filterProfiles(allProfiles, searchQuery);
  }, [allProfiles, searchQuery]);

  return (
    <Layout>
      <div className="max-w-4xl mb-8">
        <h1 className="text-4xl font-bold text-[#111827] mb-3 tracking-tight">Find Influencers</h1>
        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
          Discover high-impact creators across platforms. Refine your search to build
          the perfect campaign roster.
        </p>
      </div>

      <PlatformFilter />

      <div className="flex items-center justify-between mb-4 mt-6">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-900">{displayedProfiles.length}</span> profiles on {platform}
        </p>
      </div>

      {displayedProfiles.length > 0 ? (
        <ProfileList profiles={displayedProfiles} platform={platform} />
      ) : (
        <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200 mt-4">
          No profiles found.
        </div>
      )}
    </Layout>
  );
}
