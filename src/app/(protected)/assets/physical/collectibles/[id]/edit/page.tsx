"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import CollectiblesEditView from '@/src/views/physical_assets/Collectibles/CollectiblesEditView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const CollectiblesEditDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <div className='relative h-full'>
      <CollectiblesEditView id={id}/>
    </div>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className='relative h-full w-full'><FullScreenLoadingSpinner /></div>}>
      <CollectiblesEditDetails />
    </Suspense>
  );
};

export default page