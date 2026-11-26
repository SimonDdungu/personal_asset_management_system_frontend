"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout';
import { useGetFurnitureAsset, useUpdateFurnitureAsset } from '@/src/hooks/asset-properties/physical-assets/furniture/useFurniture';
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation';
import { UpdateFurnitureFormData, updateFurnitureSchema } from '@/src/validation/asset_properties/physical/furniture_Validation';
import FurnitureEditFields from './components/FurnitureEditFields';

const FurnitureEditView = ({id}: {id: string}) => {
    const { data } = useGetFurnitureAsset(id);
    const viewPath = `/assets/physical/furniture/${id}`;

    const updateFurniture = useUpdateFurnitureAsset();

    const onCategorySubmit = async(values: UpdateAssetFormData & UpdateFurnitureFormData) => {
        try {
        const furnitureData = updateFurnitureSchema.parse(values);

        await updateFurniture.mutateAsync({id, data: furnitureData});

        } catch (error) {
            console.error("Failed to update furniture:", error);
            throw error;
        }
    };


  return (
    <EditViewLayout viewPath={viewPath} assetid={data?.assetId ?? ""} assetName={data?.assetName ?? ""} category={data?.assetCategory ?? "Asset"} onCategorySubmit={onCategorySubmit} initialData={data ? { ...data, name: data.assetName } : undefined}>
        <FurnitureEditFields />
    </EditViewLayout>
  )
}

export default FurnitureEditView