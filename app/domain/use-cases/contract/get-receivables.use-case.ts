import type { HttpAdapter } from "config/adapters/http";

import type { ReceivablesExcelData, ReceivablesResponse } from "infrastructure/interfaces";
import { ExcelMapper } from "infrastructure/mappers";

export interface ReceivablesParams {
  expirationDate: string;
}

export const getReceivablesUseCase = async (
  fetcher: HttpAdapter,
  params: ReceivablesParams
): Promise<ReceivablesExcelData[]> => {
  const {expirationDate } = params;

  try {
    const contractsReceivables = await fetcher.get<ReceivablesResponse[]>(
      "/contract/receivables",
      {
        params: {
          expirationDate,
        },
      }
    );

    return contractsReceivables.map(ExcelMapper.fromReceivablesToExcelData);
  } catch (error) {
    throw new Error("Error getting receivables of contracts");
  }
};
