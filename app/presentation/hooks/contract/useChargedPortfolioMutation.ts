import { apiFetcher } from "config/adapters";
import * as UsesCases from "domain/use-cases/contract";

import { useQuery } from "@tanstack/react-query";

export const useChargedPortfolioMutation = (
  chargedPortfolioParams: UsesCases.ChargedPortfolioParams
) => {
  const queryChargedPortfolio = useQuery({
    queryKey: ["account-status", chargedPortfolioParams],
    queryFn: () =>
      UsesCases.getChargedPortfolioUseCase(apiFetcher, chargedPortfolioParams),
    enabled: !!chargedPortfolioParams.startDate || !!chargedPortfolioParams.endDate,
  });

  return {
    queryChargedPortfolio,
    chargedPortfolio: queryChargedPortfolio.data,
  };
};
