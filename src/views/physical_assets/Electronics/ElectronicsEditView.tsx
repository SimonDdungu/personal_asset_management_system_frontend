"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout';
import { useGetElectronicAsset, useUpdateElectronicAsset } from '@/src/hooks/asset-properties/physical-assets/electronics/useElectronics';
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation';
import { UpdateElectronicsFormData, updateElectronicsSchema } from '@/src/validation/asset_properties/physical/electronics_Validation';
import ElectronicsEditFields from './components/ElectronicsEditFields';

const ElectronicsEditView = ({id}: {id: string}) => {
    const { data } = useGetElectronicAsset(id);
    const viewPath = `/assets/physical/electronics/${id}`;

    const updateElectronic = useUpdateElectronicAsset();

    const onCategorySubmit = async(values: UpdateAssetFormData & UpdateElectronicsFormData) => {
        try {
        const electronicsData = updateElectronicsSchema.parse(values);

        await updateElectronic.mutateAsync({id, data: electronicsData});

        } catch (error) {
            console.error("Failed to update electronic:", error);
            throw error;
        }
    };


  return (
    <EditViewLayout viewPath={viewPath} assetid={data?.assetId ?? ""} assetName={data?.assetName ?? ""} category={data?.assetCategory ?? "Asset"} onCategorySubmit={onCategorySubmit} initialData={data ? { ...data, name: data.assetName } : undefined}>
        <ElectronicsEditFields />
    </EditViewLayout>
  )
}

export default ElectronicsEditView