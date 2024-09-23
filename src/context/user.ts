import type { UserResponse } from "@/lib/api";
import { create } from "zustand";

type User = {
  user: UserResponse | null;
  setUser: (user: any) => void;
};

export const useUser = create<User>()((set) => ({
  user: null,
  setUser: (user: UserResponse) => set(() => ({ user })),
}));
