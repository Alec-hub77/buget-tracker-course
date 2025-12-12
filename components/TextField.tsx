import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { HTMLInputTypeAttribute } from "react";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  inputType?: HTMLInputTypeAttribute;
  defaultValue?: string | number;
  description?: string;
  placeholder?: string;
}

export const TextField = <T extends FieldValues>({
  control,
  label,
  name,
  description,
  placeholder,
  defaultValue,
  inputType,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input defaultValue={defaultValue || ""} {...field} placeholder={placeholder} type={inputType} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
};
