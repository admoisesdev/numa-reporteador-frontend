import type { HttpAdapter } from "config/adapters/http";
import type { Company } from "domain/entities";

import type { CompanyResponse } from "infrastructure/interfaces";
import { CompanyMapper } from "infrastructure/mappers";

export const getCompaniesUseCase = async (
  fetcher: HttpAdapter
): Promise<Company[]> => {
  try {
    const companies = await fetcher.get<CompanyResponse[]>(
      "/company"
    );

    return companies.map(CompanyMapper.fromCompanyResponseToEntity);
  } catch (error) {
    throw new Error("Error getting all companies");
  }
};
