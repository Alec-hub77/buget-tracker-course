import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays } from "date-fns";
import z from "zod";

export const OverviewQuerySchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine(
    ({ from, to }) => {
      const days = differenceInDays(to, from);
      console.log("DIFFERENCE", days);
      const isValidRange = days >= 0 && days <= MAX_DATE_RANGE_DAYS;
      return isValidRange;
    },
    {
      message: `Date range must be between 0 and ${MAX_DATE_RANGE_DAYS} days`,
    }
  );
