"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CreateTransactionSchema } from "@/validators/transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { CategoryPicker } from "./CategoryPicker";

interface Props {
  trigger: React.ReactNode;
  type: TransactionType;
}

export const CreateTransactionDialog = ({ trigger, type }: Props) => {
  const form = useForm({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new{" "}
            <span className={cn("m-1", type === "income" ? "text-emerald-500" : "text-red-500")}>{type}</span>
            transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormFieldWrapper
              control={form.control}
              name="descripion"
              label="Description"
              description="Transaction description (optional)"
            />
            <FormFieldWrapper
              control={form.control}
              name="amount"
              defaultValue={0}
              inputType="number"
              label="Amount"
              description="Transaction amount (required)"
            />
            <div className="flex items-center justify-between gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <CategoryPicker type={type} />
                        </FormControl>
                      </div>
                      <FormDescription>Select a category for this transaction</FormDescription>
                    </FormItem>
                  );
                }}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
