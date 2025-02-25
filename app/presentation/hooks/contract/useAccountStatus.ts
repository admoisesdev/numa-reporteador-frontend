import { apiFetcher } from "config/adapters";
import * as UsesCases from "domain/use-cases/contract";

import { useQuery } from "@tanstack/react-query";

export const useAccountStatus = (
  accountStatusParams: UsesCases.AccountStatusParams
) => {
  const queryAccountStatus = useQuery({
    queryKey: ["account-status", accountStatusParams],
    queryFn: () =>
      UsesCases.getAccountStatusUseCase(apiFetcher, accountStatusParams),
    enabled: !!accountStatusParams.contractId,
  });

  return {
    queryAccountStatus,
    accountStatus: queryAccountStatus.data,
  };
};
