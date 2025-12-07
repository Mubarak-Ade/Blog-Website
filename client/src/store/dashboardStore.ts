import { Post } from "@/model/post.js";
import { create } from "zustand";

interface DashboardState {
    edit: null | Post,
    setEdit: (post: Post) => void,
    clearEdit: () => void,
}

export const useDashboardStore = create<DashboardState>((set) => ({
    edit: null,
    setEdit: (data) => set({ edit: data }),
    clearEdit: () => set({ edit: null })
}));
