import { HttpError } from "config/helpers";
import { AuthMapper } from "infrastructure/mappers";
import type { AuthResponse, MsgResponse } from "infrastructure/interfaces";
import type { Auth } from "domain/entities";
import type { HttpAdapter } from "config/adapters";

export const changePasswordUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<Auth | MsgResponse> => {
  try {
    const changePassword = await fetcher.post<AuthResponse>(
      `/auth/change-password`,
      body
    );

    return AuthMapper.fromAuthResponseToToken(changePassword);
  } catch (error: any) {
    const errorData = HttpError.getError(error);

    return errorData;
  }
};
