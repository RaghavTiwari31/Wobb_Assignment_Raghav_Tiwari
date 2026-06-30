import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SavedList } from "./SavedList";
import { Bell, Heart } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title?: string; // keeping title prop just in case, but won't render it in the header
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity flex items-center gap-2">
            Lumina Directory
          </Link>
          <div className="flex items-center gap-4">
            <SavedList />
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">{children}</main>
    </div>
  );
}
