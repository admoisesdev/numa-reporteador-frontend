import type { User } from "domain/entities";
import type { AuthResponse, ProfileResponse } from "infrastructure/interfaces";

export class AuthMapper {
  static fromAuthResponseToToken(response: AuthResponse): string {
    return response.token;
  }

  static fromAuthResponseToUserProfile(response: ProfileResponse): User {
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      img: response.img,
    };
  }
}
