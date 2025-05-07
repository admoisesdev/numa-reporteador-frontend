import type { HttpAdapter } from "config/adapters/http";
import type { Company } from "domain/entities";
import type { CompanyResponse } from "infrastructure/interfaces";

import { CompanyMapper } from "infrastructure/mappers";

export interface CompanyBody {
  ruc: string;
  businessName: string;
  project: string;
  commercial: string;
  establishment: string;
  legalRepresentative: string;
  resolutionDate: string;
}

export const createCompanyUseCase = async (
  fetcher: HttpAdapter,
  body: CompanyBody,
): Promise<Company> => {
  try {
    const newUser = await fetcher.post<CompanyResponse>("/company", body);

    return CompanyMapper.fromCompanyResponseToEntity(newUser);
  } catch (error) {
    throw new Error("Error creating company");
  }
};
