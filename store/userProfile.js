import { create } from "zustand";
import api from "./api";

export const useUserProfile = create((set, get) => ({
  userProfile: null,
  error: null,
  isLoading: false,
  setUserProfile: (profile) => set({ userProfile: profile }),

  fetchUserProfile: async (jwt) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`${api}/api/profile`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      console.log("User profile fetched", data);
      set({ userProfile: data });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      set({ error: "Failed to fetch user profile" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
