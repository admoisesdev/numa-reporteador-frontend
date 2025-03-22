import { useChargedPortfolioMutation } from "presentation/hooks/contract";

import {
  DatePicker,
  TypographyH4,
  VisorPdf,
} from "presentation/components/shared";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "presentation/components/ui";
import { ChargedPortfolioPdf } from "presentation/components/pdf";
import { chargedPortfolioSchema } from "presentation/validations";
import { cn } from "presentation/lib/utils";

import { DateAdapter } from "config/adapters";
import { PdfMapper } from "infrastructure/mappers";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ChargedPortfolioPage = () => {
  const form = useForm<z.infer<typeof chargedPortfolioSchema>>({
    resolver: zodResolver(chargedPortfolioSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      reportType: "pdf",
    },
  });

  const { chargedPortfolio } = useChargedPortfolioMutation(form.getValues("reportType"));

  const onSubmit = (data: z.infer<typeof chargedPortfolioSchema>) => {
    chargedPortfolio.mutate({
      startDate: DateAdapter.format(data.startDate, "yyyy-MM-dd"),
      endDate: DateAdapter.format(data.endDate, "yyyy-MM-dd"),
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
                <DatePicker value={field.value} onChange={field.onChange} />
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
                <DatePicker value={field.value} onChange={field.onChange} />
                <FormMessage className="text-red-600" />
                {form.formState.errors.startDate && <div className="h-5" />}
              </FormItem>
            )}
          />

          <div
            className={cn("flex flex-col gap-2", {
              "self-end":
                !form.formState.errors.startDate ||
                !form.formState.errors.endDate,
              "self-center":
                form.formState.errors.startDate ||
                form.formState.errors.endDate,
            })}
          >
            <Button
              type="submit"
              className="bg-slate-600 hover:bg-slate-700 text-white"
              disabled={chargedPortfolio.isPending}
              onClick={() => form.setValue("reportType", "pdf")}
            >
              {form.getValues("reportType") === "pdf" &&
                chargedPortfolio.isPending && (
                  <Loader2 className="animate-spin" />
                )}
              Generar reporte
            </Button>
            {form.formState.errors.startDate &&
              form.formState.errors.endDate && <div className="h-5" />}
          </div>

          <div
            className={cn("flex flex-col gap-2", {
              "self-end":
                !form.formState.errors.startDate ||
                !form.formState.errors.endDate,
              "self-center":
                form.formState.errors.startDate ||
                form.formState.errors.endDate,
            })}
          >
            <Button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white"
              disabled={chargedPortfolio.isPending}
              onClick={() => form.setValue("reportType", "excel")}
            >
              {form.getValues("reportType") === "excel" &&
                chargedPortfolio.isPending && (
                  <Loader2 className="animate-spin" />
                )}
              Generar Excel
            </Button>
            {form.formState.errors.startDate &&
              form.formState.errors.endDate && <div className="h-5" />}
          </div>
        </form>
      </Form>

      {form.getValues("reportType") === "pdf" && (
        <div className="min-h-screen">
          {chargedPortfolio.data && (
            <VisorPdf
              height="600"
              pdfDocument={
                <ChargedPortfolioPdf
                  data={PdfMapper.fromChargedPortfolioToPdfData(
                    chargedPortfolio.data,
                    form.getValues("startDate"),
                    form.getValues("endDate")
                  )}
                />
              }
            />
          )}
        </div>
      )}
    </section>
  );
};

export default ChargedPortfolioPage;
