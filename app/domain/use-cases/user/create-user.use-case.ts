import type { HttpAdapter } from "config/adapters/http";
import type { UserCompany } from "domain/entities";

import type { UserCompanyResponse } from "infrastructure/interfaces";
import { UserMapper } from "infrastructure/mappers";

export const createUserUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<UserCompany> => {
  try {
    const newUser = await fetcher.post<UserCompanyResponse>("/user", body);

    return UserMapper.fromResponseUserCompanyToEntity(newUser);
  } catch (error) {
    throw new Error("Error creating user");
  }
};
