import type { HttpAdapter } from "config/adapters/http";
import type { Contract } from "domain/entities";

import type { ContractResponse } from "infrastructure/interfaces";
import { ContractMapper } from "infrastructure/mappers";

export interface ContractsCustomerParams {
  customerId?: boolean;
}

export const getContractsCustomerUseCase = async (
  fetcher: HttpAdapter,
  params: ContractsCustomerParams
): Promise<Contract[]> => {
  const { customerId = "" } = params;

  try {
    const contractsByCustomer = await fetcher.get<ContractResponse[]>("/contract", {
      params: {
        customerId,
      },
    });

    return contractsByCustomer.map(ContractMapper.fromResponseContractsCustomerToEntity);
  } catch (error) {
    throw new Error("Error getting contracts by customer");
  }
};
