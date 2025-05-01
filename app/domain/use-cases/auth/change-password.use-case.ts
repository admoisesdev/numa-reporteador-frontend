import type { HttpAdapter } from "config/adapters";
import type { MsgResponse } from "infrastructure/interfaces";

export const changePasswordUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>,
  token: string
): Promise<MsgResponse> => {
  const resetPassword = await fetcher.post<MsgResponse>(
    `/auth/change-password/${token}`,
    body
  );

  return resetPassword;
};
