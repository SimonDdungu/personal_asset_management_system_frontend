"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout';
import { useGetRealEstateAsset, useUpdateRealEstateAsset } from '@/src/hooks/asset-properties/physical-assets/real_estate/useRealEstate';
import RealEstateEditFields from './components/RealEstateEditFields';
import { UpdateRealEstateFormData, updateRealEstateSchema } from '@/src/validation/asset_properties/physical/realEstate_Validation';
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation';

const RealEstateEditView = ({id}: {id: string}) => {
    const { data } = useGetRealEstateAsset(id);
    const viewPath = `/assets/physical/real-estate/${id}`;

    const updateRealEstate = useUpdateRealEstateAsset();

    const onCategorySubmit = async(values: UpdateAssetFormData & UpdateRealEstateFormData) => {
        try {
        const realEstateData = updateRealEstateSchema.parse(values);

        await updateRealEstate.mutateAsync({id, data: realEstateData});

        } catch (error) {
            console.error("Failed to update real estate:", error);
            throw error;
        }
    };


  return (
    <EditViewLayout viewPath={viewPath} assetid={data?.assetId ?? ""} assetName={data?.assetName ?? ""} category={data?.assetCategory ?? "Asset"} onCategorySubmit={onCategorySubmit} initialData={data ? { ...data, name: data.assetName } : undefined}>
        <RealEstateEditFields />
    </EditViewLayout>
  )
}

export default RealEstateEditView