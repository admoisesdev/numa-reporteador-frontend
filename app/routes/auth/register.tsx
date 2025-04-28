import { useAuthStore } from "presentation/store";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  buttonVariants,
} from "presentation/components/ui";
import { registerSchema } from "presentation/validations";

import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Mail } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const wasSuccessfull = await register(
      values.name,
      values.email,
      values.password
    );

    if (wasSuccessfull) {
      navigate("/auth/login");
      return;
    }
  };

  return (
    <Card className="lg:m-4 border-gray-500 w-full">
      <CardHeader>
        <CardTitle className="font-bold text-center uppercase">
          Crea tu cuenta
        </CardTitle>
        <CardDescription className="text-center">
          Crea tu cuenta y gestiona tus reportes
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                  <FormMessage />
                </FormItem>
              )}
            />

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

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel className="uppercase font-bold text-gray-600">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Tu password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel className="uppercase font-bold text-gray-600">
                    Repetir Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder=" Repetir tu password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-slate-700 text-white w-full" disabled>
              Crear cuenta
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center sm:flex-row px-0">
        <Link
          to="/"
          className={buttonVariants({
            variant: "link",
            className: "uppercase",
          })}
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
