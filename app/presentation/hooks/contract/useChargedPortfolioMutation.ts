import { apiFetcher, DateAdapter, ExcelAdapter } from "config/adapters";
import * as UsesCases from "domain/use-cases/contract";

import { useMutation } from "@tanstack/react-query";

export type ReportType = "pdf" | "excel" | undefined;

export const useChargedPortfolioMutation = (reportType: ReportType) => {
  const chargedPortfolio = useMutation({
    mutationFn: (params: UsesCases.ChargedPortfolioParams) => {
      return UsesCases.getChargedPortfolioUseCase(apiFetcher, params);
    },
    onSuccess: (data, variables) => {
      console.log({ data, reportType });

      if (reportType === "excel") {
        const excelName = `cartera cobrada ${DateAdapter.format(
          variables.startDate,
          "yyyy-MM-dd"
        )} a ${DateAdapter.format(variables.endDate, "yyyy-MM-dd")}`;

        ExcelAdapter.generate(data, excelName, "Cartera Cobrada");
      }
    },
  });

  return {
    chargedPortfolio,
  };
};
