"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import { useCreateElectronicAsset } from '@/src/hooks/asset-properties/physical-assets/electronics/useElectronics';
import { useCreateRealEstateAsset } from '@/src/hooks/asset-properties/physical-assets/real_estate/useRealEstate';
import { CreateAssetsRequest } from '@/src/interfaces/asset_properties/assetTypes';
import Add_AssetForm from '@/src/views/dashboard/components/Add_AssetForm';
import ElectronicForm from '@/src/views/dashboard/components/add-forms/physical/ElectronicForm';
import MediaForm from '@/src/views/dashboard/components/MediaForm';
import RealEstateForm from '@/src/views/dashboard/components/add-forms/physical/RealEstateForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import LandForm from '@/src/views/dashboard/components/add-forms/physical/LandForm';
import VehicleForm from '@/src/views/dashboard/components/add-forms/physical/VehicleForm';
import FurnitureForm from '@/src/views/dashboard/components/add-forms/physical/FurnitureForm';
import MachineryForm from '@/src/views/dashboard/components/add-forms/physical/MachineryForm';
import CollectiblesForm from '@/src/views/dashboard/components/add-forms/physical/CollectiblesForm';
import { useCreateVehicleAsset } from '@/src/hooks/asset-properties/physical-assets/vehicle/useVehicle';
import { useCreateCollectiblesValuablesAsset } from '@/src/hooks/asset-properties/physical-assets/collectibles_valuables/useCollectiblesValuables';
import { useCreateFurnitureAsset } from '@/src/hooks/asset-properties/physical-assets/furniture/useFurniture';
import { useCreateMachineryAsset } from '@/src/hooks/asset-properties/physical-assets/machinery/useMachinery';
import { useCreateLandAsset } from '@/src/hooks/asset-properties/physical-assets/land/useLand';

const page = () => {
    const router = useRouter();

    const [step, setStep] = useState(0);
    const [assetData, setAssetData] = useState<CreateAssetsRequest | null>(null);
    const [showAsset, setShowAsset] = useState<string>("")
    const [assetProperties, setAssetProperties] = useState({})
    const [images, setImages] = useState<File[]>([]);
    const [docs, setDocs] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    
    const { mutateAsync: createRealEstate, isPending: isRealEstatePending } = useCreateRealEstateAsset();
    const { mutateAsync: createElectronic, isPending: isElectronicPending } = useCreateElectronicAsset();
    const { mutateAsync: createVehicle, isPending: isVehiclePending } = useCreateVehicleAsset();
    const { mutateAsync: createCollectibles, isPending: isCollectiblesPending } = useCreateCollectiblesValuablesAsset();
    const { mutateAsync: createFurniture, isPending: isFurniturePending } = useCreateFurnitureAsset();
    const { mutateAsync: createMachinery, isPending: isMachineryPending } = useCreateMachineryAsset();
    const { mutateAsync: createLand, isPending: isLandPending } = useCreateLandAsset();

    const submissionLoading = useRef<boolean>(false);

    async function submitAsset() {
      if (!assetData) return;
      if (submissionLoading.current) return;

      submissionLoading.current = true;

      setIsSubmitting(true)

      
      const formData = new FormData();

      // Asset info the same for all
      Object.entries(assetData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(`asset.${key}`, String(value));
        }
      });

      Object.entries(assetProperties).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });


      // Append images
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append("images.images", image);
        });
        formData.append("images.primaryImageIndex", String(0));
      }

      // Append documents
      if (docs.length > 0) {
        docs.forEach((doc) => {
          formData.append("documents.documents", doc);
        });
      }

      console.log("FINAL DATA: ", formData)

      try {
        if (showAsset === "Real estate") {
          await createRealEstate(formData);
        } else if (showAsset === "Electronics") {
          await createElectronic(formData);
        } else if (showAsset === "Land") {
          await createLand(formData);
        } else if (showAsset === "Vehicles") {
          await createVehicle(formData);
        } else if (showAsset === "Furniture") {
          await createFurniture(formData);
        } else if (showAsset === "Machinery & Equipment") {
          await createMachinery(formData);
        } else if (showAsset === "Collectibles & Valuables") {
          await createCollectibles(formData);
        } else {
          return;
        }

        console.log("reached router.push");
        router.push("/dashboard")

      } catch (error) {
        console.error("Failed to create asset:", error);
      } finally {
        submissionLoading.current = false;
        setIsSubmitting(false)
      }
    }

  return (
    <div className='px-20 pt-10 pb-20 bg-gray-100 min-h-screen'>
        <div className='bg-white mx-auto max-w-4xl p-10 shadow rounded-lg relative'>
          <div className='mb-3 w-max'>
            <Link href={"/dashboard"} className='text-xs flex items-center hover:underline'>
              <ChevronLeft size={20}/> 
              <span>Back to Dashboard</span>
            </Link>
          </div>
            <div className="">
                {step === 0 && <Add_AssetForm onNext={() => setStep(1)} setData={setAssetData} toStep={setShowAsset}/>}
                  
                {step === 1 && showAsset === "Real Estate" && <RealEstateForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Electronics" && <ElectronicForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Land" && <LandForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Vehicles" && <VehicleForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Furniture" && <FurnitureForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Machinery & Equipment" && <MachineryForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Collectibles & Valuables" && <CollectiblesForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}

                {step === 2 && <MediaForm images={images} setImages={setImages} docs={docs} setDocs={setDocs} onNext={submitAsset} onBack={() => setStep(1)}/>}

                {isSubmitting && <FullScreenLoadingSpinner bg_color='bg-black/50' />}
            </div>
        </div>
    </div>
  )
}

export default page