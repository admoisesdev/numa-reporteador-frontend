import { z } from "zod";

export const companySchema = z.object({
  ruc: z
    .string()
    .min(13, { message: "El RUC debe tener 13 caracteres" })
    .max(13, { message: "El RUC debe tener 13 caracteres" }),
  bussinessName: z
    .string()
    .min(3, {
      message: "El nombre de la empresa debe tener al menos 3 caracteres",
    })
    .max(50, {
      message: "El nombre de la empresa no puede tener más de 50 caracteres",
    }),
  project: z
    .string()
    .min(3, {
      message: "El nombre del proyecto debe tener al menos 3 caracteres",
    })
    .max(50, {
      message: "El nombre del proyecto no puede tener más de 50 caracteres",
    }),
  commercial: z
    .string()
    .min(3, { message: "El nombre comercial debe tener al menos 3 caracteres" })
    .max(50, {
      message: "El nombre comercial no puede tener más de 50 caracteres",
    }),
  establishment: z
    .string()
    .min(1, { message: "El establecimiento debe tener al menos 1 caracteres" })
    .max(3, {
      message: "El establecimiento no puede tener más de 3 caracteres",
    }),
  legalRepresentative: z
    .string()
    .min(3, {
      message: "El representante legal debe tener al menos 3 caracteres",
    })
    .max(50, {
      message: "El representante legal no puede tener más de 50 caracteres",
    }),
  resolutionDate: z
    .string()
    .min(10, {
      message: "La fecha de resolución debe tener al menos 10 caracteres",
    })
    .max(10, {
      message: "La fecha de resolución no puede tener más de 10 caracteres",
    }),
});
   
