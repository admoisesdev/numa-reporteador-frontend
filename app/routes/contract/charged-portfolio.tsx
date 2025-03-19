import { TypographyH3 } from "presentation/components/shared";
import { cn } from "presentation/lib/utils";
import { Button } from "presentation/components/ui/button";
import { Calendar } from "presentation/components/ui/calendar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "presentation/components/ui";

import { chargedPortfolioSchema } from "presentation/validations";

import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useChargedPortfolioMutation } from "presentation/hooks/contract";

const ChargedPortfolioPage = () => {
  const form = useForm<z.infer<typeof chargedPortfolioSchema>>({
    resolver: zodResolver(chargedPortfolioSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  const {chargedPortfolio } = useChargedPortfolioMutation();

  const onSubmit = (data: z.infer<typeof chargedPortfolioSchema>) => {
    chargedPortfolio.mutate({
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
    });
  }

  return (
    <section className="py-4">
      <TypographyH3 className="">
        Seleccione un rango de fechas para ver la cartera cobrada:
      </TypographyH3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flew-row items-end gap-6 my-5", {
            "items-center": form.formState.errors.startDate,
          })}
        >
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha desde</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd-MM-yyyy")
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      locale={es}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-600" />
                {form.formState.errors.endDate && <div className="h-5" />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha desde</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd-MM-yyyy")
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      locale={es}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-600" />
                {form.formState.errors.startDate && <div className="h-5" />}
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              Generar reporte
            </Button>
            {form.formState.errors.startDate &&
              form.formState.errors.endDate && <div className="h-5" />}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ChargedPortfolioPage;
