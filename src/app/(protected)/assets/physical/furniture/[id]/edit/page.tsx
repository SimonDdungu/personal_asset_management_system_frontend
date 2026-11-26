"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import FurnitureEditView from '@/src/views/physical_assets/Furniture/FurnitureEditView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const FurnitureEditDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <div className='relative h-full'>
      <FurnitureEditView id={id}/>
    </div>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className='relative h-full w-full'><FullScreenLoadingSpinner /></div>}>
      <FurnitureEditDetails />
    </Suspense>
  );
};

export default page