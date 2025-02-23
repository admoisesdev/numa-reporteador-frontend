import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import { Eye, MoveLeft, MoveRight } from "lucide-react";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <section>
      <section className="flex flex-col md:flex-row justify-between items-start gap-2 py-4">
        <div className="flex flex-row items-center gap-3 lg:w-3/5">
          <Input
            placeholder="Filtrar por identificación"
            value={
              (table.getColumn("identificacion")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("identificacion")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />

          <Input
            placeholder="Filtrar por nombre"
            value={
              (table.getColumn("nombre")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("nombre")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />

          <Input
            placeholder="Filtrar por email"
            value={
              (table.getColumn("correo")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("correo")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="focus-visible:ring-0 focus-visible:border-slate-600"
            >
              <Eye /> Columnas visibles
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-white"
            align="end"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <section className="rounded-md overflow-hidden">
        <Table className="min-w-full">
          <TableHeader className="bg-slate-800 text-white border border-slate-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-0">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="border border-slate-300 border-t-0">
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-2xl"
                >
                  <div className="space-y-2">
                    <Skeleton className="bg-slate-300 h-10 w-full" />
                    <Skeleton className="bg-slate-300 h-10 w-full" />
                    <Skeleton className="bg-slate-300 h-10 w-full" />
                    <Skeleton className="bg-slate-300 h-10 w-full" />
                    <Skeleton className="bg-slate-300 h-10 w-full" />
                    <Skeleton className="bg-slate-300 h-10 w-full" />
                    <Skeleton className="bg-slate-300 h-10 w-full" />
                    <Skeleton className="bg-slate-300 h-10 w-full" />
                    <Skeleton className="bg-slate-300 h-10 w-full" />
                    <Skeleton className="bg-slate-300 h-10 w-5/6" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-none odd:bg-slate-200 even:bg-slate-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-2xl"
                >
                  No hay clientes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>

      <DataTablePagination table={table} />

      {/* <section className="flex items-center justify-end space-x-6 py-4">
        {table.getCanPreviousPage() && (
          <Button
            variant="ghost"
            className="bg-zinc-800 text-white"
            size="icon"
            onClick={() => table.previousPage()}
          >
            <MoveLeft className="size-5" />
          </Button>
        )}
        {table.getCanNextPage() && (
          <Button
            variant="ghost"
            className="bg-zinc-800 text-white"
            size="icon"
            onClick={() => table.nextPage()}
          >
            <MoveRight className="size-5" />
          </Button>
        )}
      </section> */}
    </section>
  );
}
