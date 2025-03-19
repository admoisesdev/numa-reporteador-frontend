import { z } from "zod";

export const chargedPortfolioSchema = z
  .object({
    startDate: z.date({
      required_error: "La fecha de inicio es requerida",
    }),
    endDate: z.date({
      required_error: "La fecha de fin es requerida",
    }),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "La fecha de inicio es menor a la de fin",
    path: ["startDate"],
  });
