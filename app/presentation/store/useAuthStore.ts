import { create } from "zustand";

import { apiFetcher } from "config/adapters";
import * as UseCases from "domain/use-cases/auth";

import type { User } from "domain/entities";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;

  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });

      get().logout();

      return false;
    }

    set({ status: "authenticated", token, user });

    await localStorage.setItem("token", token);

    return true;
  },
  login: async (email: string, password: string) => {
    const res = await UseCases.loginUserUseCase(apiFetcher, {
      email,
      password,
    });

    return get().changeStatus(res?.token, res?.user);
  },
  register: async (fullName: string, email: string, password: string) => {
    const res = await UseCases.registerUserUseCase(apiFetcher, {
      fullName,
      email,
      password,
    });

    return get().changeStatus(res?.token, res?.user);
  },
  checkStatus: async () => {
    const res = await UseCases.checkUserTokenUseCase(apiFetcher);

    get().changeStatus(res?.token, res?.user);
  },
  logout: async () => {
    await localStorage.deleteItem("token");

    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
