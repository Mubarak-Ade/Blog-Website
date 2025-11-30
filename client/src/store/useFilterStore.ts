import { create } from "zustand"


interface FilterState {
    limit: number,
    page: number
    search: string,
    searchDraft: string,
    authorDraft: string,
    category: string,
    tags: string,
    author: string,
    setSearch: (v: string) => void
    setAuthor: (v: string) => void
    setPage: (n: number) => void
    setFilter: (key: string, value: string | number) => void,
    next: () => void,
    prev: () => void,
    clearFilter: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
    search: "",
    category: "",
    tags: "",
    author: "",
    page: 1,
    limit: 5,
    searchDraft: "",
    authorDraft: "",
    setSearch: (v) => set({searchDraft: v}),
    setAuthor: (v) => set({authorDraft: v}),
    setFilter: (key, value) => {
        set((state) => ({
            [key]: value,
            page: 1
        }))
    },
    setPage: (n) => {
        set({page: n})
    },
    next: () => {
        set(state  => ({page: state.page + 1}))
    },
    prev: () => {
        set(state  => ({page: state.page - 1}))
    },
    clearFilter: () => {
        set({search: "", category: "", tags: "", author: "", authorDraft: "", searchDraft: ""})
    }
}))