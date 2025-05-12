import { CompanyMapper } from "infrastructure/mappers";

import type { HttpAdapter } from "config/adapters/http";
import type { Company } from "domain/entities";
import type { CompanyResponse } from "infrastructure/interfaces";


export const getCompaniesByUserUseCase = async (
  fetcher: HttpAdapter
): Promise<Company[]> => {
  try {
    const companiesByUser = await fetcher.get<CompanyResponse[]>(
      "/company/companies/user"
    );

    return companiesByUser.map(CompanyMapper.fromCompanyResponseToEntity);
  } catch (error) {
    throw new Error("Error getting companies by user");
  }
};
