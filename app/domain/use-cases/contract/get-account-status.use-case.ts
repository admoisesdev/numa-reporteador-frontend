import type { HttpAdapter } from "config/adapters/http";

import type {
  ChargesResponse,
  ContractResponse,
  FinancingResponse,
} from "infrastructure/interfaces";

type AccountStatus = {
  contract: ContractResponse;
  financing: FinancingResponse[];
  charges: ChargesResponse[];
};

export interface AccountStatusParams {
  contractId?: string;
}

export const getAccountStatusUseCase = async (
  fetcher: HttpAdapter,
  params: AccountStatusParams
): Promise<AccountStatus> => {
  const { contractId } = params;

  try {
    const contractAccountStatus = await fetcher.get<AccountStatus>(
      "/contract/account-status",
      {
        params: {
          contractId,
        },
      }
    );

    return contractAccountStatus;
  } catch (error) {
    throw new Error("Error getting account status of the contract");
  }
};
