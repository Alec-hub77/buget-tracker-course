import { CURRENCIES } from "@/lib/constants";
import { z } from "zod";

export const UpdateUserCurrencySchema = z.object({
  currency: z.custom((value) => {
    const found = CURRENCIES.some((c) => c.value === value);
    if (!found) {
      throw new Error(`Invalid currency: ${value}`);
    }
    return value;
  }),
});
