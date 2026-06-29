import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useStore } from "@/store/useStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { savedProfiles, addProfileToList, removeProfileFromList } = useStore();
  
  const isSaved = savedProfiles.includes(profile.username);

  const handleClick = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      removeProfileFromList(profile.username);
    } else {
      addProfileToList(profile.username);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-full max-w-3xl rounded"
    >
      <img src={profile.picture} alt={`${profile.username} profile`} className="w-12 h-12 rounded-full" />
      <div className="text-left flex-1">
        <div className="font-bold flex items-center gap-1">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowers(profile.followers)} followers</div>
      </div>
      <button
        className={`px-3 py-1 text-sm rounded ${isSaved ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
        onClick={toggleSave}
      >
        {isSaved ? 'Saved' : 'Add to List'}
      </button>
    </div>
  );
});
