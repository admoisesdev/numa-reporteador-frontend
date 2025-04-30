import { AuthMapper } from "infrastructure/mappers";

import type { HttpAdapter } from "config/adapters";
import type { Auth } from "domain/entities";
import type { AuthResponse } from "infrastructure/interfaces";

export const checkUserTokenUseCase = async (
  fetcher: HttpAdapter
): Promise<Auth> => {
  const checkStatus = await fetcher.get<AuthResponse>(
    `/auth/ckeck-auth-status`
  );

  return AuthMapper.fromAuthResponseToToken(checkStatus);
};
