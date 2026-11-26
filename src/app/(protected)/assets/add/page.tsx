"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import { useCreateElectronicAsset } from '@/src/hooks/asset-properties/physical-assets/electronics/useElectronics';
import { useCreateRealEstateAsset } from '@/src/hooks/asset-properties/physical-assets/real_estate/useRealEstate';
import { CreateAssetsRequest } from '@/src/interfaces/asset_properties/assetTypes';
import Add_AssetForm from '@/src/views/dashboard/components/Add_AssetForm';
import ElectronicForm from '@/src/views/dashboard/components/add-forms/ElectronicForm';
import MediaForm from '@/src/views/dashboard/components/MediaForm';
import RealEstateForm from '@/src/views/dashboard/components/add-forms/RealEstateForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const page = () => {
    const router = useRouter();

    const [step, setStep] = useState(0);
    const [assetData, setAssetData] = useState<CreateAssetsRequest | null>(null);
    const [showAsset, setShowAsset] = useState<string>("")
    const [assetProperties, setAssetProperties] = useState({})
    const [images, setImages] = useState<File[]>([]);
    const [docs, setDocs] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    
    const { mutateAsync: createRealEstate } = useCreateRealEstateAsset();
    const { mutateAsync: createElectronic } = useCreateElectronicAsset();

    const submissionLoading = useRef<boolean>(false);

    async function submitAsset() {
      if (submissionLoading.current) return;

      submissionLoading.current = true;

      setIsSubmitting(true)

      if (!assetData) return;
      
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
        }

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
                {step === 1 && showAsset === "Real estate" && <RealEstateForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Electronics" && <ElectronicForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 2 && <MediaForm images={images} setImages={setImages} docs={docs} setDocs={setDocs} onNext={submitAsset} onBack={() => setStep(1)}/>}

                {isSubmitting && <FullScreenLoadingSpinner bg_color='bg-black/50' />}
            </div>
        </div>
    </div>
  )
}

export default page