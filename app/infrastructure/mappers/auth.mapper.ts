import type { Auth } from "domain/entities";
import type { AuthResponse } from "infrastructure/interfaces";

export class AuthMapper {
  static fromAuthResponseToToken(response: AuthResponse): Auth {
    const { token, ...user } = response;

    return { token, user };
  }
}
