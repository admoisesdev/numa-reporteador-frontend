import type { Company } from "domain/entities";
import type { CompanyResponse } from "infrastructure/interfaces";

export class CompanyMapper {
  static fromCompanyResponseToEntity(
    companyResponse: CompanyResponse
  ): Company {
    return {};
  }
}