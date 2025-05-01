import { create } from "zustand";

import { apiFetcher } from "config/adapters";
import * as UseCases from "domain/use-cases/auth";

import type { User } from "domain/entities";
import type { MsgResponse } from "infrastructure/interfaces";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  error: MsgResponse | null;

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
  error: null,

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
    const res = await UseCases.loginUserUseCase(apiFetcher, {
      email,
      password,
    });

    if ("statusCode" in res) {
      set({ error: res });
      return false;
    }

    return get().changeStatus(res?.token, res?.user);
  },
  register: async (fullName: string, email: string, password: string) => {
    const res = await UseCases.registerUserUseCase(apiFetcher, {
      fullName,
      email,
      password,
    });

    if ("statusCode" in res) {
      set({ error: res });
      return false;
    }

    return get().changeStatus(res?.token, res?.user);
  },
  checkStatus: async () => {
    const res = await UseCases.checkUserTokenUseCase(apiFetcher);

    if ("statusCode" in res) {
      set({ error: res });
      return;
    }

    get().changeStatus(res?.token, res?.user);
  },
  logout: () => {
    localStorage.removeItem("token");

    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
