import { create } from "zustand";
import { persist } from "zustand/middleware";
import API, { setupInterceptors } from "../api/api.js";

export const useAuthProvider = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            logout: () => set({ user: null, token: null}),
            API,
        }),
        {
            name: "auth",
            partialize: (state) => ({
                user: state.user,
                token: state.token
            })
        }
    )
);

// Set up API interceptors after store is created
setupInterceptors(useAuthProvider.getState);
