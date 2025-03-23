import { apiFetcher, DateAdapter, ExcelAdapter } from "config/adapters";
import * as UsesCases from "domain/use-cases/contract";

import { useMutation } from "@tanstack/react-query";

export const useReceivablesMutation = () => {
  const receivables = useMutation({
    mutationFn: (params: UsesCases.ReceivablesParams) => {
      return UsesCases.getReceivablesUseCase(apiFetcher, params);
    },
    onSuccess: (data, variables) => {
      const excelName = `cartera por cobrar hasta ${DateAdapter.format(variables.expirationDate, "yyyy-MM-dd")}`;

      ExcelAdapter.generate(data, excelName, "Cartera por Cobrar");
    },
  });

  return {
    receivables,
  };
};
