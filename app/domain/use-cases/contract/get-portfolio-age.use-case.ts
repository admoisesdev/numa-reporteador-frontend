import type { HttpAdapter } from "config/adapters/http";

import type { PortfolioAgeResponse } from "infrastructure/interfaces";
import type { PortfolioAge } from "domain/entities";
import { ContractMapper } from "infrastructure/mappers";

export interface PortfolioAgeParams {
  expirationDate: string;
}

export const getPortfolioAgeUseCase = async (
  fetcher: HttpAdapter,
  params: PortfolioAgeParams
): Promise<PortfolioAge[]> => {
  const { expirationDate } = params;

  try {
    const contractsPortfolioAge = await fetcher.get<PortfolioAgeResponse[]>(
      "/contract/portfolio-age",
      {
        params: {
          expirationDate,
        },
      }
    );

    return contractsPortfolioAge.map(
      ContractMapper.fromResponsePortfolioAgeToEntity
    );
  } catch (error) {
    throw new Error("Error getting portfolio age of contracts");
  }
};
