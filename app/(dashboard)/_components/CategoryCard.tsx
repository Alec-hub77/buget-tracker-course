import { Button } from "@/components/ui/button";
import { Category } from "@/lib/generated/prisma/client";
import { TrashIcon } from "lucide-react";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";

interface Props {
  category: Category;
}

export const CategoryCard = ({ category }: Props) => {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/10 dark:shadow-white/10">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        trigger={
          <Button
            className="flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20"
            variant={"secondary"}
          >
            <TrashIcon className="w-4 h-4" />
            Remove
          </Button>
        }
      />
    </div>
  );
};
