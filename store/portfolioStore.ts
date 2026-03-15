'use client';
import { create } from 'zustand';

export type Scene =
  | 'SCENE_DESK'
  | 'SCENE_LAPTOP_OPEN'
  | 'SCENE_LOGIN'
  | 'SCENE_DESKTOP'
  | 'SCENE_SECURITY'
  | 'SCENE_TRANSITION'
  | 'SCENE_PORTFOLIO';

interface PortfolioState {
  currentScene: Scene;
  soundEnabled: boolean;
  recruiterMode: boolean;
  introSkipped: boolean;

  setScene: (scene: Scene) => void;
  nextScene: () => void;
  skipIntro: () => void;
  toggleSound: () => void;
  toggleRecruiterMode: () => void;
}

const SCENE_ORDER: Scene[] = [
  'SCENE_DESK',
  'SCENE_LAPTOP_OPEN',
  'SCENE_LOGIN',
  'SCENE_DESKTOP',
  'SCENE_SECURITY',
  'SCENE_TRANSITION',
  'SCENE_PORTFOLIO',
];

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  currentScene: 'SCENE_DESK',
  soundEnabled: false,
  recruiterMode: false,
  introSkipped: false,

  setScene: (scene) => set({ currentScene: scene }),

  nextScene: () => {
    const { currentScene } = get();
    const idx = SCENE_ORDER.indexOf(currentScene);
    if (idx < SCENE_ORDER.length - 1) {
      set({ currentScene: SCENE_ORDER[idx + 1] });
    }
  },

  skipIntro: () => {
    set({ currentScene: 'SCENE_PORTFOLIO', introSkipped: true });
  },

  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

  toggleRecruiterMode: () =>
    set((s) => ({
      recruiterMode: !s.recruiterMode,
      currentScene: !s.recruiterMode ? 'SCENE_PORTFOLIO' : s.currentScene,
    })),
}));
