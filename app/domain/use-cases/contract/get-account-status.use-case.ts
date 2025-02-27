import type { HttpAdapter } from "config/adapters/http";

import { ContractMapper } from "infrastructure/mappers";
import type { AccountStatusResponse } from "infrastructure/interfaces";
import type { AccountStatus } from "domain/entities";

export interface AccountStatusParams {
  contractId?: string;
}

export const getAccountStatusUseCase = async (
  fetcher: HttpAdapter,
  params: AccountStatusParams
): Promise<AccountStatus> => {
  const { contractId } = params;

  try {
    const contractAccountStatus = await fetcher.get<AccountStatusResponse>(
      "/contract/account-status",
      {
        params: {
          contractId,
        },
      }
    );


    return ContractMapper.fromResponseAccountStatusToEntity(
      contractAccountStatus
    );
  } catch (error) {
    throw new Error("Error getting account status of the contract");
  }
};
