import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
}

export const DatePicker = <T extends FieldValues>({ field }: Props<T>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn("w-[200px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
          >
            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={(value) => {
            if (!value) return;
            field.onChange(value);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
