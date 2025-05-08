import { Button } from "presentation/components/ui/button";

import type { Company } from "domain/entities";

import type { ColumnDef } from "@tanstack/react-table";
import { DateAdapter } from "config/adapters";

export const companiesUserColumns: ColumnDef<Company>[] = [
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
        </Button>
      );
    },
    enableSorting: false,
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
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.businessName ?? "N/A";
    },
    enableSorting: false,
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
        </Button>
      );
    },
    enableSorting: false,
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
    enableSorting: false,
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
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.legalRepresentative ?? "N/A";
    },
    enableSorting: false,
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
        </Button>
      );
    },
    cell: ({ row }) => {
      return DateAdapter.format(row.original.resolutionDate,"yyyy-MM-dd") ?? "N/A";
    },
    enableSorting: false,
  },
  
];
