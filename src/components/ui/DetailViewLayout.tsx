"use client"
import React, { ReactNode, useState } from 'react'
import { BlueButton, WhiteButton } from '.';
import Footer from './layout/Footer';
import { PencilIcon } from 'lucide-react';

interface DetailViewLayoutProps {
    assetCategory?: string,
     children: ReactNode,
}
const DetailViewLayout = ({assetCategory, children}: DetailViewLayoutProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    
  return (
    <section>
        <div className='box-border px-10 pt-10 pb-20'>
            <div className='mb-5'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl'>{assetCategory ?? "Asset"}</h1>
                    <div className='flex flex-row items-center gap-x-3'>
                        {editMode && <WhiteButton label='Cancel' onClick={() => setEditMode(!editMode)}/>}
                        {editMode ?  <BlueButton label='Save' onClick={() => setEditMode(!editMode)}/> :  <BlueButton label='Edit' onClick={() => setEditMode(!editMode)} icon={PencilIcon}/>}
                    </div>
                </div>
            </div>

            {children}

        </div>

    </section>
  )
}

export default DetailViewLayout