import type { Route } from "./+types/new-company";

import { useCompanies, useCompanyMutation } from "presentation/hooks/company";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Spinner,
  buttonVariants,
} from "presentation/components/ui";
import { companySchema } from "presentation/validations";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CircleCheck } from "lucide-react";
import { ROLES } from "../../config/constants/User";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Crear empresa" },
    {
      name: "description",
      content: "Bienvenido a la pagina para crear empresa",
    },
  ];
}

export default function NewCompanyPage() {
  const { createCompany } = useCompanyMutation();
  const { selectOptionsCompanies } = useCompanies();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      ruc: "",
      bussinessName: "",
      project: "",
      commercial: "",
      establishment: "",
      legalRepresentative: "",
      resolutionDate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof companySchema>) => {
    createCompany.mutate({
      ruc: values.ruc,
      businessName: values.bussinessName,
      project: values.project,
      commercial: values.commercial,
      establishment: values.establishment,
      legalRepresentative: values.legalRepresentative,
      resolutionDate: values.resolutionDate,
    });
  };

  return (
    <section className="flex flex-col justify-center w-full">
      <section className="w-full mt-8">
        {createCompany.error && (
          <Alert variant="destructive" className="mb-4 w-3/4">
            <section className="flex items-center gap-1">
              <AlertCircle className="h-5 w-5 text-red-700" />
              <AlertTitle className="text-red-700">
                {createCompany.error.message}
              </AlertTitle>
            </section>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-5/6"
          >
            <div className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name="ruc"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      RUC
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Tu RUC" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bussinessName"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Razón social
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Tu razón social"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Nombre del proyecto
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Tu proyecto" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name="commercial"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Nombre comercial
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Tu nombre comercial"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="legalRepresentative"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Representante legal
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Tu representante"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name="resolutionDate"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Fecha de resolución
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="establishment"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Establecimiento
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Tu establecimiento"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="bg-slate-700 text-white w-2/5 hover:bg-slate-800 transition-all duration-200 ease-in-out"
              disabled={createCompany.isPending}
            >
              <Spinner
                size="small"
                show={createCompany.isPending}
                className="text-slate-300"
              />
              Crear empresa
            </Button>
          </form>
        </Form>
      </section>
    </section>
  );
}
