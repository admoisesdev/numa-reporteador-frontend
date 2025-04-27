import type { HttpAdapter } from "config/adapters";
import type { MessageResponse } from "infrastructure/interfaces";

export const confirmAccountUseCase = async (
  fetcher: HttpAdapter,
  id: string
): Promise<MessageResponse> => {
  const confirmAccount = await fetcher.get<MessageResponse>(
    `/auth/validate-email/${id}`
  );

  return confirmAccount;
};
