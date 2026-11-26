"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import MachineryDetailView from '@/src/views/asset_properties/physical_assets/Machinery/MachineryDetailView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const MachineryDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <MachineryDetailView id={id}/>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen w-full relative"><FullScreenLoadingSpinner /></div>}>
      <MachineryDetails />
    </Suspense>
  );
};

export default page