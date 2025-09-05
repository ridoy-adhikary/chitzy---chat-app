import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "dark", // Default to "dark" if no theme is found
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme); // Correct way to store the theme
    set({ theme }); // Update the theme in the Zustand store
  },
}));
