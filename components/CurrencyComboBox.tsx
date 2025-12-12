"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CURRENCIES, Currency } from "@/lib/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SkeletonWrapper } from "./SkeletonWrapper";
import { UserSettings } from "@/lib/generated/prisma/client";
import { updateUserCurrency } from "@/app/wizard/_actions/userSettings";
import { toast } from "sonner";

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedOption, setSelectedOption] = React.useState<Currency | null>(null);

  const { data, isFetching } = useQuery<UserSettings>({
    queryKey: ["userSettigns"],
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserCurrency,
    onSuccess: (data: UserSettings) => {
      setSelectedOption(CURRENCIES.find((currency) => currency.value === data.currency) || null);
      toast.success("Currency updated successfully", { id: "update-currency" });
    },
    onError: () => {
      toast.error("Failed to update currency", { id: "update-currency" });
    },
  });

  const selectOption = (currency: Currency | null) => {
    if (currency === selectedOption) return;
    if (!currency) {
      toast.error("Please select a valid currency");
      return;
    }
    toast.loading("Updating currency...", { id: "update-currency" });
    mutate(currency.value);
  };

  React.useEffect(() => {
    if (!data) return;
    const currency = CURRENCIES.find((currency) => currency.value === data.currency);
    if (currency) setSelectedOption(currency);
  }, [data]);

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={isFetching}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start" disabled={isPending}>
              {selectedOption ? <>{selectedOption.label}</> : <>Set currency</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <OptionList setOpen={setOpen} setSelectedOption={selectOption} />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={isFetching}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full justify-start" disabled={isPending}>
            {selectedOption ? <>{selectedOption.label}</> : <>Set currency</>}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <OptionList setOpen={setOpen} setSelectedOption={selectOption} />
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  );
}

function OptionList({
  setOpen,
  setSelectedOption,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (option: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currencies..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {CURRENCIES.map((currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value) => {
                setSelectedOption(CURRENCIES.find((priority) => priority.value === value) || null);
                setOpen(false);
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
