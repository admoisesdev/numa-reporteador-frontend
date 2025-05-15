import { Button } from "presentation/components/ui/button";

import type { UserCompany } from "domain/entities";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowDownUp, UserCheck, UserX } from "lucide-react";
import { UserCompanies } from "presentation/components/user";

export const userColumns: ColumnDef<UserCompany>[] = [
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
    id: "apellido",
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellido
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowDownUp className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.lastName ?? "N/A";
    },
    enableHiding: false,
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
          Email
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
    id: "activo",
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ¿Activo?
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center w-2/4">
          {row.original.isActive ? (
            <UserCheck className="text-emerald-800" />
          ) : (
            <UserX className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    id: "roles",
    accessorKey: "roles",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roles
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          {row.original.roles.map((role, index) => (
            <span
              key={role}
              className="text-xs font-medium text-slate-700 dark:text-slate-400 uppercase"
            >
              {role}
              {index < row.original.roles.length - 1 && ","}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    id: "user-actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex justify-end">
          <UserCompanies user={user} />
        </div>
      );
    },
    enableHiding: false,
  },
];
