"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout';
import { useGetMachineryAsset, useUpdateMachineryAsset } from '@/src/hooks/asset-properties/physical-assets/machinery/useMachinery';
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation';
import { UpdateMachineryFormData, updateMachinerySchema } from '@/src/validation/asset_properties/physical/machinery_Validation';
import MachineryEditFields from './components/MachineryEditFields';

const MachineryEditView = ({id}: {id: string}) => {
    const { data } = useGetMachineryAsset(id);
    const viewPath = `/assets/physical/machinery/${id}`;

    const updateMachinery = useUpdateMachineryAsset();

    const onCategorySubmit = async(values: UpdateAssetFormData & UpdateMachineryFormData) => {
        try {
        const machineryData = updateMachinerySchema.parse(values);

        await updateMachinery.mutateAsync({id, data: machineryData});

        } catch (error) {
            console.error("Failed to update machinery:", error);
            throw error;
        }
    };


  return (
    <EditViewLayout viewPath={viewPath} assetid={data?.assetId ?? ""} assetName={data?.assetName ?? ""} category={data?.assetCategory ?? "Asset"} onCategorySubmit={onCategorySubmit} initialData={data ? { ...data, name: data.assetName } : undefined}>
        <MachineryEditFields />
    </EditViewLayout>
  )
}

export default MachineryEditView