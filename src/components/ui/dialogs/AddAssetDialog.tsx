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
import { useState } from "react";
import Add_AssetForm from "@/src/views/dashboard/components/Add_AssetForm";
import RealEstateForm from "@/src/views/dashboard/components/RealEstateForm";
import { useCreateRealEstateAsset } from "@/src/hooks/asset-properties/physical-assets/real_estate/useRealEstate";
import MediaForm from "@/src/views/dashboard/components/MediaForm";

interface AddAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddAssetDialog({
  open,
  onOpenChange,
}: AddAssetDialogProps) {
  const [step, setStep] = useState(0);
  const [assetData, setAssetData] = useState({});
  const [showAsset, setShowAsset] = useState<string>("")
  const [images, setImages] = useState<File[]>([]);
  const [docs, setDocs] = useState<File[]>([]);

  const { mutateAsync: createRealEstate, isPending } = useCreateRealEstateAsset();

    function submitAsset() {
        const finalData = {...assetData, images, docs};

        console.log(finalData);
        // Send finalData to your API here
    }

  // function createAsset() {
  //  const formData = new FormData();

  //   formData.append("asset.name", assetData.asset.name);
  //   formData.append("asset.description", assetData.asset.description);
  //   formData.append("asset.assetCategory", assetData.asset.assetCategory);
  //   formData.append("asset.assetType", assetData.asset.assetType);
  //   formData.append("asset.acquisition", assetData.asset.acquisition);
  //   formData.append("asset.currency", assetData.asset.currency);
  //   formData.append("asset.currentValue", assetData.asset.currentValue);

    // Preserve your existing asset object
  //   Object.entries(assetData).forEach(([key, value]) => {
  //      if (key !== "asset") {
  //       formData.append(key, String(value));
  //     }
  //   });

  //   // Add images
  //   if (images.length > 0) {
  //     images.forEach((image) => {
  //       formData.append("images.images", image);
  //     });

  //     if (imageCaption?.trim()) {
  //       formData.append("images.caption", imageCaption);
  //     }

  //     formData.append("images.primaryImageIndex", String(0));
  //   }

  //   // add documents
  //   if (documents.length > 0) {
  //     documents.forEach((document) => {
  //       formData.append("documents.documents", document);
  //     });

  //     if (documentCaption?.trim()) {
  //       formData.append("documents.caption", documentCaption);
  //     }

  //     if (documentType?.trim()) {
  //       formData.append("documents.assetDocumentTypeName", documentType);
  //     }
  //   }

  //   mutate(formData);
  // }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Asset</DialogTitle>
          <DialogDescription className="pt-2 pb-3 text-gray-800">
            <div className="overflow-y-scroll max-h-120 scrollbar-hide">
              {step === 0 && <Add_AssetForm onNext={() => setStep(1)} setData={setAssetData} toStep={setShowAsset}/>}
              {step === 1 && showAsset === "Real estate" && <RealEstateForm onNext={() => setStep(2)} onBack={() => setStep(0)}/>}
              {step === 2 && <MediaForm images={images} setImages={setImages} docs={docs} setDocs={setDocs} onNext={submitAsset} onBack={() => setStep(1)}/>}
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* <DialogFooter>
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
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}