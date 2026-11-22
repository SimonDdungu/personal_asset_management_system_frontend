import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import ImageForm from "../images/ImageForm";

interface AddAssetImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isAdding: boolean;
  assetName?: string;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export function AddAssetImageDialog({
  open,
  onOpenChange,
  onConfirm,
  isAdding,
  assetName,
  files,
  setFiles
}: AddAssetImageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Images</DialogTitle>
          <DialogDescription className="pt-2 pb-3 text-gray-800">
            <div className="overflow-y-scroll max-h-100 scrollbar-hide">
              <ImageForm files={files} setFiles={setFiles}/>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            disabled={isAdding}
            onClick={() => {onOpenChange(false); setFiles([])}}
            className={`cursor-pointer ${isAdding ? "opacity-50" : "opacity-100"}`}
          >
            Cancel
          </Button>

          <Button
            className={`bg-blue-600 text-white hover:bg-blue-700 cursor-pointer ${isAdding ? "opacity-50" : "opacity-100"}`}
            disabled={isAdding}
            onClick={onConfirm}
          >
            {isAdding ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}