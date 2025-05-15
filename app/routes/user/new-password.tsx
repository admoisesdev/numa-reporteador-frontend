import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "presentation/store";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
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
} from "presentation/components/ui";
import { newPasswordSchema } from "presentation/validations";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { cn } from "presentation/lib/utils";

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const { error, changePassword, isLoading, clearError,logout } = useAuthStore();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    clearError();
  }, []);

  const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
    const wasSuccessfull = await changePassword(values.password);
    if (wasSuccessfull) {
      form.reset();
      logout();
      navigate("/auth/login");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[90vh]">
      <Card className="border-gray-500 w-2/4 mt-3">
        <CardHeader>
          <CardTitle className="font-bold text-center uppercase">
            Restablecer contraseña
          </CardTitle>
          <CardDescription className="text-center">
            Restablece tu contraseña y no pierdas acceso a tu cuenta.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <section className="flex items-center gap-1">
                <AlertCircle className="h-5 w-5 text-red-700" />
                <AlertTitle className="text-red-700">
                  Error al iniciar sesión
                </AlertTitle>
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
                name="password"
                render={({ field, formState: { errors } }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="uppercase font-bold text-gray-600">
                      Nueva contraseña:
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Tu contraseña"
                        className={cn(`border`, {
                          "border-red-500": errors.password?.message,
                          "border-blue-500": !errors.password?.message,
                        })}
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
                {isLoading
                  ? "Creando nueva contraseña..."
                  : "Guardar nueva contraseña"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewPasswordPage;
