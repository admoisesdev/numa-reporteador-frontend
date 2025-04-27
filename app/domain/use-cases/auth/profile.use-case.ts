import { AuthMapper } from "infrastructure/mappers";

import type { HttpAdapter } from "config/adapters";
import type { User } from "domain/entities";
import type { ProfileResponse } from "infrastructure/interfaces";

export const profileUseCase = async (
  fetcher: HttpAdapter,
  token: string
): Promise<User> => {
  const profile = await fetcher.get<ProfileResponse>(
    "/auth/profile",
    {},
    token
  );

  return AuthMapper.fromAuthResponseToUserProfile(profile);
};
