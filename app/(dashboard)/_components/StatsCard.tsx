import { Card } from "@/components/ui/card";
import { ReactNode, useCallback } from "react";
import CountUp from "react-countup";

interface Props {
  formatter: Intl.NumberFormat;
  title: string;
  icon: ReactNode;
  value: number;
}

export const StatsCard = ({ formatter, title, value, icon }: Props) => {
  const formatFn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter]
  );
  return (
    <Card className="flex h-24 w-full  gap-2 p-4">
      <div className="flex items-center gap-2">
        {icon}
        <div className="flex flex-col  gap-0">
          <p className="text-muted-foreground ml-1">{title}</p>
          <CountUp preserveValue redraw={false} end={value} decimals={2} formattingFn={formatFn} className="text-2xl" />
        </div>
      </div>
    </Card>
  );
};
