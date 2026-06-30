import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { SaveToListMenu } from "./SaveToListMenu";
interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-between p-4 bg-white border border-gray-200 mb-3 cursor-pointer hover:shadow-md transition-shadow rounded-xl w-full relative ${
        isMenuOpen ? "z-50" : "z-10"
      }`}
    >
      <div className="flex items-center gap-4">
        <img 
          src={profile.picture} 
          alt={`${profile.username} profile`} 
          className="w-14 h-14 rounded-xl object-cover" 
        />
        <div className="text-left">
          <div className="font-bold text-gray-900 text-lg flex items-center gap-1.5">
            {profile.fullname || profile.username}
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full capitalize">
              {platform}
            </span>
            <span>{formatFollowers(profile.followers)} Followers</span>
            <span>•</span>
            <span>Creator</span>
          </div>
        </div>
      </div>
      
      <div onClick={(e) => e.stopPropagation()}>
        <SaveToListMenu username={profile.username} onOpenChange={setIsMenuOpen} />
      </div>
    </div>
  );
});
