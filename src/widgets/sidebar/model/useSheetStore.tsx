import { create } from 'zustand';
import type { ReactNode } from 'react';

interface SheetState {
  isOpen: boolean;
  content: ReactNode | null;
  open: (content: ReactNode) => void;
  close: () => void;
}

export const useSheetStore = create<SheetState>((set) => ({
  isOpen: false,
  content: null,
  open: (content) => set({ isOpen: true, content }),
  close: () => set({ isOpen: false, content: null }),
}));

