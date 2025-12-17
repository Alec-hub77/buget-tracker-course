import { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import React, { HTMLInputTypeAttribute, ReactNode } from "react";

type RenderControl<T extends FieldValues> = (field: ControllerRenderProps<T, Path<T>>) => ReactNode;

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  inputType?: HTMLInputTypeAttribute;
  defaultValue?: string | number;
  description?: string;
  placeholder?: string;
  renderControl?: RenderControl<T>;
  formItemClassName?: string;
}

export const FormFieldWrapper = <T extends FieldValues>({
  control,
  label,
  name,
  description,
  placeholder,
  inputType = "text",
  renderControl,
  formItemClassName,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={formItemClassName}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {renderControl ? renderControl(field) : <Input {...field} placeholder={placeholder} type={inputType} />}
            </FormControl>
            <FormMessage />
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
};
