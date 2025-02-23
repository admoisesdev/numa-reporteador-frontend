import { Button } from "presentation/components/ui/button";

import type { Customer } from "domain/entities";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowDownUp, Printer } from "lucide-react";

export const customerColumns: ColumnDef<Customer>[] = [
  {
    id: "identificacion",
    accessorKey: "identification",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Identificación
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowDownUp className="h-4 w-4" />
          )}
        </Button>
      );
    },
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
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowDownUp className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.project ?? "N/A";
    },
  },
  {
    id: "nombre",
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowDownUp className="h-4 w-4" />
          )}
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    id: "telefono",
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Teléfono
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.phone ?? "N/A";
    },
  },
  {
    id: "correo",
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correo
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.email ?? "N/A";
    },
  },
  {
    id: "customer-actions",
    cell: ({ row }) => {
      const customerId = row.original.id;

      return (
        <div className="flex justify-end">
          <Button
            className="mr-2 bg-slate-700 text-white"
            size="icon"
            onClick={() => {
              console.log("Imprimir", customerId);
            }}
          >
            <Printer />
          </Button>
        </div>
      );
    },
    enableHiding: false,
  },
];
