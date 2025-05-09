import { useState } from "react";

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";

import { DataTablePagination } from "./DataTablePagination";

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
  Table as TableResponse,
  VisibilityState,
} from "@tanstack/react-table";

import { Eye } from "lucide-react";
import { cn } from "presentation/lib/utils";
import { Link } from "react-router";

type CreateDataButton = {
  name: string;
  path: string;
}

export interface FiltersProps {
  table: TableResponse<any>;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  metaData?: Record<string, any>;
  noDataMessage?: string;
  rowsPerPageOptions?: number[];
  canHideColumns?: boolean;
  canPaginate?: boolean;
  filterColumns?: ({ table }: FiltersProps) => React.ReactNode;
  createDataButton?: CreateDataButton;
  classNameTableHeader?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  metaData,
  noDataMessage = "No hay datos para mostrar",
  rowsPerPageOptions = [5, 10, 15, 20, 30],
  canHideColumns = false,
  canPaginate = false,
  filterColumns: FilterColumns,
  createDataButton,
  classNameTableHeader = "bg-slate-800 border-slate-800",
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
    meta: metaData,
  });

  return (
    <section>
      <section
        className={cn(
          "flex flex-col-reverse md:flex-row justify-between items-start gap-2",
          {
            "py-4": FilterColumns || canHideColumns,
          }
        )}
      >
        {FilterColumns && <FilterColumns table={table} />}

        <div className="flex items-center gap-3">
          {createDataButton && (
            <Button className="bg-cyan-900 text-white hover:bg-cyan-950 transition-all duration-200 ease-in-out">
              <Link to={createDataButton.path}>{createDataButton.name}</Link>
            </Button>
          )}
          {canHideColumns && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="focus-visible:ring-0 focus-visible:border-slate-600"
                >
                  <Eye /> Columnas visibles
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white" align="end">
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
          )}
        </div>
      </section>

      <section className="rounded-md overflow-hidden">
        <Table className="min-w-full">
          <TableHeader
            className={cn("text-white border", classNameTableHeader)}
          >
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
                  {noDataMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>

      {canPaginate && (
        <DataTablePagination
          table={table}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}
    </section>
  );
}
