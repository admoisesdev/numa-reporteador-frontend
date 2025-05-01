import { useEffect } from "react";
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
  Spinner,
  buttonVariants,
} from "presentation/components/ui";
import { registerSchema } from "presentation/validations";

import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CircleCheck } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register,clearError, error, isRegister, isLoading } = useAuthStore();
  console.log({ error, isRegister, isLoading });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    clearError();
  }, []);

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const wasSuccessfull = await register({
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });

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
        {error && (
          <Alert variant="destructive">
            <section className="flex items-center gap-1">
              <AlertCircle className="h-5 w-5 text-red-700" />
              <AlertTitle className="text-red-700">
                Error al registrar usuario
              </AlertTitle>
            </section>
            <AlertDescription className="text-red-700">
              {error?.message}
            </AlertDescription>
          </Alert>
        )}

        {isRegister && (
          <Alert variant="success">
            <section className="flex items-center gap-1">
              <CircleCheck className="h-5 w-5 text-emerald-700" />
              <AlertTitle className="text-emerald-700">
                Usuario registrado correctamente.
              </AlertTitle>
            </section>
            <AlertDescription className="text-emerald-700">
              Inicia sesión para poder acceder a tu cuenta.
            </AlertDescription>
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel className="uppercase font-bold text-gray-600">
                    Repetir Contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder=" Repetir tu password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-slate-700 text-white w-full"
              disabled={isLoading}
            >
              <Spinner
                size="small"
                show={isLoading}
                className="text-slate-300"
              />
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
