"use client";

import { Category } from "@/lib/generated/prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { DeleteCategory } from "../_actions/categories";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TransactionType } from "@/lib/types";

interface Props {
  trigger: ReactNode;
  category: Category;
}

export const DeleteCategoryDialog = ({ category, trigger }: Props) => {
  const categoryIdentifier = `${category.name}-${category.type}`;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async () => {
      toast.success("Category successfully deleted", { id: categoryIdentifier });
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: () => toast.error("Ther is an error while deleting category", { id: categoryIdentifier }),
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure</AlertDialogTitle>
          <AlertDialogDescription>
            This action can not be undone. This will permanently delete your category
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading("Deleting category...", { id: categoryIdentifier });
              mutate({ name: category.name, type: category.type as TransactionType });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
