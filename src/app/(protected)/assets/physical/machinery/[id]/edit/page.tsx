"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import MachineryEditView from '@/src/views/physical_assets/Machinery/MachineryEditView';
import { useParams } from "next/navigation";
import { Suspense } from 'react';

const MachineryEditDetails = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <div className='relative h-full'>
      <MachineryEditView id={id}/>
    </div>
  )
}


const page = () => {
  return (
    <Suspense fallback={<div className='relative h-full w-full'><FullScreenLoadingSpinner /></div>}>
      <MachineryEditDetails />
    </Suspense>
  );
};

export default page