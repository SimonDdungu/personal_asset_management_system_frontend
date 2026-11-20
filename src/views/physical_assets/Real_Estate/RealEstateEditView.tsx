"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout';
import { useGetRealEstateAsset, useUpdateRealEstateAsset } from '@/src/hooks/real_estate/useRealEstate';
import { updateRealEstateSchema } from '@/src/validation/asset_properties/realEstate_Validation';
import RealEstateEditFields from './RealEstateEditFields';


interface RealEstateDetailViewProps {
    id: string
}

const RealEstateEditView = ({id}: RealEstateDetailViewProps) => {
    const { data, isLoading, isError, error } = useGetRealEstateAsset(id);
    const viewPath = `/assets/real_estate/${id}`;

    const updateRealEstate = useUpdateRealEstateAsset();

    const onCategorySubmit = async(values: any) => {
        try {
        const realEstateData = updateRealEstateSchema.parse(values);

        await updateRealEstate.mutateAsync({id, data: realEstateData});

        } catch (error) {
            console.error("Failed to update real estate:", error);
            throw error;
        }
    };

  return (
    <EditViewLayout viewPath={viewPath} assetid={data?.assetId} assetName={data?.assetName} category='Real Estate' onCategorySubmit={onCategorySubmit} initialData={data ? { ...data, name: data.assetName } : undefined}>
        <RealEstateEditFields />
    </EditViewLayout>
  )
}

export default RealEstateEditView