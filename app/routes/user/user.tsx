import type { Route } from "./+types/user";

import { useUserCompanies } from "presentation/hooks/user";
import { DataTable } from "presentation/components/shared";
import { UserFilters } from "presentation/components/user";

import { userColumns } from "./user-columns";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Usuarios" },
    { name: "description", content: "Bienvenido a la pagina de usuarios" },
  ];
}

export default function UserPage() {
  const { queryUserCompanies } = useUserCompanies();

  return (
    <>
      <DataTable
        columns={userColumns}
        data={queryUserCompanies?.data ?? []}
        isLoading={queryUserCompanies.isLoading}
        noDataMessage="No hay clientes"
        filterColumns={UserFilters}
        createDataButton={{
          name: "Crear usuario",
          path: "/crear-usuario",
        }}
        canHideColumns
        canPaginate
      />
    </>
  );
}
