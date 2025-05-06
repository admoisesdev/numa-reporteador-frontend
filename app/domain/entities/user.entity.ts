export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}

export interface Auth{
  token: string;
  user?: User;
}

export interface UserCompany {
  
}

