import { useMemo } from "react";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useStore } from "@/store/useStore";

export function SearchPage() {
  const { platform, searchQuery } = useStore();

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(() => filterProfiles(allProfiles, searchQuery), [allProfiles, searchQuery]);

  return (
    <Layout title="Find Influencers">
      <p className="text-gray-500 mb-4 text-sm">
        Browse top creators across social platforms
      </p>

      <PlatformFilter />

      <p className="text-xs text-gray-400 mb-2">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>

      <ProfileList profiles={filtered} platform={platform} />
    </Layout>
  );
}
