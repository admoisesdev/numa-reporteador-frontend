import { apiFetcher } from "config/adapters";
import * as UsesCases from "domain/use-cases/contract";

import { useMutation } from "@tanstack/react-query";

export const useChargedPortfolioMutation = () => {

  const chargedPortfolio = useMutation({
    mutationFn: (params: UsesCases.ChargedPortfolioParams) => {
      return UsesCases.getChargedPortfolioUseCase(apiFetcher, params)
    },
    onSuccess: (data) => {
    },
  });

  return {
    chargedPortfolio,
  };
};
