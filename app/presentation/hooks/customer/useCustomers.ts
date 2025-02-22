
import { apiFetcher } from "config/adapters";
import * as UsesCases from "domain/use-cases/customer";

import { useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
  const queryCustomers = useQuery({
    queryKey: ["customers"],
    queryFn: () => UsesCases.getCustomersUseCase(apiFetcher),
  });

  return {
    queryCustomers,
  };
};
