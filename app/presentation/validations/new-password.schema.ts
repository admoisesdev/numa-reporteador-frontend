import { z } from "zod";

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});
