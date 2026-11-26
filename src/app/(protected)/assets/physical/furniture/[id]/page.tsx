"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import FurnitureDetailView from '@/src/views/asset_properties/physical_assets/Furniture/FurnitureDetailView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const FurnitureDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <FurnitureDetailView id={id}/>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen w-full relative"><FullScreenLoadingSpinner /></div>}>
      <FurnitureDetails />
    </Suspense>
  );
};

export default page