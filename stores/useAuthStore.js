import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", 
      partialize: (state) => ({ user: state.user }), // only save `user`, not everything
    }
  )
);

export default useAuthStore;
