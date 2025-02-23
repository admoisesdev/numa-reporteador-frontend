import type { HttpAdapter } from "config/adapters/http";
import type { Customer } from "domain/entities";
import type { CustomerResponse } from "infrastructure/interfaces";
import { CustomerMapper } from "infrastructure/mappers";

export interface CustomersParams { 
  onlyActives?: boolean;
}

export const getCustomersUseCase = async (
  fetcher: HttpAdapter,
  params: CustomersParams = { onlyActives: false }
): Promise<Customer[]> => {
  const { onlyActives } = params;

  try {
    const customers = await fetcher.get<CustomerResponse[]>("/customer", {
      params: {
        active: onlyActives,
      },
    });

    return customers.map(CustomerMapper.fromResponseCustomerToEntity);
  } catch (error) {
    throw new Error("Error getting customers");
  }
};
