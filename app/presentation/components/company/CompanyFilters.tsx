import { Input } from "../ui";
import type { FiltersProps } from "../shared";

export const CompanyFilters = ({ table }: FiltersProps) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap flex-row items-center gap-3 lg:w-3/5">
      <Input
        placeholder="Filtrar por RUC"
        value={(table.getColumn("ruc")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("ruc")?.setFilterValue(event.target.value)
        }
        className="max-w-xs"
      />

      <Input
        placeholder="Filtrar por razón social"
        value={
          (table.getColumn("razon social")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("razon social")?.setFilterValue(event.target.value)
        }
        className="max-w-xs"
      />

      <Input
        placeholder="Filtrar por representante"
        value={
          (table
            .getColumn("representante legal")
            ?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table
            .getColumn("representante legal")
            ?.setFilterValue(event.target.value)
        }
        className="max-w-xs"
      />
    </div>
  );
};
