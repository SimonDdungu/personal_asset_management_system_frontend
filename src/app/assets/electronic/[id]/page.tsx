"use client"
import ElectronicDetailView from '@/src/views/physical_assets/Electronics/ElectronicDetailView'
import React, { Suspense } from 'react'
import { useParams } from "next/navigation";

const ElectronicDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <ElectronicDetailView id={id}/>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ElectronicDetails />
    </Suspense>
  );
};

export default page