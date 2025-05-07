import { apiFetcher } from "config/adapters";
import * as UsesCases from "domain/use-cases/company";

import { useQuery } from "@tanstack/react-query";

export const useCompaniesByUser = () => {
  const queryCompaniesByUser = useQuery({
    queryKey: ["companies-by-user"],
    queryFn: () => UsesCases.getCompaniesByUserUseCase(apiFetcher),
  });

  return {
    queryCompaniesByUser,
  };
};

