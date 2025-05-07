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
  isLoading: boolean;
  isRegister: boolean;
  error: MsgResponse | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (registerBody: UseCases.RegisterBody) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => void;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  isRegister: false,
  isLoading: false,
  error: null,

  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      get().clearError();

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

    get().clearError();

    return get().changeStatus(res?.token, res?.user);
  },
  register: async (registerBody: UseCases.RegisterBody) => {
    set({ isLoading: true });
    set({ isRegister: true });

    const { name, lastName, email, password } = registerBody;

    const res = await UseCases.registerUserUseCase(apiFetcher, {
      name,
      lastName,
      email,
      password,
    });

    set({ isLoading: false });

    if ("statusCode" in res) {
      set({ error: res });
      return false;
    }

    get().clearError();

    return get().changeStatus(res?.token, res?.user);
  },
  checkStatus: async () => {
    const res = await UseCases.checkUserTokenUseCase(apiFetcher);

    if ("statusCode" in res) {
      set({ error: res });
      get().logout();
      return;
    }

    get().clearError();

    get().changeStatus(res?.token, res?.user);
  },
  logout: () => {
    localStorage.removeItem("token");

    set({ status: "unauthenticated", token: undefined, user: undefined });
    get().clearError();
  },
  hasRole: (role: string): boolean => {
    const user = get().user;
    return user?.roles?.includes(role) || false;
  },

  hasAnyRole: (roles: string[]): boolean => {
    const user = get().user;
    if (!user?.roles) return false;
    return roles.some((role) => user.roles.includes(role));
  },
  clearError: () => {
    set({ error: null });
  },
}));
