import { useState } from "react";
import type { Route } from "./+types/home";

import { useCustomers } from "presentation/hooks/customer";
import { DataTable, TypographyH3, VisorPdf } from "presentation/components/shared";
import { AccountStatementPdf } from "presentation/components/customer";

import { customerColumns } from "./customer-columns";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clientes" },
    { name: "description", content: "Bienvenido a la pagina de clientes" },
  ];
}

export default function CustomerPage() {
  const { queryCustomers } = useCustomers({ onlyActives: true });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleRowClick = (customer: any) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="container mx-auto p-3">
      {selectedCustomer && (
        <VisorPdf pdfDocument={<AccountStatementPdf/>} />
      )}


      <TypographyH3 className="mb-2 text-slate-900">Clientes</TypographyH3>
      <DataTable
        columns={customerColumns}
        data={queryCustomers?.data ?? []}
        isLoading={queryCustomers.isLoading}
      />
    </div>
  );
}
