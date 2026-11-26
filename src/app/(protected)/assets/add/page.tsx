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
import { useCreateBankAccountAsset } from '@/src/hooks/asset-properties/financial-assets/bank_account/useBankAccount';
import { useCreateInsuranceAsset } from '@/src/hooks/asset-properties/financial-assets/insurance/useInsurance';
import { useCreateInvestmentAsset } from '@/src/hooks/asset-properties/financial-assets/investment/useInvestment';
import { useCreateLiabilityAsset } from '@/src/hooks/asset-properties/financial-assets/liability/useLiability';
import { useCreateLoansAsset } from '@/src/hooks/asset-properties/financial-assets/loans/useLoans';
import { useCreatePhysicalCashAsset } from '@/src/hooks/asset-properties/financial-assets/physical_cash/usePhysicalCash';
import { useCreateRetirementFundAsset } from '@/src/hooks/asset-properties/financial-assets/retirement_fund/useRetirementFund';
import { useCreateSavingsAsset } from '@/src/hooks/asset-properties/financial-assets/savings/useSavings';
import { useCreateStocksAsset } from '@/src/hooks/asset-properties/financial-assets/stocks/useStocks';
import BankAccountForm from '@/src/views/dashboard/components/add-forms/financial/BankAccountForm';
import CashForm from '@/src/views/dashboard/components/add-forms/financial/CashForm';
import InsuranceForm from '@/src/views/dashboard/components/add-forms/financial/InsuranceForm';
import InvestmentForm from '@/src/views/dashboard/components/add-forms/financial/InvestmentForm';
import LiabilityForm from '@/src/views/dashboard/components/add-forms/financial/LiabilityForm';
import LoansForm from '@/src/views/dashboard/components/add-forms/financial/LoansForm';
import RetirementFundForm from '@/src/views/dashboard/components/add-forms/financial/RetirementFundForm';
import SavingsForm from '@/src/views/dashboard/components/add-forms/financial/SavingsForm';
import StocksForm from '@/src/views/dashboard/components/add-forms/financial/StocksForm';

const AddAssetPage = () => {
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
    const { mutateAsync: createVehicle } = useCreateVehicleAsset();
    const { mutateAsync: createCollectibles } = useCreateCollectiblesValuablesAsset();
    const { mutateAsync: createFurniture } = useCreateFurnitureAsset();
    const { mutateAsync: createMachinery } = useCreateMachineryAsset();
    const { mutateAsync: createLand } = useCreateLandAsset();
    const { mutateAsync: createBankAccount } = useCreateBankAccountAsset();
    const { mutateAsync: createCash } = useCreatePhysicalCashAsset();
    const { mutateAsync: createInsurance } = useCreateInsuranceAsset();
    const { mutateAsync: createInvestment } = useCreateInvestmentAsset();
    const { mutateAsync: createLiability } = useCreateLiabilityAsset();
    const { mutateAsync: createLoans } = useCreateLoansAsset();
    const { mutateAsync: createRetirementFund } = useCreateRetirementFundAsset();
    const { mutateAsync: createSavings } = useCreateSavingsAsset();
    const { mutateAsync: createStocks } = useCreateStocksAsset();

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
        } else if (showAsset === "Bank Accounts") {
          await createBankAccount(formData);
        } else if (showAsset === "Cash") {
          await createCash(formData);
        } else if (showAsset === "Insurance Policies") {
          await createInsurance(formData);
        } else if (showAsset === "Investments") {
          await createInvestment(formData);
        } else if (showAsset === "Liabilities") {
          await createLiability(formData);
        } else if (showAsset === "Loans") {
          await createLoans(formData);
        } else if (showAsset === "Retirement Funds") {
          await createRetirementFund(formData);
        } else if (showAsset === "Savings") {
          await createSavings(formData);
        } else if (showAsset === "Stocks") {
          await createStocks(formData);
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
        <div className='bg-white mx-auto max-w-4xl min-h-158 p-10 shadow rounded-lg relative'>
          <div className='mb-3 w-max'>
            <Link href={"/dashboard"} className='text-xs flex items-center hover:underline'>
              <ChevronLeft size={20}/> 
              <span>Back to Dashboard</span>
            </Link>
          </div>
            <div>
                {step === 0 && <Add_AssetForm onNext={() => setStep(1)} setData={setAssetData} toStep={setShowAsset}/>}
                  
                {step === 1 && showAsset === "Real Estate" && <RealEstateForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Electronics" && <ElectronicForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Land" && <LandForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Vehicles" && <VehicleForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Furniture" && <FurnitureForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Machinery & Equipment" && <MachineryForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Collectibles & Valuables" && <CollectiblesForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Bank Accounts" && <BankAccountForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Cash" && <CashForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Insurance Policies" && <InsuranceForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Investments" && <InvestmentForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Liabilities" && <LiabilityForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Loans" && <LoansForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Retirement Funds" && <RetirementFundForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Savings" && <SavingsForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}
                {step === 1 && showAsset === "Stocks" && <StocksForm onNext={() => setStep(2)} onBack={() => setStep(0)} setData={setAssetProperties}/>}

                {step === 2 && <MediaForm images={images} setImages={setImages} docs={docs} setDocs={setDocs} onNext={submitAsset} onBack={() => setStep(1)}/>}

                {isSubmitting && <FullScreenLoadingSpinner bg_color='bg-black/50' />}
            </div>
        </div>
    </div>
  )
}

export default AddAssetPage