import type { CompanyResponse } from "./company.response";

export interface UserResponse{
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  activo: boolean;
  roles: string[];
}

export interface AuthResponse extends UserResponse {
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


