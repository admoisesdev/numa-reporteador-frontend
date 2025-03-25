import { z } from "zod";

export const chargedPortfolioSchema = z
  .object({
    startDate: z.date({
      required_error: "La fecha de inicio es requerida",
    }),
    endDate: z.date({
      required_error: "La fecha de fin es requerida",
    }),
    reportType: z.enum(["pdf", "excel"], {
      required_error: "El tipo de reporte es obligatorio",
    }),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "La fecha de inicio es menor a la de fin",
    path: ["startDate"],
  });

export const receivablesSchema = z.object({
  expirationDate: z.date({
    required_error: "La fecha de vencimiento es requerida",
  }),
});

export const portfolioAgeSchema = z.object({
  expirationDate: z.date({
    required_error: "La fecha de vencimiento es requerida",
  }),
  reportType: z.enum(["pdf", "excel"], {
    required_error: "El tipo de reporte es obligatorio",
  }),
});
