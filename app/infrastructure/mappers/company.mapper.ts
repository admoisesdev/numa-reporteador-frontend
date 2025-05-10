import type { Company } from "domain/entities";
import type { CompanyResponse, SelectOption } from "infrastructure/interfaces";

export class CompanyMapper {
  static fromCompanyResponseToEntity(response: CompanyResponse): Company {
    return {
      id: response.id,
      ruc: response.ruc,
      businessName: response.razon_social,
      project: response.proyecto,
      commercial: response.comercial,
      establishment: response.establecimiento,
      legalRepresentative: response.representante_legal,
      resolutionDate: response.fecha,
      isActive: response.estado,
    };
  }

  static fromCompanyResponseToSelectOption(
    response: Company
  ): SelectOption {
    return {
      value: response.id,
      label: response.businessName,
    };
  }
}