import { CompanyMapper } from "./company.mapper";

import type { FullUser, UserCompany } from "domain/entities";
import type {
  UserCompanyResponse,
  UserResponse,
} from "infrastructure/interfaces";

export class UserMapper {
  static fromUserCompanyResponseToEntity(
    response: UserCompanyResponse
  ): UserCompany {
    return {
      id: response.id,
      name: response.nombre,
      lastName: response.apellido,
      email: response.email,
      isActive: response.activo,
      roles: response.roles,
      companies: response.empresas.map(
        CompanyMapper.fromCompanyResponseToEntity
      ),
    };
  }

  static fromUserResponseToEntity(response: UserResponse): FullUser {
    return {
      id: response.id,
      name: response.nombre,
      lastName: response.apellido,
      email: response.email,
      isActive: response.activo,
      roles: response.roles,
    };
  }
}
