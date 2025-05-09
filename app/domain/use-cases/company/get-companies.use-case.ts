import type { HttpAdapter } from "config/adapters/http";

import type { CompanyResponse, SelectOption } from "infrastructure/interfaces";
import { CompanyMapper } from "infrastructure/mappers";

export const getCompaniesUseCase = async (
  fetcher: HttpAdapter
): Promise<SelectOption[]> => {
  try {
    const companies = await fetcher.get<CompanyResponse[]>(
      "/company"
    );

    return companies.map(CompanyMapper.fromCompanyResponseToSelectOption);
  } catch (error) {
    throw new Error("Error getting all companies");
  }
};
