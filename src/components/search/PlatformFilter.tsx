import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { useStore } from "@/store/useStore";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Camera, PlayCircle, Music, Globe } from "lucide-react";
import type { Platform } from "@/types";

function getPlatformIcon(platform: Platform) {
  switch(platform) {
    case 'instagram': return <Camera className="w-4 h-4" />;
    case 'youtube': return <PlayCircle className="w-4 h-4" />;
    case 'tiktok': return <Music className="w-4 h-4" />;
    default: return <Globe className="w-4 h-4" />;
  }
}

export function PlatformFilter() {
  const { platform, setPlatform, searchQuery, setSearchQuery } = useStore();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8 shadow-sm">
      <div className="flex gap-3 mb-4">
        {PLATFORMS.map((p) => {
          const isActive = platform === p;
          return (
            <motion.button
              key={p}
              type="button"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPlatform(p)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-[#EEEDFC] text-[#4F46E5] border border-[#EEEDFC]" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {getPlatformIcon(p)}
              {getPlatformLabel(p)}
            </motion.button>
          );
        })}
      </div>
      
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          aria-label="Search profiles by name, niche, or keyword"
          className="w-full bg-[#F8F9FA] border-none text-gray-900 px-12 py-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 text-sm placeholder:text-gray-500 transition-shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, niche, or keyword..."
        />
      </div>
    </div>
  );
}
