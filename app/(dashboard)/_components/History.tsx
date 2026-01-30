"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetFormatterForCurrency } from "@/helpers/helpers";
import { UserSettings } from "@/lib/generated/prisma/client";
import { Period, Timeframe } from "@/lib/types";
import { useMemo, useState } from "react";
import { HistoryPeriodSelector } from "./HistoryPeriodSelector";
import { useQuery } from "@tanstack/react-query";
import { GetHistoryDataResponseType } from "@/app/api/history-data/route";
import { SkeletonWrapper } from "@/components/SkeletonWrapper";
import { HistoryDataChart } from "./HistoryDataChart";

interface Props {
  userSettings: UserSettings;
}
export const History = ({ userSettings }: Props) => {
  const [timeframe, setTimeframe] = useState<Timeframe>("month");
  const [period, setPeriod] = useState<Period>({ month: new Date().getMonth(), year: new Date().getFullYear() });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const { data: historyData, isFetching } = useQuery<GetHistoryDataResponseType>({
    queryKey: ["overview", "history", timeframe, period],
    queryFn: () =>
      fetch(`/api/history-data?timeframe=${timeframe}&year=${period.year}&month=${period.month}`).then((res) =>
        res.json()
      ),
  });

  const dataAvailable = historyData && historyData.length;

  return (
    <div className="container">
      <h2 className="mt-12 text-3xl font-bold">History</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between md:grid-flow-col">
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
            <div className="flex h-10 gap-2">
              <Badge variant={"outline"} className="flex items-center gap-2 text-sm">
                <div className="h-4 w-4 rounded-full bg-emerald-500" />
                Income
                <div className="h-4 w-4 rounded-full bg-red-500" />
                Expense
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonWrapper isLoading={isFetching}>
            {dataAvailable && (
              <div>
                <HistoryDataChart data={historyData} timeframe={timeframe} formatter={formatter} />
              </div>
            )}
            {!dataAvailable && (
              <Card className="flex flex-col h-[300px] items-center justify-center bg-background">
                No data for the selected period
                <p className="text-sm text-muted-foreground">Try to select different period</p>
              </Card>
            )}
          </SkeletonWrapper>
        </CardContent>
      </Card>
    </div>
  );
};
