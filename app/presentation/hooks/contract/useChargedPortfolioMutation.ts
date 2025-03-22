import { apiFetcher } from "config/adapters";
import * as UsesCases from "domain/use-cases/contract";

import { useMutation } from "@tanstack/react-query";

export type ReportType = "pdf" | "excel" | undefined;

export const useChargedPortfolioMutation = () => {
  const chargedPortfolio = useMutation({
    mutationFn: (params: UsesCases.ChargedPortfolioParams) => {
      return UsesCases.getChargedPortfolioUseCase(apiFetcher, params);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });


  return {
    chargedPortfolio,
  };
};
