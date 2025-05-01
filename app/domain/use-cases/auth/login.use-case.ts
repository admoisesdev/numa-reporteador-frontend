import { AuthMapper } from "infrastructure/mappers";
import { HttpError } from "config/adapters/http";

import type { HttpAdapter } from "config/adapters";
import type { AuthResponse, MsgResponse } from "infrastructure/interfaces";
import type { Auth } from "domain/entities";

export const loginUserUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<Auth | MsgResponse> => {
  try {
    const login = await fetcher.post<AuthResponse>("/auth/login", body);

    return AuthMapper.fromAuthResponseToToken(login);
  } catch (error: any) {
    const errorData = HttpError.getError(error);

    return errorData;
  }
};
