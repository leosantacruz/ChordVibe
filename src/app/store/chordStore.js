import { create } from 'zustand';
import { list } from "../data/collection";
export const useChordStore = create((set) => ({
    selectedProgression: list[0],
    setSelectedProgression: (progression) => set({ selectedProgression: progression }),
    clearProgression: () => set({ selectedProgression: null }),
}));