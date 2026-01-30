import { CURRENCIES } from "@/lib/constants";

export function DateToUTCDate(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}

export const GetFormatterForCurrency = (currency: string) => {
  const locale = CURRENCIES.find((c) => c.value === currency)?.locale;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
};
