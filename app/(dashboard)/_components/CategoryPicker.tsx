"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Category } from "@/lib/generated/prisma/client";
import { TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  type: TransactionType;
}

export const CategoryPicker = ({ type }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories", type],
    queryFn: async () => fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory = categories?.find((cat: Category) => cat.name === value);

  const successCallback = (category: Category) => {
    setValue(category.name);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-[200px] justify-between">
          {selectedCategory ? <CategoryRow category={selectedCategory} /> : "Select category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search category..." />
          <CreateCategoryDialog type={type} onSuccessCallback={successCallback} />
          <CommandEmpty>
            <p>Category not found</p>
            <p className="text-sx text-muted-foreground">Tip: create a new category</p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categories &&
                categories.map((cat) => (
                  <CommandItem
                    key={cat.name}
                    onSelect={() => {
                      setValue(cat.name);
                      setOpen(false);
                    }}
                  >
                    <CategoryRow category={cat} />
                    <Check className={cn("ml-2 w-4 h-4 opacity-0", value === cat.name && "opacity-100")} />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const CategoryRow = ({ category }: { category: Category }) => {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
};
