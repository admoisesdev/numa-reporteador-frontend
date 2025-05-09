import { apiFetcher } from "config/adapters";
import * as UsesCases from "domain/use-cases/company";

import { useQuery } from "@tanstack/react-query";

export const useCompanies = () => {
  const queryCompanies = useQuery({
    queryKey: ["companies"],
    queryFn: () => UsesCases.getCompaniesUseCase(apiFetcher),
  });

  return {
    queryCompanies,
  };
};

