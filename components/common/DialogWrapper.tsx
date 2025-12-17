"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: ReactNode;
  title?: string | ReactNode;
  description?: string;
  content: ReactNode;
  closeBtn?: boolean;
  footerContent?: ReactNode;
}

export const DialogWrapper = ({ trigger, title, description, content, footerContent, open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        </DialogHeader>
        {content}
        {footerContent && <DialogFooter>{footerContent}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
