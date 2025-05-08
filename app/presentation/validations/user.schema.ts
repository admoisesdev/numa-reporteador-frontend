import { ROLES } from "config/constants";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "El email no es válido" }),
  password: z
    .string()
    .min(6, { message: "El contraseña debe tener al menos 6 caracteres" }),
  roles: z
    .array(
      z.enum(
        [...ROLES.map((role) => role.id)] as [string, ...string[]],
        {
          errorMap: () => ({ message: "El rol es obligatorio" }),
        }
      )
    )
    .min(1, { message: "El rol es obligatorio" }),
  companies: z
    .array(z.number(), {
      errorMap: () => ({ message: "La empresa es obligatoria" }),
    })
    .min(1, { message: "La empresa es obligatoria" }),
});
