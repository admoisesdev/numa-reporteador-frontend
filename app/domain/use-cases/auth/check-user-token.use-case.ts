import { AuthMapper } from "infrastructure/mappers";

import type { HttpAdapter } from "config/adapters";
import type { Auth } from "domain/entities";
import type { AuthResponse, MsgResponse } from "infrastructure/interfaces";
import { HttpError } from "config/adapters/http";

export const checkUserTokenUseCase = async (
  fetcher: HttpAdapter
): Promise<Auth | MsgResponse> => {
  try {
    const checkStatus = await fetcher.get<AuthResponse>(
      `/auth/ckeck-auth-status`
    );

    return AuthMapper.fromAuthResponseToToken(checkStatus);
  } catch (error: any) {
    const errorData = HttpError.getError(error);

    return errorData;
  }
};
