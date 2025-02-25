import { apiFetcher } from "config/adapters";
import * as UsesCases from 'domain/use-cases/contract';

import { useQuery } from "@tanstack/react-query";

export const useContractsCustomer = (contractsParams: UsesCases.ContractsCustomerParams) => {
  const queryContracts = useQuery({
    queryKey: ["customers", contractsParams],
    queryFn: () => UsesCases.getContractsCustomerUseCase(apiFetcher, contractsParams),
  });

  return {
    queryContractsCustomer: queryContracts,
  };
};
