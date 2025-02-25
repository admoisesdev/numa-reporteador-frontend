import { Button } from "presentation/components/ui/button";
import { CustomerAccountStatus } from "presentation/components/customer";

import type { Contract } from "domain/entities";

import type { ColumnDef } from "@tanstack/react-table";

export const contractsCustomerColumns: ColumnDef<Contract>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id Contrato
        </Button>
      );
    },
    enableSorting: false,
  },
  {
    id: "ubicacion",
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ubicación
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.location ?? "N/A";
    },
    enableSorting: false,
  },
  {
    id: "proyecto",
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Proyecto
        </Button>
      );
    },
    enableSorting: false,
  },
  {
    id: "cliente vendedor",
    accessorKey: "sellerCustomer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente Vendedor
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.sellerCustomer ?? "N/A";
    },
    enableSorting: false,
  },
  {
    id: "contracts-customer-actions",
    cell: ({ row,table }) => {
      const contractId = row.original.id;
      console.log(table.options.meta);

      //* Guarda en metadata
      table.options.meta = { contractId: contractId,
      };

      return (
        <div className="flex justify-end">
          <CustomerAccountStatus contractId={contractId} />
        </div>
      );
    },
    enableHiding: false,
  },
];
