"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import ElectronicsEditView from '@/src/views/physical_assets/Electronics/ElectronicsEditView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const ElectronicsEditDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <div className='relative h-full'>
      <ElectronicsEditView id={id}/>
    </div>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className='relative h-full w-full'><FullScreenLoadingSpinner /></div>}>
      <ElectronicsEditDetails />
    </Suspense>
  );
};

export default page