import type { HttpAdapter } from "config/adapters/http";

import { ContractMapper } from "infrastructure/mappers";
import type { ChargedPortfolioResponse } from "infrastructure/interfaces";
import type { ChargedPortfolio } from "domain/entities";

export interface ChargedPortfolioParams {
  startDate: string;
  endDate: string;
}

export const getChargedPortfolioUseCase = async (
  fetcher: HttpAdapter,
  params: ChargedPortfolioParams
): Promise<ChargedPortfolio[]> => {
  const { startDate,endDate } = params;

  try {
    const contractsChargedPortfolio = await fetcher.get<ChargedPortfolioResponse[]>(
      "/contract/charged-portfolio",
      {
        params: {
          startDate,
          endDate,
        },
      }
    );


    return contractsChargedPortfolio.map(ContractMapper.fromResponseChargedPortfolioToEntity);
  } catch (error) {
    throw new Error("Error getting charged portfolio of the contracts");
  }
};
