import { AuthMapper } from "infrastructure/mappers";
import type { HttpAdapter } from "config/adapters";
import type { AuthResponse } from "infrastructure/interfaces";
import type { Auth } from "domain/entities";

export const loginUserUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<Auth> => {
  try {
    // const login = await fetcher.post<AuthResponse>("/auth/login", body);
    if (body.email === "numa@gmail.com" && body.password === "admin-numa123") {
      const login: AuthResponse = {
        token: "token",
        id: "1234567890",
        fullName: "John Doe",
        email: body.email,
        isActive: true,
        roles: ["admin"],
      };

      return AuthMapper.fromAuthResponseToToken(login);
    }

    return undefined as unknown as Auth;
  } catch (error) {
    throw new Error("Login failed. Please try again later.");
  }
};
