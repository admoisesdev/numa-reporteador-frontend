import type { Route } from "./+types/home";

import { useCustomers } from "presentation/hooks/customer";

import { DataTable, TypographyH3 } from "presentation/components/shared";
import { customerColumns } from "./customer-columns";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clientes" },
    { name: "description", content: "Bienvenido a la pagina de clientes" },
  ];
}

export default function CustomerPage() {
  const { queryCustomers } = useCustomers();

  return (
    <div className="container mx-auto p-3">
      <TypographyH3 className="mb-2 text-slate-900">Clientes</TypographyH3>
      <DataTable columns={customerColumns} data={queryCustomers?.data ?? []} />
    </div>
  );
}
