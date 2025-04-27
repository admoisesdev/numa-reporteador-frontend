import type { HttpAdapter } from "config/adapters";
import type { MessageResponse } from "infrastructure/interfaces";

export const resetPasswordUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<MessageResponse> => {
  const resetPassword = await fetcher.post<MessageResponse>(
    "/auth/reset-password",
    body
  );

  return resetPassword;
};
