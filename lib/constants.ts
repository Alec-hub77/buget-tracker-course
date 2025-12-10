export const NAVBAR_ITEMS = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

export const CURRENCIES = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
  { value: "GBP", label: "£ Pound", locale: "en-GB" },
];

export type Currency = (typeof CURRENCIES)[0];
