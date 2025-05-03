import { create } from 'zustand';
import { User } from '../types/user';
import { persist } from 'zustand/middleware';

interface UsersStore {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  clearUsers: () => void;
  setUsers: (users: User[]) => void;
}

export const useUsersStore = create<UsersStore>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      removeUser: (id) => set((state) => ({ users: state.users.filter((u: User) => u.id !== id) })),
      clearUsers: () => set({ users: [] }),
      setUsers: (users) => set({ users }),
    }),
    {
      name: 'users-storage',
    }
  )
);
