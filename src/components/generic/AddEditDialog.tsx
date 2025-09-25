"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { EditIcon, PlusCircle } from "lucide-react";
import React from "react";
const AddEditItemDialog = ({
  isOpenDialog,
  setIsOpenDialog,
  dialogWidth = "sm:max-w-xl",
  isEdit = false,
  children,
}: {
  isOpenDialog?: boolean;
  setIsOpenDialog?: (val: boolean) => void;
  dialogWidth?: string;
  isEdit?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={`${isEdit ? "ghost" : "outline"}`}>
            {isEdit ? <EditIcon /> : <PlusCircle />}
          </Button>
        </DialogTrigger>
        <DialogContent className={`${dialogWidth}  p-0`}>
          <DialogTitle className="sr-only">Edit Post</DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEditItemDialog;
