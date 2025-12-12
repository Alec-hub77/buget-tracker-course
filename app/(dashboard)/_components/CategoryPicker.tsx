"use client";

import { Categoty } from "@/lib/generated/prisma/client";
import { TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  type: TransactionType;
}

export const CategoryPicker = ({ type }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: async () => fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });
  const selectedCategory = categoriesQuery.data?.find((cat: Categoty) => cat.name === value);
  return <div>CategoryPicker</div>;
};
