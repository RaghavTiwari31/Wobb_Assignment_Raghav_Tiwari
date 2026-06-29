import { useStore } from "@/store/useStore";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <input
      className="w-full max-w-md border px-3 py-2 rounded"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search by username or name..."
    />
  );
}
