import type { CompanyResponse } from "./company.response";

export interface AuthResponse {
  id: string;
  activo: boolean;
  apellido: string;
  email: string;
  nombre: string;
  roles: string[];
  token: string;
}

export interface UserCompanyResponse {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  activo: boolean;
  roles: string[];
  empresas: CompanyResponse[];
}


