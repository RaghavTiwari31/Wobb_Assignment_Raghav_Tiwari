import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { useStore } from "@/store/useStore";
import { SearchBar } from "./SearchBar";

export function PlatformFilter() {
  const { platform, setPlatform } = useStore();

  return (
    <div className="mb-4">
      <div className="flex gap-2 justify-center mb-3">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPlatform(p)}
            className={`px-4 py-2 border rounded ${
              platform === p ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>
      <SearchBar />
    </div>
  );
}
