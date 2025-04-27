// import { useRegisterMutation } from "@/presentation/hooks";

import {
  Alert,
  AlertTitle,
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

import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AlertCircle, Mail, MailCheck } from "lucide-react";

export const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // const registerMutation = useRegisterMutation();

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    // registerMutation.mutate({
    //   name: values.name,
    //   email: values.email,
    //   password: values.password,
    // });
  };

  return (
    <Card className="lg:mx-2 lg:my-4">
      <CardHeader>
        <CardTitle className="font-bold text-center uppercase">
          Crea tu cuenta
        </CardTitle>
        <CardDescription className="text-center">
          Crea tu cuenta y gestiona tus proyectos
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {registerMutation.data && (
          <Alert variant="success">
            <MailCheck />
            <AlertTitle>{registerMutation.data.message}</AlertTitle>
          </Alert>
        )}

        {registerMutation.error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>{registerMutation.error.message}</AlertTitle>
          </Alert>
        )}

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

            <Button type="submit" variant="secondary">
              <Mail className="mr-2 h-4 w-4" /> Crear cuenta
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
        <Link
          to="/olvide-password"
          className={buttonVariants({
            variant: "link",
            className: "uppercase",
          })}
        >
          Olvidé mis password
        </Link>
      </CardFooter>
    </Card>
  );
};
