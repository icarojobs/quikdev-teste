import { create } from 'zustand';

export const useUserStore = create((set) => {
    return {
        user: [],
        addUser: (data) => set((state) => ({user: [...state.user, data]})),
        removeUser: (id) => set((state) => ({ user: state.user.filter((data) => data.id !== id) })),
    };
});