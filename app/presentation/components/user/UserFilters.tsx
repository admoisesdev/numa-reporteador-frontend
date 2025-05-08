import { Input } from "../ui";
import type { FiltersProps } from "../shared";

export const UserFilters = ({ table }: FiltersProps) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap flex-row items-center gap-3 lg:w-3/5">
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
        placeholder="Filtrar por apellido"
        value={(table.getColumn("apellido")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("apellido")?.setFilterValue(event.target.value)
        }
        className="max-w-xs"
      />

      <Input
        placeholder="Filtrar por email"
        value={(table.getColumn("correo")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("correo")?.setFilterValue(event.target.value)
        }
        className="max-w-xs"
      />
        
    </div>
  );
};
