import * as UsesCases from "domain/use-cases/contract";

import { apiFetcher, DateAdapter, ExcelAdapter } from "config/adapters";
import { ExcelMapper } from "infrastructure/mappers";
import type { ReportType } from "infrastructure/interfaces";

import { useMutation } from "@tanstack/react-query";

export const usePortfolioAgeMutation = (reportType: ReportType) => {
  const portfolioAge = useMutation({
    mutationFn: (params: UsesCases.ReceivablesParams) => {
      return UsesCases.getPortfolioAgeUseCase(apiFetcher, params);
    },
    onSuccess: (data, variables) => {
      if (reportType === "excel") {
        const excelName = `Antiguedad de catera hasta ${DateAdapter.format(
          variables.expirationDate,
          "yyyy-MM-dd"
        )}`;

        const formattedData = data.map(ExcelMapper.fromPortfolioAgeToExcelData);
  
        ExcelAdapter.generate(formattedData, excelName, "Antiguedad de cartera");
       }
    },
  });

  return {
    portfolioAge,
  };
};
