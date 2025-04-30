import { AuthMapper } from "infrastructure/mappers";
import type { HttpAdapter } from "config/adapters";
import type { AuthResponse } from "infrastructure/interfaces";
import type { Auth } from "domain/entities";

export const loginUserUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<Auth> => {
  try {
    const login = await fetcher.post<AuthResponse>("/auth/login", body);
    
    return AuthMapper.fromAuthResponseToToken(login);
  } catch (error) {
    throw new Error("Login failed. Please try again later.");
  }
};
