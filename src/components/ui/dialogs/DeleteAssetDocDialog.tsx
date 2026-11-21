import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface DeleteAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting: boolean;
  assetName?: string;
}

export function DeleteAssetDocDialog({
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
  assetName
}: DeleteAssetDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Documents</DialogTitle>
          <DialogDescription className="pt-2 pb-3 text-gray-800">
            Are you sure you want to delete these documents?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
            className={`cursor-pointer ${isDeleting ? "opacity-50" : "opacity-100"}`}
          >
            Cancel
          </Button>

          <Button
            className={`bg-red-600 text-white hover:bg-red-700 cursor-pointer ${isDeleting ? "opacity-50" : "opacity-100"}`}
            disabled={isDeleting}
            onClick={onConfirm}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}