import { Button } from "presentation/components/ui/button";

import type { Company } from "domain/entities";

import type { ColumnDef } from "@tanstack/react-table";
import { DateAdapter } from "config/adapters";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";

export const companyColumns: ColumnDef<Company>[] = [
  {
    id: "ruc",
    accessorKey: "ruc",
    header: ({ column }) => {
      return (
        <Button
          className="pl-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RUC
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    id: "razon social",
    accessorKey: "businessName",
    header: ({ column }) => {
      return (
        <Button
          className="pl-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Razón Social
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowDownUp className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.businessName ?? "N/A";
    },
    enableHiding: false,
  },
  {
    id: "proyecto",
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button
          className="pl-2"
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
  },
  {
    id: "comercial",
    accessorKey: "commercial",
    header: ({ column }) => {
      return (
        <Button
          className="pl-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comercial
        </Button>
      );
    },
  },
  {
    id: "establecimiento",
    accessorKey: "establishment",
    header: ({ column }) => {
      return (
        <Button
          className="pl-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Establecimiento
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.establishment ?? "N/A";
    },
  },
  {
    id: "representante legal",
    accessorKey: "legalRepresentative",
    header: ({ column }) => {
      return (
        <Button
          className="pl-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Representante Legal
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowDownUp className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.legalRepresentative ?? "N/A";
    },
  },
  {
    id: "fecha resolucion",
    accessorKey: "resolutionDate",
    header: ({ column }) => {
      return (
        <Button
          className="pl-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha Resolución
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowDownUp className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        DateAdapter.format(row.original.resolutionDate, "yyyy-MM-dd") ?? "N/A"
      );
    },
  },
];
