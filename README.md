# Wobb Frontend Assignment

A starter influencer search application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. This project is intentionally left in a rough-but-working state for candidates to improve.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## What's Included

- **Search / Dashboard** — filter influencers by platform (Instagram, YouTube, TikTok) and search by username or full name
- **Profile Details** — click a profile to view extended data loaded from individual JSON files
- **Routing** — `react-router-dom` with `/` (search) and `/profile/:username` (details)

Sample data lives in:

- `src/assets/data/search/` — platform search results (10 profiles each)
- `src/assets/data/profiles/` — detailed profile JSON per username

## How to Submit

1. **Download or clone** this starter project to your machine.
2. **Create a new repository** on your own GitHub account. Do not fork the original assignment repo — push your work to a repo you own.
3. Complete the tasks below and push your changes to that repository.
4. **Share the public GitHub repository URL** with us as your submission.

### Deadline (strict)

- **Due:** **2 July 2026, 2:00 PM IST** (Indian Standard Time, UTC+5:30)
- **Any git commits made after this deadline will disqualify your submission.** We will only consider the repository state as of the deadline; late commits will not be reviewed.
- Make sure your final work is pushed **before** the cutoff.

## AI Usage

You may use any AI tools (Cursor, ChatGPT, Claude, GitHub Copilot, etc.). We are evaluating your final solution and engineering decisions.

## Your Tasks

Complete the following as part of your submission:

1. **Find and fix all bugs and quality issues** — the codebase contains intentional bugs and quality issues. Identify and resolve them.

2. **Completely redesign the UI/UX** — replace the basic layout with a polished, modern interface. Focus on usability, visual hierarchy, and delight.

3. **Replace React Context with Zustand** — when you implement state management for the selected list, use [Zustand](https://github.com/pmndrs/zustand) instead of React Context.

4. **Implement "Select profile & Add to List"** — the disabled "Add to List" button is a stub. Build the full feature:
   - Select / add profiles to a persistent list
   - View and manage the selected list
   - Handle duplicates appropriately

5. **Improve code quality and project structure** — refactor as needed, add proper types, and follow React best practices.

6. **Optimize performance** — apply sensible optimizations where appropriate.

7. **Use any libraries you need** — you are not limited to the current stack. Choose tools that help you deliver a great result (UI kits, state managers, testing libraries, etc.).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run lint` | Run ESLint               |

## Submission Details

### What I Changed
- **Bug Fixes:** Resolved rendering issues with missing profile images, corrected the engagement rate calculation bug that affected all profiles except Cristiano Ronaldo, and fixed global CSS bugs (e.g., side black borders, cut-off dropdown menus).
- **UI/UX Redesign:** Completely overhauled the frontend design. Transitioned to a clean, modern, and professional directory layout. Implemented smooth micro-interactions, shared element transitions, and staggered list pop-ins to create an app-like feel.
- **State Management Refactor:** Replaced standard React Context with **Zustand** for state management.
- **Advanced "My List" Feature:** Transformed the basic "Add to List" stub into a robust CRM-style feature. Users can now create, name, and manage custom segmented lists (e.g., "Q3 Tech Launch") which are persisted across sessions.
- **Audience Insights Dashboard:** Expanded profile data to include comprehensive Audience Insights. Built responsive visualizations for Age Distribution, Gender Split, Top Locations, Comment Sentiment, and an intricate Activity Pattern Heatmap.
- **Responsive Layout:** Refactored the layout structure of the `ProfileDetailPage` to ensure the new analytics and demographic charts utilize the full screen width and stack perfectly across all device sizes.

### Libraries I Added
- `zustand` - For lightweight, scalable, and persistent global state management.
- `recharts` - To build the responsive data visualizations (Pie, Bar, and Line charts) for audience insights.
- `framer-motion` - To implement smooth, professional UI animations (staggered list reveals, smooth accordion expansions, particle effects).
- `lucide-react` - For clean, modern SVG icons used throughout the redesigned UI.

### Assumptions Made
- **Mock Data Structure:** I assumed it was acceptable to programmatically extend the existing static JSON files with new fields (like the `audience` insights object) to support the new UI features.
- **Persistence:** Since this is a frontend-focused assignment, I assumed local persistence (via `localStorage` and Zustand's persist middleware) was the desired approach for saving the custom lists rather than mocking a complex backend database.

### Trade-offs
- **Bundle Size vs. UX:** Adding `recharts` and `framer-motion` increases the overall JavaScript bundle size. However, the trade-off was deemed necessary to meet the requirement for a "polished, modern interface" with robust analytics and delightful micro-interactions.
- **JSON Loading:** Extending the existing mock `.json` files means the asset sizes grew significantly. For a real production app, this data would be paginated and fetched via a real API, but for this mock, keeping the data static allows for immediate rendering.
- **Local Storage:** The custom lists are saved in the browser's local storage. The trade-off is that user lists won't sync across different devices, but it fulfills the assignment requirements without needing to build and host a backend.

### Any Remaining Improvements
- **Code-Splitting JSON Assets:** The static JSON files result in large JS chunks post-build. Implementing `dynamic import()` for these mock profiles would significantly improve the initial load time.
- **Testing:** Introducing unit and integration tests (e.g., with Vitest and React Testing Library) to verify the data parsing logic and ensure the Zustand store accurately manages list additions/removals.
- **Advanced Filtering:** Expanding the search functionality beyond just names and platforms to allow filtering by the newly added demographics (e.g., "Find influencers with >40% US audience").
