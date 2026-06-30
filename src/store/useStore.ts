import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Platform } from '@/types';

export interface CustomList {
  id: string;
  name: string;
  profiles: string[];
}

interface AppState {
  platform: Platform;
  searchQuery: string;
  customLists: CustomList[];
  setPlatform: (platform: Platform) => void;
  setSearchQuery: (query: string) => void;
  createList: (name: string) => void;
  deleteList: (id: string) => void;
  toggleProfileInList: (listId: string, username: string) => void;
}

const defaultLists: CustomList[] = [
  { id: 'default', name: 'Favorites', profiles: [] }
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      platform: 'instagram',
      searchQuery: '',
      customLists: defaultLists,
      setPlatform: (platform) => set({ platform, searchQuery: '' }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      createList: (name) =>
        set((state) => ({
          customLists: [...state.customLists, { id: Date.now().toString(), name, profiles: [] }],
        })),
      deleteList: (id) =>
        set((state) => ({
          customLists: state.customLists.filter((list) => list.id !== id),
        })),
      toggleProfileInList: (listId, username) =>
        set((state) => {
          return {
            customLists: state.customLists.map((list) => {
              if (list.id !== listId) return list;
              const hasProfile = list.profiles.includes(username);
              return {
                ...list,
                profiles: hasProfile
                  ? list.profiles.filter((u) => u !== username)
                  : [...list.profiles, username],
              };
            }),
          };
        }),
    }),
    {
      name: 'influencer-storage-v2', // bumped storage key since structure changed
      partialize: (state) => ({ customLists: state.customLists }),
    }
  )
);
