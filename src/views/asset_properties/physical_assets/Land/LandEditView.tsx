"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout';
import { useGetLandAsset, useUpdateLandAsset } from '@/src/hooks/asset-properties/physical-assets/land/useLand';
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation';
import { UpdateLandFormData, updateLandSchema } from '@/src/validation/asset_properties/physical/land_Validation';
import LandEditFields from './components/LandEditFields';

const LandEditView = ({id}: {id: string}) => {
    const { data } = useGetLandAsset(id);
    const viewPath = `/assets/physical/land/${id}`;

    const updateLand = useUpdateLandAsset();

    const onCategorySubmit = async(values: UpdateAssetFormData & UpdateLandFormData) => {
        try {
        const realEstateData = updateLandSchema.parse(values);

        await updateLand.mutateAsync({id, data: realEstateData});

        } catch (error) {
            console.error("Failed to update land:", error);
            throw error;
        }
    };


  return (
    <EditViewLayout viewPath={viewPath} assetid={data?.assetId ?? ""} assetName={data?.assetName ?? ""} category={data?.assetCategory ?? "Asset"} onCategorySubmit={onCategorySubmit} initialData={data ? { ...data, name: data.assetName } : undefined}>
        <LandEditFields />
    </EditViewLayout>
  )
}

export default LandEditView