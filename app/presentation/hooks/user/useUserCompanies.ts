import { apiFetcher } from "config/adapters";
import * as UsesCases from "domain/use-cases/user";

import { useQuery } from "@tanstack/react-query";

export const useUserCompanies = () => {
  const queryUserCompanies = useQuery({
    queryKey: ["user-companies"],
    queryFn: () => UsesCases.getUsersCompaniesUseCase(apiFetcher),
  });

  return {
    queryUserCompanies,
  };
};

