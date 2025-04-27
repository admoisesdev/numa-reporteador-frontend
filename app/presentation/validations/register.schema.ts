import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "El email no es válido" }),
  password: z
    .string()
    .min(6, { message: "El password debe tener al menos 6 caracteres" }),
  confirmPassword: z
    .string()
    .min(6, {
      message: "El password debe tener al menos 6 caracteres",
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las password no coinciden",
  path: ["password"],
});
