import { create } from "zustand";
import { persist } from "zustand/middleware";
import API, { setupInterceptors } from "../api/api.js";
import { User } from "@/model/user.js";

interface AuthState {
    user: null | User,
    token: null | string,
    setUser: (user: User) => void,
    setToken: (token: string) => void,
    logout: () => void
}

export const useAuthProvider = create(
    persist<AuthState>(
        (set) => ({
            user: null,
            token: null,
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            logout: () => set({ user: null, token: null}),
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
