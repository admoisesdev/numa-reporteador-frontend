import { usePortfolioAgeMutation } from "presentation/hooks/contract";

import { DatePicker, TypographyH4 } from "presentation/components/shared";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "presentation/components/ui";
import { portfolioAgeSchema } from "presentation/validations";
import { cn } from "presentation/lib/utils";

import { DateAdapter } from "config/adapters";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PortfolioAgePage = () => {
  const form = useForm<z.infer<typeof portfolioAgeSchema>>({
    resolver: zodResolver(portfolioAgeSchema),
    defaultValues: {
      expirationDate: undefined,
      reportType: "pdf",
    },
  });

  const { portfolioAge } = usePortfolioAgeMutation(form.getValues("reportType"));

  const onSubmit = (data: z.infer<typeof portfolioAgeSchema>) => {
     portfolioAge.mutate({
       expirationDate: DateAdapter.format(data.expirationDate, "yyyy-MM-dd"),
     });
  };

  return (
    <section className="py-4 min-h-screen">
      <TypographyH4 className="text-slate-800">
        Seleccione una fecha para generar reporte de antigüedad de cartera:
      </TypographyH4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flew-row items-center gap-6 my-5"
        >
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha hasta</FormLabel>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabledCondition={() => false}
                />
                <FormMessage className="text-red-600" />
                {form.formState.errors.expirationDate && (
                  <div className="h-5" />
                )}
              </FormItem>
            )}
          />

          <div
            className={cn("flex flex-col gap-2", {
              "self-end": !form.formState.errors.expirationDate,
              "self-center": form.formState.errors.expirationDate,
            })}
          >
            <Button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white"
              disabled={portfolioAge.isPending}
              onClick={() => form.setValue("reportType", "excel")}
            >
              {form.getValues("reportType") === "excel" &&
                portfolioAge.isPending && <Loader2 className="animate-spin" />}
              Generar Excel
            </Button>
            {form.formState.errors.expirationDate && <div className="h-5" />}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default PortfolioAgePage;
