import { useCompanies } from "presentation/hooks/company";

import { DataTable } from "presentation/components/shared";
import { CompanyFilters } from "presentation/components/company";
import { companyColumns } from "./company-columns";

export default function CompanyPage() {
  const { queryCompanies } = useCompanies();

  return (
    <DataTable
      columns={companyColumns}
      data={queryCompanies?.data ?? []}
      isLoading={queryCompanies.isLoading}
      noDataMessage="No hay empresas"
      filterColumns={CompanyFilters}
      createDataButton={{
        name: "Crear empresa",
        path: "/crear-empresa",
      }}
      canHideColumns
      canPaginate
    />
  );
}
