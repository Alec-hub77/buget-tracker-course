"use client";

import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import { SkeletonWrapper } from "@/components/SkeletonWrapper";
import { DateToUTCDate, GetFormatterForCurrency } from "@/helpers/helpers";
import { UserSettings } from "@/lib/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { StatsCard } from "./StatsCard";
import { Wallet } from "lucide-react";
import { TrendingDownIcon } from "@/components/ui/trendingDownIcon";
import { TrendingUpIcon } from "@/components/ui/trendingUpIcon";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

export const StatsCards = ({ userSettings, from, to }: Props) => {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(`/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then((res) => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const income = statsQuery.data?.income || 0;
  const expense = statsQuery.data?.expense || 0;
  const balance = income - expense;

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper fullWidth isLoading={statsQuery.isFetching}>
        <StatsCard formatter={formatter} value={income} title="Income" icon={<TrendingUpIcon />} />
      </SkeletonWrapper>
      <SkeletonWrapper fullWidth isLoading={statsQuery.isFetching}>
        <StatsCard formatter={formatter} value={expense} title="Expense" icon={<TrendingDownIcon />} />
      </SkeletonWrapper>
      <SkeletonWrapper fullWidth isLoading={statsQuery.isFetching}>
        <StatsCard
          formatter={formatter}
          value={balance}
          title="Balance"
          icon={<Wallet className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />}
        />
      </SkeletonWrapper>
    </div>
  );
};
