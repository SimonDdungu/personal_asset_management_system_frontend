"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import LandEditView from '@/src/views/physical_assets/Land/LandEditView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const LandEditDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <div className='relative h-full'>
      <LandEditView id={id}/>
    </div>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className='relative h-full w-full'><FullScreenLoadingSpinner /></div>}>
      <LandEditDetails />
    </Suspense>
  );
};

export default page