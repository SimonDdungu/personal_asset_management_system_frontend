"use client"
import RealEstateDetailView from '@/src/views/physical_assets/Real_Estate/RealEstateDetailView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const RealEstateDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <RealEstateDetailView id={id}/>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RealEstateDetails />
    </Suspense>
  );
};

export default page