import type { HttpAdapter } from "config/adapters";
import type { MsgResponse } from "infrastructure/interfaces";

export const confirmAccountUseCase = async (
  fetcher: HttpAdapter,
  id: string
): Promise<MsgResponse> => {
  const confirmAccount = await fetcher.get<MsgResponse>(
    `/auth/validate-email/${id}`
  );

  return confirmAccount;
};
