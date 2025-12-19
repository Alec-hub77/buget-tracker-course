"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CreateTransactionSchema, CreateTransactionSchemeType } from "@/validators/transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { CategoryPicker } from "./CategoryPicker";
import { useCallback, useState } from "react";
import { DatePicker } from "./DatePicker";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransaction } from "../_actions/transactions";
import { toast } from "sonner";
import { DateToUTCDate } from "@/helpers/helpers";

const createTransactionId = "create-transaction";

interface Props {
  trigger: React.ReactNode;
  type: TransactionType;
}

export const CreateTransactionDialog = ({ trigger, type }: Props) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
    },
  });
  const handleCategoryChanage = useCallback(
    (value: string) => {
      form.setValue("category", value);
    },
    [form]
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateTransaction,
    onSuccess: () => {
      toast.success("Transaction created successfully", { id: createTransactionId });
      form.reset({
        type,
        description: "",
        amount: 0,
        category: undefined,
        date: new Date(),
      });
      queryClient.invalidateQueries({
        queryKey: ["overview"],
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("An error while creating transaction");
    },
  });

  const onSubmit = useCallback(
    (values: CreateTransactionSchemeType) => {
      toast.loading("Creating transaction", { id: createTransactionId });
      mutate({
        ...values,
        date: DateToUTCDate(values.date),
      });
    },
    [mutate]
  );

  const handleOpenDialog = () => {
    setOpen((prev) => !prev);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
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
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormFieldWrapper
              control={form.control}
              name="description"
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
              <FormFieldWrapper
                control={form.control}
                name="category"
                renderControl={() => <CategoryPicker type={type} onChange={handleCategoryChanage} />}
                label="Category"
                description="Select a category for this transaction"
              />
              <FormFieldWrapper
                control={form.control}
                name="date"
                renderControl={(field) => <DatePicker field={field} />}
                label="Date"
                description="Select a date"
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isPending} variant={"secondary"} className="cursor-pointer" onClick={() => form.reset()}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} className="cursor-pointer" onClick={form.handleSubmit(onSubmit)}>
            {isPending ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
