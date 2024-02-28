import { z } from "zod";

const convertTokenToCurrencyInput = z.object({
  from: z.string(),
  to: z.string(),
  amount: z.number().positive(),
});

export { convertTokenToCurrencyInput };
