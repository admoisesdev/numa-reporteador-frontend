import type { Route } from "./+types/home";

import { useCustomers } from "presentation/hooks/customer";
import { CustomerFilters } from "presentation/components/customer";
import { DataTable } from "presentation/components/shared";

import { customerColumns } from "./customer-columns";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clientes" },
    { name: "description", content: "Bienvenido a la pagina de clientes" },
  ];
}

export default function CustomerPage() {
  const { queryCustomers } = useCustomers({ onlyActives: true });

  return (
      <DataTable
        columns={customerColumns}
        data={queryCustomers?.data ?? []}
        isLoading={queryCustomers.isLoading}
        noDataMessage="No hay clientes"
        filterColumns={CustomerFilters}
        canHideColumns
        canPaginate
      />
  );
}
