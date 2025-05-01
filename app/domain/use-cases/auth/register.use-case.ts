import { AuthMapper } from "infrastructure/mappers";

import { HttpError } from "config/helpers";
import type { HttpAdapter } from "config/adapters";
import type { Auth } from "domain/entities";
import type { AuthResponse, MsgResponse } from "infrastructure/interfaces";

export interface RegisterBody{
  name: string;
  lastName: string;
  email: string;
  password: string;
}


export const registerUserUseCase = async (
  fetcher: HttpAdapter,
  body: RegisterBody
): Promise<Auth | MsgResponse> => {
  try {
    const register = await fetcher.post<AuthResponse>("/auth/register", body);

    return AuthMapper.fromAuthResponseToToken(register);
  } catch (error: any) {
    const errorData = HttpError.getError(error);

    return errorData;
  }
};
