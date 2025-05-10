import { apiFetcher } from "config/adapters";
import * as UsesCases from "domain/use-cases/company";

import { useQuery } from "@tanstack/react-query";
import { CompanyMapper } from "infrastructure/mappers";
import { useEffect, useState } from "react";
import type { SelectOption } from "infrastructure/interfaces";

export const useCompanies = () => {
  const [selectOptionsCompanies, setSelectOptionsCompanies] = useState<
    SelectOption[]
  >([]);

  const queryCompanies = useQuery({
    queryKey: ["companies"],
    queryFn: () => UsesCases.getCompaniesUseCase(apiFetcher),
  });

  useEffect(() => {
    if (queryCompanies.data) {
      const selectOptionsCompanies = queryCompanies.data?.map((company) => {
        return CompanyMapper.fromCompanyResponseToSelectOption(company);
      });
      setSelectOptionsCompanies(selectOptionsCompanies);
    }
  }, []);

  return {
    queryCompanies,
    selectOptionsCompanies,
  };
};
