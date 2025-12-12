"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { createTransactionSchema, CreateTransactionSchemeType } from "@/schema/transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextField } from "@/components/TextField";
import { CategoryPicker } from "./CategoryPicker";

interface Props {
  trigger: React.ReactNode;
  type: TransactionType;
}

export const CreateTransactionDialog = ({ trigger, type }: Props) => {
  const form = useForm({
    resolver: zodResolver(createTransactionSchema),
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
            {/* <FormField
              control={form.control}
              name="descripion"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input defaultValue={""} {...field} />
                    </FormControl>
                    <FormDescription>Transaction descripion (optional)</FormDescription>
                  </FormItem>
                );
              }}
            /> */}
            <TextField
              control={form.control}
              name="descripion"
              label="Description"
              description="Transaction description (optional)"
            />
            <TextField
              control={form.control}
              name="amount"
              defaultValue={0}
              inputType="number"
              label="Ampount"
              description="Transaction amount (required)"
            />
            <div className="flex items-center justify-between gap-2">
              {/* Category Picker */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <CategoryPicker type="expense" />
                      </FormControl>
                      <FormDescription>Transaction descripion (optional)</FormDescription>
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
