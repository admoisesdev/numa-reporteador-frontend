// import { useLoginMutation } from "@/presentation/hooks";
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
import { loginSchema } from "presentation/validations";

import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AlertCircle, LogIn } from "lucide-react";

export const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const { loginMutation } = useLoginMutation();

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    // loginMutation.mutate(values);
  };

  return (
    <Card className="lg:mx-2 lg:my-4">
      <CardHeader>
        <CardTitle className="font-bold text-center uppercase">
          Inicia sesión
        </CardTitle>
        <CardDescription className="text-center">
          Inicia sesión y gestiona tus proyectos
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {loginMutation.error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>{loginMutation.error.message}</AlertTitle>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
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
                <FormItem className="w-full">
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

            <Button variant="secondary">
              <LogIn className="mr-2 h-4 w-4" /> Iniciar sesion
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row px-0">
        <Link
          to="/registrar"
          className={buttonVariants({
            variant: "link",
            className: "uppercase",
          })}
        >
          ¿No tienes una cuenta? Regístrate
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
