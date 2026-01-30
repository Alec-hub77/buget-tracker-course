"use client";

import { GetHistoryDataResponseType } from "@/app/api/history-data/route";
import { Timeframe, TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import CountUp from "react-countup";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

interface Props {
  data: GetHistoryDataResponseType;
  timeframe: Timeframe;
  formatter: Intl.NumberFormat;
}

export const HistoryDataChart = ({ data, timeframe, formatter }: Props) => {
  const getLinearGradient = (type: TransactionType) => {
    return (
      <defs>
        <linearGradient id={type === "income" ? "incomeBar" : "expenseBar"} x1={0} y1={0} x2={0} y2={1}>
          <stop offset={0} stopColor={type === "income" ? "#10b981" : "#ef4444"} stopOpacity={1} />
          <stop offset={1} stopColor={type === "income" ? "#10b981" : "#ef4444"} stopOpacity={0} />
        </linearGradient>
      </defs>
    );
  };

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart height={300} data={data} barCategoryGap={5}>
        {getLinearGradient("income")}
        {getLinearGradient("expense")}
        <CartesianGrid strokeDasharray={"5 5"} strokeOpacity={0.2} vertical={false} />

        <XAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          padding={{ left: 5, right: 5 }}
          dataKey={({ year, month, day }) => {
            const date = new Date(year, month, day || 1);
            if (timeframe === "year") {
              return date.toLocaleDateString("default", { month: "long" });
            }
            return date.toLocaleDateString("default", { day: "2-digit" });
          }}
        />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Bar dataKey={"income"} label="Income" fill="url(#incomeBar)" radius={4} className="cursor-pointer" />
        <Bar dataKey={"expense"} label="Expense" fill="url(#expenseBar)" radius={4} className="cursor-pointer" />

        <Tooltip
          cursor={{ opacity: 0.1 }}
          content={(props) => <CustomTooltip customformatter={formatter} {...props} />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  customformatter: Intl.NumberFormat;
}

const CustomTooltip = ({ customformatter, active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  const { expense, income } = payload[0].payload;

  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
      <TooltipRow
        formatter={customformatter}
        label="Expense"
        bgColor="bg-red-500"
        textColor="text-red-500"
        value={expense}
      />
      <TooltipRow
        formatter={customformatter}
        label="Income"
        bgColor="bg-emerald-500"
        textColor="text-emerald-500"
        value={income}
      />
      <TooltipRow
        formatter={customformatter}
        label="Balance"
        bgColor="bg-gray-500"
        textColor="text-foreground"
        value={income - expense}
      />
    </div>
  );
};

interface TooltipRowProps {
  formatter: Intl.NumberFormat;
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}
const TooltipRow = ({ formatter, bgColor, label, textColor, value }: TooltipRowProps) => {
  const formattingFn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter]
  );
  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-4 w-4 rounded-full", bgColor)} />
      <div className="flex w-full justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn("text-sm font-bold", textColor)}>
          <CountUp
            duration={0.5}
            preserveValue
            end={value}
            decimals={0}
            formattingFn={formattingFn}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};
