import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

const SearchPage = lazy(() => import("@/pages/SearchPage").then(module => ({ default: module.SearchPage })));
const ProfileDetailPage = lazy(() => import("@/pages/ProfileDetailPage").then(module => ({ default: module.ProfileDetailPage })));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Layout><div className="flex h-[50vh] items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div></Layout>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile/:username" element={<ProfileDetailPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
