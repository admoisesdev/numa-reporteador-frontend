import { CalendarIcon } from "lucide-react";
import {
  Button,
  Calendar,
  FormControl,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "presentation/components/ui";

import { cn } from "presentation/lib/utils";
import { DateAdapter } from 'config/adapters';
import { es } from "date-fns/locale/es";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabledCondition?: (date: Date) => boolean;
}

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Selecciona una fecha",
  disabledCondition = (date) =>
    date > new Date() || date < new Date("1900-01-01"),
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            {value ? (
              DateAdapter.format(value, "dd-MM-yyyy")
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="bg-white w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabledCondition}
          locale={es}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
