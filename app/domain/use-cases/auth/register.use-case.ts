import type { HttpAdapter } from "config/adapters";
import type { MessageResponse } from "infrastructure/interfaces";


export const registerUserUseCase = async (
  fetcher: HttpAdapter,
  body: Record<string, string>
): Promise<MessageResponse> => {
  const register = await fetcher.post<MessageResponse>("/auth/register", body);

  return register;
};
