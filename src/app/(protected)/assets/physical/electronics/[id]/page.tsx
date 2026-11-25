"use client"
import ElectronicDetailView from '@/src/views/physical_assets/Electronics/ElectronicDetailView'
import React, { Suspense } from 'react'
import { useParams } from "next/navigation";
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';

const ElectronicDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <ElectronicDetailView id={id}/>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen w-full relative"><FullScreenLoadingSpinner /></div>}>
      <ElectronicDetails />
    </Suspense>
  );
};

export default page