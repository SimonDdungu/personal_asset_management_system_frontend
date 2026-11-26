"use client"

import { useParams } from "next/navigation";
import { Suspense } from 'react';
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import RealEstateDetailView from "@/src/views/physical_assets/Real_Estate/RealEstateDetailView";

const RealEstateDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <RealEstateDetailView id={id}/>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen w-full relative"><FullScreenLoadingSpinner /></div>}>
      <RealEstateDetails />
    </Suspense>
  );
};

export default page