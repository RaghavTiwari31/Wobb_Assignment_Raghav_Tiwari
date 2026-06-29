import { create } from 'zustand';
import type { Platform } from '@/types';

interface AppState {
  platform: Platform;
  searchQuery: string;
  savedProfiles: string[];
  setPlatform: (platform: Platform) => void;
  setSearchQuery: (query: string) => void;
  addProfileToList: (username: string) => void;
  removeProfileFromList: (username: string) => void;
}

export const useStore = create<AppState>((set) => ({
  platform: 'instagram',
  searchQuery: '',
  savedProfiles: [],
  setPlatform: (platform) => set({ platform, searchQuery: '' }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  addProfileToList: (username) =>
    set((state) => ({
      savedProfiles: state.savedProfiles.includes(username)
        ? state.savedProfiles
        : [...state.savedProfiles, username],
    })),
  removeProfileFromList: (username) =>
    set((state) => ({
      savedProfiles: state.savedProfiles.filter((u) => u !== username),
    })),
}));
