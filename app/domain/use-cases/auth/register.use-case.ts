import { AuthMapper } from "infrastructure/mappers";

import type { HttpAdapter } from "config/adapters";
import type { Auth } from "domain/entities";
import type { AuthResponse, } from "infrastructure/interfaces";


export const registerUserUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<Auth> => {
  try {
    const register = await fetcher.post<AuthResponse>("/auth/register", body);

    return AuthMapper.fromAuthResponseToToken(register);
  } catch (error) {
    throw new Error("Registration failed. Please try again later.");
    
  }
};
