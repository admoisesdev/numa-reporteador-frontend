import type { Auth, User } from "domain/entities";
import type { AuthResponse } from "infrastructure/interfaces";

export class AuthMapper {
  static fromAuthResponseToToken(response: AuthResponse): Auth {
    const { token, ...user } = response;

    return { token, user: AuthMapper.fromAuthResponseToUser(user) };
  }

  static fromAuthResponseToUser(response: Omit<AuthResponse, 'token'>): User {
    const { id, email, nombre, apellido, activo, roles } = response;

    return {
      id,
      email,
      fullName: `${nombre} ${apellido}`,
      isActive: activo,
      roles,
    };
  }
}
