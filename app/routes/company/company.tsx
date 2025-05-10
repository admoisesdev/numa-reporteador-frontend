import { useCompanies } from "presentation/hooks/company";
import { DataTable,  TypographyH3 } from "presentation/components/shared";


export default function CompanyPage() {
  const { queryCompanies } = useCompanies();

  return (
    <>

      {/* <DataTable
        columns={[]}
        data={queryCompanies?.data ?? []}
        isLoading={queryCompanies.isLoading}
        noDataMessage="No hay clientes"
        filterColumns={}
        createDataButton={{
          name: "Crear empresa",
          path: "/crear-empresa",
        }}
        canHideColumns
        canPaginate
      /> */}
    </>
  );
}
