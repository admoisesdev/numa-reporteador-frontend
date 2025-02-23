
import { apiFetcher } from "config/adapters";
import * as UsesCases from "domain/use-cases/customer";

import { useQuery } from "@tanstack/react-query";



export const useCustomers = (customersParams: UsesCases.CustomersParams) => {
  const queryCustomers = useQuery({
    queryKey: ["customers", customersParams],
    queryFn: () => UsesCases.getCustomersUseCase(apiFetcher, customersParams),
  });

  return {
    queryCustomers,
  };
};
