import {useEffect} from "react";
import { useAuthStore } from "presentation/store";
import {
  Alert,
  AlertDescription,
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

import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error,clearError } = useAuthStore();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    clearError();
  }, []);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const wasSuccessfull = await login(values.email, values.password);
    if (wasSuccessfull) {
      navigate("/clientes");
      return;
    }
  };

  return (
    <Card className="lg:m-4 border-gray-500 w-full">
      <CardHeader>
        <CardTitle className="font-bold text-center uppercase">
          Inicia sesión
        </CardTitle>
        <CardDescription className="text-center">
          Inicia sesión y gestiona tus reportes
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {error && (
          <Alert variant="destructive">
            <section className="flex items-center gap-1">
              <AlertCircle className="h-5 w-5 text-red-700" />
              <AlertTitle className="text-red-700">Error al iniciar sesión</AlertTitle>
            </section>
            <AlertDescription className="text-red-700">
              {error?.message}
            </AlertDescription>
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

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
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

            <Button className="bg-slate-700 text-white w-full">
              Iniciar sesion
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center px-0 hidden">
        <Link
          to="/registrar"
          className={buttonVariants({
            variant: "link",
            className: "uppercase",
          })}
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
