import type { HttpAdapter } from "config/adapters";
import type { MessageResponse } from "infrastructure/interfaces";

export const changePasswordUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>,
  token: string
): Promise<MessageResponse> => {
  const resetPassword = await fetcher.post<MessageResponse>(
    `/auth/change-password/${token}`,
    body
  );

  return resetPassword;
};
