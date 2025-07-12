import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/user';

interface UserState {
    user: User;
    getUser: () => User;
    setUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: {
                id: '',
                nickname: '',
                token: '',
            },
            getUser: () => get().user,
            setUser: (user) => set(() => ({ user })),
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);