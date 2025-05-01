import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "El email no es válido" }),
  password: z
    .string()
    .min(6, { message: "El contraseña debe tener al menos 6 caracteres" }),
});
