"use client";

import { SkeletonWrapper } from "@/components/SkeletonWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDownIcon } from "@/components/ui/trendingDownIcon";
import { TrendingUpIcon } from "@/components/ui/trendingUpIcon";
import { TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { CategoryCard } from "./CategoryCard";

interface Props {
  type: TransactionType;
}

export const CategoryList = ({ type }: Props) => {
  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery<Category[]>({
    queryKey: ["categories", type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const isData = categories && !!categories.length;

  return (
    <SkeletonWrapper isLoading={isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {type === "expense" ? <TrendingDownIcon /> : <TrendingUpIcon />}
              <div>
                {type === "income" ? "Incomes" : "Expenses"} categories{" "}
                <div className="text-sm text-muted-foreground">Sorted by name</div>
              </div>
            </div>

            <CreateCategoryDialog
              type={type}
              onSuccessCallback={() => refetch()}
              trigger={
                <Button>
                  <PlusSquare className="mr-2 h-4 w-4" /> Create category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!isData && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p>
              No <span className={cn("m-1", type === "income" ? "text-emerald-500" : "text-red-500")}>{type}</span>{" "}
              categories yet
            </p>
            <p className="text-sm text-muted-foreground">Create one to get started</p>
          </div>
        )}
        {isData && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
};
