import type { HttpAdapter } from "config/adapters/http";
import type { Company } from "domain/entities";
import type { CompanyResponse } from "infrastructure/interfaces";

import { CompanyMapper } from "infrastructure/mappers";

export const createCompanyUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<Company> => {
  try {
    const newUser = await fetcher.post<CompanyResponse>("/company", body);

    return CompanyMapper.fromCompanyResponseToEntity(newUser);
  } catch (error) {
    throw new Error("Error creating company");
  }
};
