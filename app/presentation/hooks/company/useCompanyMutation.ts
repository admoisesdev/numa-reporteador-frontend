import * as UsesCases from "domain/use-cases/company";

import { apiFetcher } from "config/adapters";

import { useMutation } from "@tanstack/react-query";

export const useCompanyMutation = () => {
  const createCompany = useMutation({
    mutationFn: (body: UsesCases.CompanyBody) => {
      return UsesCases.createCompanyUseCase(apiFetcher, body);
    },
    onSuccess: (data, variables) => {},
  });

  return {
    createCompany,
  };
};
