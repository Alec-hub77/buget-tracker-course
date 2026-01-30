import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransactionType } from "@/lib/types";

interface Props {
  formatter: Intl.NumberFormat;
  type: TransactionType;
  data: GetCategoriesStatsResponseType | [];
}

export const CategoriesCard = ({ data, formatter, type }: Props) => {
  const filteredData = data.filter((d) => d.type === type);
  const total = filteredData.reduce((acc, el) => acc + (el._sum?.amount || 0), 0);

  return (
    <Card className="h-80 w-full col-span-6">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          {type === "income" ? "Incomes" : "Expenses"} by category
        </CardTitle>
      </CardHeader>
      <div className="flex items-center justify-between gap-2">
        {filteredData.length === 0 && (
          <div className="flex h-60 w-full flex-col items-center justify-center">
            No data for selected period{" "}
            <p className="text-sm text-muted-foreground">
              Try to select different period or to add new {type === "income" ? "incomes" : "expenses"}
            </p>
          </div>
        )}
        {filteredData.length > 0 && (
          <ScrollArea className="h-60 w-full px-4">
            <div className="flex w-full flex-col gap-4 p-4">
              {filteredData.map((cat) => {
                const amount = cat._sum?.amount || 0;
                const percentage = (amount * 100) / (total || amount);
                return (
                  <div key={cat.category} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        {cat.categoryIcon} {cat.category}
                        <span className="ml-2 tex-sx text-muted-foreground">({percentage.toFixed(0)}%)</span>
                      </span>
                      <span className="text-sm text-gray-400">{formatter.format(amount)}</span>
                    </div>
                    <Progress value={percentage} indicator={type === "income" ? "bg-emerald-500" : "bg-red-500"} />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
};
