import { AuthMapper } from "infrastructure/mappers"
  ;
import type { HttpAdapter } from "config/adapters";
import type { AuthResponse } from "infrastructure/interfaces";

export const loginUserUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<string> => {
  const login = await fetcher.post<AuthResponse>("/auth/login", body);

  return AuthMapper.fromAuthResponseToToken(login);
};
