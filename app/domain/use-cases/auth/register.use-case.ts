import { AuthMapper } from "infrastructure/mappers";

import { HttpError } from "config/adapters/http";
import type { HttpAdapter } from "config/adapters";
import type { Auth } from "domain/entities";
import type { AuthResponse, MsgResponse } from "infrastructure/interfaces";


export const registerUserUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<Auth | MsgResponse> => {
  try {
    const register = await fetcher.post<AuthResponse>("/auth/register", body);

    return AuthMapper.fromAuthResponseToToken(register);
  } catch (error: any) {
    const errorData = HttpError.getError(error);
   
    return errorData;
    
  }
};
