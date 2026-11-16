"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/layout/FullScreenLoadingSpinner';
import RealEstateDetailView from '@/src/views/physical_assets/Real_Estate/RealEstateDetailView';
import RealEstateEditView from '@/src/views/physical_assets/Real_Estate/RealEstateEditView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const RealEstateEditDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <div className='relative h-full'>
      <RealEstateEditView id={id}/>
    </div>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className='relative h-full w-full'><FullScreenLoadingSpinner /></div>}>
      <RealEstateEditDetails />
    </Suspense>
  );
};

export default page