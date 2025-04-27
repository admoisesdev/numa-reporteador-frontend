import type { HttpAdapter } from "config/adapters";
import type { MessageResponse } from "infrastructure/interfaces";

export const checkUserTokenUseCase = async (
  fetcher: HttpAdapter,
  token: string
): Promise<MessageResponse> => {
  const resetPassword = await fetcher.get<MessageResponse>(
    `/auth/change-password/${token}`
  );

  return resetPassword;
};
