"use client";

import { DialogWrapper } from "@/components/common/DialogWrapper";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CreateCategorySchema, CreateCategorySchemaType } from "@/validators/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { IconPicker } from "./IconPicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategory } from "../_actions/categories";
import { Category } from "@/lib/generated/prisma/client";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  type: TransactionType;
  onSuccessCallback: (category: Category) => void;
}

export const CreateCategoryDialog = ({ type, onSuccessCallback }: Props) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      icon: "",
      type,
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: async (data: Category) => {
      onSuccessCallback(data);
      toast.success(`Category: ${data.name} created successfully 🎉`, { id: "create-category" });
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Error while creating category", { id: "create-category" });
    },
  });

  const onSubmit = (values: CreateCategorySchemaType) => {
    toast.loading("Loading...", { id: "create-category" });
    mutate(values);
  };

  const getDialogTitle = () => {
    return (
      <>
        Create <span className={cn("m-1", type === "income" ? "text-emerald-500" : "text-red-500")}>{type}</span>{" "}
        category
      </>
    );
  };

  const getDialogContent = () => {
    return (
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormFieldWrapper name="name" label="Name" placeholder="Category" control={form.control} />
          <FormFieldWrapper
            name="icon"
            label="Icon"
            control={form.control}
            description="This is how your category will appear in app"
            renderControl={(field) => <IconPicker form={form} field={field} />}
          />
        </form>
      </Form>
    );
  };

  const getDialogFooterContent = () => {
    return (
      <>
        <DialogClose asChild>
          <Button disabled={isPending} variant={"secondary"} className="cursor-pointer" onClick={() => form.reset()}>
            Cancel
          </Button>
        </DialogClose>
        <Button disabled={isPending} className="cursor-pointer" onClick={form.handleSubmit(onSubmit)}>
          {isPending ? <Loader2 className="animate-spin" /> : "Create"}
        </Button>
      </>
    );
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={setOpen}
      trigger={
        <Button
          variant="ghost"
          className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 cursor-pointer"
        >
          <PlusSquare className="mr-2 h-4 w-4" /> Create new
        </Button>
      }
      title={getDialogTitle()}
      content={getDialogContent()}
      description="Categories are used to group your transactions"
      footerContent={getDialogFooterContent()}
    />
  );
};
