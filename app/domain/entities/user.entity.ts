import type { Company } from "./company.entity";

export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}

export interface FullUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isActive: boolean;
  roles: string[];
}

export interface Auth{
  token: string;
  user?: User;
}

export interface UserCompany {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isActive: boolean;
  roles: string[];
  companies: Company[];
}

