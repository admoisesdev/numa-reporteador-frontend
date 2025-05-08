import type { HttpAdapter } from "config/adapters/http";
import type { UserCompany } from "domain/entities";
import type { MsgResponse, UserCompanyResponse } from "infrastructure/interfaces";

import { UserMapper } from "infrastructure/mappers";
import { HttpError } from "config/helpers";

export interface UserBody {
  name: string;
  lastName: string;
  email: string;
  password: string;
  roles?: string[];
  companyIds?: number[];
}

export const createUserUseCase = async (
  fetcher: HttpAdapter,
  body: UserBody
): Promise<UserCompany | MsgResponse> => {
  try {
    const newUser = await fetcher.post<UserCompanyResponse>("/user", body);
    console.log("newUser", newUser);

    return UserMapper.fromResponseUserCompanyToEntity(newUser);
  } catch (error: any) {
    const errorData = HttpError.getError(error);

    return errorData;
  }
};
