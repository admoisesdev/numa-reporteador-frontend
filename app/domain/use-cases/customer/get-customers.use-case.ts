import type { HttpAdapter } from "config/adapters/http";
import type { Customer } from "domain/entities";
import type { CustomerResponse } from "infrastructure/interfaces";
import { CustomerMapper } from "infrastructure/mappers";

export const getCustomersUseCase = async (
  fetcher: HttpAdapter,
): Promise<Customer[]> => {
  try {
    const customers = await fetcher.get<CustomerResponse[]>("/customer");

    return customers.map(CustomerMapper.fromResponseCustomerToEntity);
  } catch (error) {
    throw new Error("Error getting customers");
  }
};
