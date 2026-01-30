"use client";

import { GetHistoryPeriodsResponseType } from "@/app/api/history-periods/route";
import { SkeletonWrapper } from "@/components/SkeletonWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Period, Timeframe } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface Props {
  period: Period;
  setPeriod: (period: Period) => void;
  timeframe: Timeframe;
  setTimeframe: (timeframe: Timeframe) => void;
}

export const HistoryPeriodSelector = ({ period, setPeriod, timeframe, setTimeframe }: Props) => {
  const historyPeriods = useQuery<GetHistoryPeriodsResponseType>({
    queryKey: ["overview", "history", "periods"],
    queryFn: () => fetch(`/api/history-periods`).then((res) => res.json()),
  });

  return (
    <div className="flex flex-wrap items-center gap-4">
      <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
        <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as Timeframe)}>
          <TabsList>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </SkeletonWrapper>
      <div className="flex flex-wrap gap-2">
        <SkeletonWrapper isLoading={historyPeriods.isFetching}>
          <YearSelector period={period} setPeriod={setPeriod} years={historyPeriods.data || []} />
        </SkeletonWrapper>
        {timeframe === "month" && (
          <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
            <MonthSelector period={period} setPeriod={setPeriod} />
          </SkeletonWrapper>
        )}
      </div>
    </div>
  );
};

interface YearSelectorPorps {
  period: Period;
  setPeriod: (period: Period) => void;
  years: GetHistoryPeriodsResponseType;
}
const YearSelector = ({ period, setPeriod, years }: YearSelectorPorps) => {
  return (
    <Select
      value={period.year.toString()}
      onValueChange={(value) =>
        setPeriod({
          month: period.month,
          year: parseInt(value),
        })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

interface MonthSelectorPorps {
  period: Period;
  setPeriod: (period: Period) => void;
}
const MonthSelector = ({ period, setPeriod }: MonthSelectorPorps) => {
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <Select
      value={period.month.toString()}
      onValueChange={(value) =>
        setPeriod({
          month: parseInt(value),
          year: period.year,
        })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => {
          const monthStr = new Date(period.year, month, 1).toLocaleString("en-US", { month: "long" });
          return (
            <SelectItem key={month} value={month.toString()}>
              {monthStr}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
