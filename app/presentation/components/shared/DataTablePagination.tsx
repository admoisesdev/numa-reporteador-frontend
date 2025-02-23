import type { Table } from "@tanstack/react-table";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  MoveLeft,
  MoveRight,
} from "lucide-react";

import { Button } from "presentation/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "presentation/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  rowsPerPageOptions: number[];
}

export function DataTablePagination<TData>({
  table,
  rowsPerPageOptions,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center py-2">
      <div className="flex items-center justify-between sm:justify-end sm:gap-10 w-full">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <p className="text-sm font-medium text-nowrap">Filas por página</p>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="bg-white">
              {rowsPerPageOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-2">
          {table.getCanPreviousPage() && (
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 bg-zinc-900 text-white lg:flex"
              onClick={() => table.setPageIndex(0)}
            >
              <span className="sr-only">Go to first page</span>
              <ArrowLeftFromLine />
            </Button>
          )}

          {table.getCanPreviousPage() && (
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-zinc-800 text-white"
              onClick={() => table.previousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <MoveLeft />
            </Button>
          )}

          {table.getCanNextPage() && (
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-zinc-800 text-white"
              onClick={() => table.nextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <MoveRight />
            </Button>
          )}

          {table.getCanNextPage() && (
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 bg-zinc-900 text-white lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              <span className="sr-only">Go to last page</span>
              <ArrowRightFromLine />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
