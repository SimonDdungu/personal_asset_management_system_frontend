"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import LandDetailView from '@/src/views/asset_properties/physical_assets/Land/LandDetailView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const LandDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <LandDetailView id={id}/>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen w-full relative"><FullScreenLoadingSpinner /></div>}>
      <LandDetails />
    </Suspense>
  );
};

export default page