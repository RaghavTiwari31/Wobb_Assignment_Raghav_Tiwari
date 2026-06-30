# Wobb Frontend Assignment Submission

## Overview
This repository contains my submission for the Wobb Frontend Assignment. I have transformed the starter template into a polished, production-ready Influencer Discovery Dashboard. The focus was on creating a modern, app-like UI/UX (CRM standard), fixing all underlying bugs, extending the mock data architecture to support deeper audience insights, and refactoring state management to be persistent and scalable.

## What I Changed
- **Bug Fixes:** 
  - Fixed image rendering issues and visual glitches (black borders, cut-off dropdowns).
  - Resolved the engagement rate calculation bug that caused rates to display as zero for all profiles except one.
- **Complete UI/UX Redesign:** 
  - Transitioned from a basic layout to a clean, enterprise-grade directory interface with a consistent design language.
  - Implemented responsive, full-width analytical grids for Profile Detail pages.
  - Added smooth micro-interactions, shared element transitions, and staggered list pop-ins to create a high-quality app feel.
- **State Management Refactor:** 
  - Completely replaced React Context with **Zustand**.
- **Advanced "My List" CRM Feature:** 
  - Transformed the stubbed "Add to List" button into a robust workflow feature. Users can now create custom-named segmented lists (e.g., "Q3 Tech Launch") and manage saved profiles across these segments.
- **Comprehensive Audience Insights:** 
  - Expanded the profile UI to include deep audience analytics: Age Distribution, Gender Split, Top Locations, Comment Sentiment, and an Activity Pattern Heatmap.
  - Safely expanded the JSON mock data architecture dynamically to populate these charts without breaking existing models.
- **Performance & Structural Optimizations:**
  - **Lazy Loading & Code-Splitting:** Implemented `React.lazy` and `Suspense` to split the monolithic JavaScript bundle, completely resolving the ~809KB chunk warning. Heavy dependencies like `recharts` only load when visiting a profile.
  - **Architectural Refactoring:** Reorganized the `src/components/` directory from a flat structure into domain-driven subfolders (`layout/`, `profile/`, `search/`) for enterprise-grade scalability.
  - **Hooks & Memoization:** Memoized charting data using `useMemo` to ensure deterministic rendering, while strictly adhering to React's Rules of Hooks.
  - **Robustness:** Upgraded Zustand list ID generation to use collision-proof `crypto.randomUUID()`. Cleaned up all dead code, unused components, and inaccessible decorative UI.

## Libraries Added
- **`zustand`**: Chosen for lightweight, boilerplate-free global state management with built-in `localStorage` persist middleware to ensure saved custom lists survive page refreshes.
- **`recharts`**: Selected to quickly and reliably build responsive data visualizations (Pie, Bar, and Line charts) for the new audience insights section.
- **`framer-motion`**: Used to implement professional, fluid UI animations (staggered list reveals, page transitions) that elevate the user experience.
- **`lucide-react`**: Added for clean, modern SVG icons that match the redesigned enterprise UI.

## Assumptions Made
- **Mock Data Expansion:** I assumed it was within the scope of the assignment to structurally modify and extend the provided static `.json` files to support the new Audience Insights visualizations (adding `audience` objects to each profile).
- **Persistence Mechanism:** Since this is a frontend evaluation without a real backend, I assumed local persistence (via Zustand's persist middleware) was the optimal way to satisfy the "save to list" requirements.

## Trade-offs
- **Bundle Size vs. Premium UX:** Integrating `recharts` and `framer-motion` increases the initial JavaScript bundle size. However, the trade-off is well worth it, as these libraries were instrumental in meeting the requirement for a "polished, modern interface" and deep data visualization.
- **Monolithic JSON Files:** Storing comprehensive profile data and historical stats in static JSON files means the assets are quite large. For a real production app, this data would be fetched asynchronously via a paginated API. For this mock, it allows immediate rendering but bloats the build.
- **Local Storage Limitations:** Custom lists are saved in the browser's local storage. This means user data will not sync across different devices or browsers, but it effectively fulfills the assignment requirements within a frontend-only scope.

## Any Remaining Improvements
- **Dynamic JSON Imports:** While I successfully implemented route-level code-splitting to solve the main bundle warning, the static JSON mock files could be further optimized by dynamically importing them (`import()`) strictly on-demand to reduce chunk sizes further.
- **Automated Testing:** Introducing unit and integration tests using Vitest and React Testing Library to verify the data parsing logic and ensure the Zustand store accurately manages list additions, duplicates, and removals.
- **Advanced Filtering Capabilities:** Expanding the global search functionality to allow filtering by the newly added demographics (e.g., "Find influencers with >40% US audience").

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in the browser.
