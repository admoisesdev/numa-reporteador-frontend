import type { Route } from "./+types/new-user";

import { useUserMutation } from "presentation/hooks/user";
import { useCompanies } from "presentation/hooks/company";

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
import { TypographyH2 } from "presentation/components/shared";
import { userSchema } from "presentation/validations";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CircleCheck } from "lucide-react";
import { ROLES } from "../../config/constants/User";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Crear usuario" },
    {
      name: "description",
      content: "Bienvenido a la pagina para crear usuario",
    },
  ];
}

export default function NewUserPage() {
  const { createUser } = useUserMutation();
  const { selectOptionsCompanies } = useCompanies();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      roles: "",
      companies: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const company = Number(values.companies);
    const role = values.roles;

    console.log("values", { values, company, role });
    createUser.mutate({
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      roles: [role],
      companyIds: [company],
    });
  };

  return (
    <section className="flex flex-col justify-center w-full">
      <section className="w-full mt-8">
        {createUser.error && (
          <Alert variant="destructive">
            <section className="flex items-center gap-1">
              <AlertCircle className="h-5 w-5 text-red-700" />
              <AlertTitle className="text-red-700">
                {createUser.error.message}
              </AlertTitle>
            </section>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-5/6"
          >
            <div className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Nombre
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Tu nombre" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Apellido
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Tu Apellido" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Tu email" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Tu password"
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
                name="roles"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Rol:
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Seleccione un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel className="font-semibold">
                              Roles
                            </SelectLabel>
                            {ROLES.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companies"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Empresa:
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Seleccione una empresa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel className="font-semibold">
                              Empresas
                            </SelectLabel>
                            {selectOptionsCompanies.map((company) => (
                              <SelectItem
                                key={company.value}
                                value={String(company.value)}
                              >
                                {company.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
              disabled={createUser.isPending}
            >
              <Spinner
                size="small"
                show={createUser.isPending}
                className="text-slate-300"
              />
              Crear usuario
            </Button>
          </form>
        </Form>
      </section>
    </section>
  );
}
