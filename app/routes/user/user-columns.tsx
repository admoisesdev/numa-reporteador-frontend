import { Button } from "presentation/components/ui/button";

import type { UserCompany } from "domain/entities";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowDownUp } from "lucide-react";

export const userColumns: ColumnDef<UserCompany>[] = [
 /* {
     id: "identificacion",
     accessorKey: "identification",
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
       const customer = row.original;
 
       return (
         <div className="flex justify-end">
           <CustomerContracts customer={customer} />
         </div>
       );
     },
     enableHiding: false,
   }, */
];
