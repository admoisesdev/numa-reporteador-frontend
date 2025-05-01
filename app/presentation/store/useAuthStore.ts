import { create } from "zustand";

import { apiFetcher } from "config/adapters";
import * as UseCases from "domain/use-cases/auth";

import type { User } from "domain/entities";
import { redirect, useNavigate } from "react-router";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  isLoading: boolean;
  errorMsg: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => void;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  errorMsg: null,
  isLoading: false,

  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });

      get().logout();

      return false;
    }

    set({ status: "authenticated", token, user });

    localStorage.setItem("token", token);

    return true;
  },
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    const res = await UseCases.loginUserUseCase(apiFetcher, {
      email,
      password,
    });

  
    set({ isLoading: false });

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
  logout: () => {
    localStorage.removeItem("token");

    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
