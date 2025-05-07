import type { HttpAdapter } from "config/adapters/http";
import type { UserCompany } from "domain/entities";

import type { UserCompanyResponse } from "infrastructure/interfaces";
import { UserMapper } from "infrastructure/mappers";

export const getUsersCompaniesUseCase = async (
  fetcher: HttpAdapter
): Promise<UserCompany[]> => {
  try {
    const usersWithCompanies = await fetcher.get<UserCompanyResponse[]>(
      "/company/companies/user"
    );

    return usersWithCompanies.map(UserMapper.fromResponseUserCompanyToEntity);
  } catch (error) {
    throw new Error("Error getting users with companies");
  }
};
