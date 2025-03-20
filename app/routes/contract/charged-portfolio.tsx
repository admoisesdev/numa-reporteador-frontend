import { useChargedPortfolioMutation } from "presentation/hooks/contract";

import { TypographyH4, VisorPdf } from "presentation/components/shared";
import {
  Button,
  Calendar,
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
import { cn } from "presentation/lib/utils";
import { PdfMapper } from "infrastructure/mappers";

import { ChargedPortfolioPdf } from "presentation/components/pdf";

import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ChargedPortfolioPage = () => {
  const form = useForm<z.infer<typeof chargedPortfolioSchema>>({
    resolver: zodResolver(chargedPortfolioSchema),
    defaultValues: {
      startDate: new Date("2025-03-01"),
      endDate: new Date(),
    },
  });

  const { chargedPortfolio } = useChargedPortfolioMutation();

  const onSubmit = (data: z.infer<typeof chargedPortfolioSchema>) => {
    chargedPortfolio.mutate({
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
    });
  };

  return (
    <section className="py-4 min-h-screen">
      <TypographyH4 className="text-slate-800">
        Seleccione un rango de fechas para ver la cartera cobrada:
      </TypographyH4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flew-row items-center gap-6 my-5"
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
                <FormLabel>Fecha hasta</FormLabel>
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
              disabled={chargedPortfolio.isPending}
            >
              {chargedPortfolio.isPending && (
                <Loader2 className="animate-spin" />
              )}
              Generar reporte
            </Button>
            {form.formState.errors.startDate &&
              form.formState.errors.endDate && <div className="h-5" />}
          </div>
        </form>
      </Form>

      <div className="min-h-screen">
        {chargedPortfolio.data && (
          <VisorPdf
            pdfDocument={
              <ChargedPortfolioPdf
                data={PdfMapper.fromChargedPortfolioToPdfData(
                  chargedPortfolio.data,
                  form.getValues("startDate"),
                  form.getValues("endDate"),
                )}
              />
            }
          />
        )}
      </div>
    </section>
  );
};

export default ChargedPortfolioPage;
