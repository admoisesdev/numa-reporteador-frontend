import { DatePicker, TypographyH4 } from "presentation/components/shared";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "presentation/components/ui";
import { chargedPortfolioSchema } from "presentation/validations";
import { cn } from "presentation/lib/utils";

import { DateAdapter } from "config/adapters";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ReceivablesPage = () => {
  const form = useForm<z.infer<typeof chargedPortfolioSchema>>({
    resolver: zodResolver(chargedPortfolioSchema),
    defaultValues: {
      endDate: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof chargedPortfolioSchema>) => {};

  return (
    <section className="py-4 min-h-screen">
      <TypographyH4 className="text-slate-800">
        Seleccione una fecha para generar la cartera por cobrar:
      </TypographyH4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flew-row items-center gap-6 my-5"
        >
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha hasta</FormLabel>
                <DatePicker value={field.value} onChange={field.onChange} />
                <FormMessage className="text-red-600" />
                {form.formState.errors.endDate && <div className="h-5" />}
              </FormItem>
            )}
          />

          <div
            className={cn("flex flex-col gap-2", {
              "self-end": !form.formState.errors.endDate,
              "self-center": form.formState.errors.endDate,
            })}
          >
            <Button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white"
              disabled={true}
              onClick={() => form.setValue("reportType", "excel")}
            >
              {form.getValues("reportType") === "excel" && true && (
                <Loader2 className="animate-spin" />
              )}
              Generar Excel
            </Button>
            {form.formState.errors.endDate && <div className="h-5" />}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ReceivablesPage;
