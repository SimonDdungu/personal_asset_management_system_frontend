"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import VehiclesEditView from '@/src/views/physical_assets/Vehicles/VehiclesEditView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const VehiclesEditDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <div className='relative h-full'>
      <VehiclesEditView id={id}/>
    </div>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className='relative h-full w-full'><FullScreenLoadingSpinner /></div>}>
      <VehiclesEditDetails />
    </Suspense>
  );
};

export default page