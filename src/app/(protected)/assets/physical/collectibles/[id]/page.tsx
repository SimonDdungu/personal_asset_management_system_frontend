"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import CollectiblesDetailView from '@/src/views/physical_assets/Collectibles/CollectiblesDetailView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const CollectiblesDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <CollectiblesDetailView id={id}/>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen w-full relative"><FullScreenLoadingSpinner /></div>}>
      <CollectiblesDetails />
    </Suspense>
  );
};

export default page