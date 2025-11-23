import { Post } from "@/model/post.js";
import { create } from "zustand";

interface DashboardState {
    edit: null | Post,
    setEdit: (post: Post) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
    edit: null,
    setEdit: (data) => set({ edit: data }),
}));
