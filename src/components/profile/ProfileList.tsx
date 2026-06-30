import { memo } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { motion } from "framer-motion";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
};

export const ProfileList = memo(function ProfileList({
  profiles,
  platform,
}: ProfileListProps) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4 w-full"
    >
      {profiles.length === 0 && <p className="text-gray-500 text-center py-8">No profiles found</p>}
      {profiles.map((profile) => (
        <motion.div key={profile.user_id} variants={itemVariants} className="w-full">
          <ProfileCard
            profile={profile}
            platform={platform}
          />
        </motion.div>
      ))}
    </motion.div>
  );
});
