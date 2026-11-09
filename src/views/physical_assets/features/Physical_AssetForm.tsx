"use client"
import React, { useState } from 'react'
import Add_AssetForm from './Add_AssetForm'
import ElectronicForm from './ElectronicForm'
import MediaForm from './MediaForm'

const Physical_AssetForm = () => {
    const [step, setStep] = useState<string>("assets")
    const [assetData, setAssetData] = useState<any>({});

  function NextStep(next: string, data?: any) {
    if (data) {
      setAssetData((prev: any) => ({
        ...prev,
        ...data,
      }));
    }

    setStep(next);
  }

  return (
    <div className='max-w-3xl mx-auto'>
        <h1>Add Asset</h1>
        <div>
            {step === "assets" && <Add_AssetForm onNext={(data) => NextStep("electronic_form", data)}/>}
            {step === "electronic_form" && <ElectronicForm onNext={(data) => NextStep("media_form", data)}/>}
            {step === "media_form" && <MediaForm assetData={assetData}/>}
        </div>
    </div>
  )
}

export default Physical_AssetForm