import type { HttpAdapter } from "config/adapters/http";
import type { UserCompany } from "domain/entities";

import type { UserCompanyResponse } from "infrastructure/interfaces";
import { UserMapper } from "infrastructure/mappers";

export const getCompaniesByUserUseCase = async (
  fetcher: HttpAdapter
): Promise<UserCompany[]> => {
  try {
    const companiesByUser = await fetcher.get<UserCompanyResponse[]>(
      "/user/companies"
    );

    return companiesByUser.map(UserMapper.fromUserCompanyResponseToEntity);
  } catch (error) {
    throw new Error("Error getting companies by user");
  }
};
