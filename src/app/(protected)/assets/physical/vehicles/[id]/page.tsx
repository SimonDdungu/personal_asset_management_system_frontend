"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import VehiclesDetailView from '@/src/views/physical_assets/Vehicles/VehiclesDetailView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const VehiclesDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <VehiclesDetailView id={id}/>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen w-full relative"><FullScreenLoadingSpinner /></div>}>
      <VehiclesDetails />
    </Suspense>
  );
};

export default page