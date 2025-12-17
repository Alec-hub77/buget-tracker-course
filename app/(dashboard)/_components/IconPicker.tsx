"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CircleOff } from "lucide-react";
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  field: ControllerRenderProps<T, Path<T>>;
}

export const IconPicker = <T extends FieldValues>({ form, field }: Props<T>) => {
  const { resolvedTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-[100px] w-full cursor-pointer" variant={"outline"}>
          {form.watch(field.name) ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl" role="image">
                {field.value}
              </span>
              <p className="text-xs text-muted-foreground">Click to change</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <CircleOff className="h-12! w-12!" />
              <p className="text-xs text-muted-foreground">Click to select</p>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full relative top-[220px] ">
        <Picker
          data={data}
          onEmojiSelect={(emoji: { native: string }) => {
            field.onChange(emoji.native);
          }}
          theme={resolvedTheme}
        />
      </PopoverContent>
    </Popover>
  );
};
