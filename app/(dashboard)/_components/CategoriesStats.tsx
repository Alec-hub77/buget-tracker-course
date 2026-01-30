"use client";

import { SkeletonWrapper } from "@/components/SkeletonWrapper";
import { DateToUTCDate, GetFormatterForCurrency } from "@/helpers/helpers";
import { UserSettings } from "@/lib/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CategoriesCard } from "./CategoriesCard";
import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

export const CategoriesStats = ({ userSettings, from, to }: Props) => {
  const { data, isFetching } = useQuery<GetCategoriesStatsResponseType>({
    queryKey: ["overview", "stats", "categories", from, to],
    queryFn: () =>
      fetch(`/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then((res) => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper fullWidth isLoading={isFetching}>
        <CategoriesCard data={data || []} formatter={formatter} type="income" />
      </SkeletonWrapper>
      <SkeletonWrapper fullWidth isLoading={isFetching}>
        <CategoriesCard data={data || []} formatter={formatter} type="expense" />
      </SkeletonWrapper>
    </div>
  );
};
