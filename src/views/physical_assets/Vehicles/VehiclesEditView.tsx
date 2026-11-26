"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout';
import { useGetVehicleAsset, useUpdateVehicleAsset } from '@/src/hooks/asset-properties/physical-assets/vehicle/useVehicle';
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation';
import { UpdateVehicleFormData, updateVehicleSchema } from '@/src/validation/asset_properties/physical/vehicle_Validation';
import VehicleEditFields from './components/VehicleEditFields';

const VehiclesEditView = ({id}: {id: string}) => {
    const { data } = useGetVehicleAsset(id);
    const viewPath = `/assets/physical/vehicles/${id}`;

    const updateVehicle = useUpdateVehicleAsset();

    const onCategorySubmit = async(values: UpdateAssetFormData & UpdateVehicleFormData) => {
        try {
        const vehicleData = updateVehicleSchema.parse(values);

        await updateVehicle.mutateAsync({id, data: vehicleData});

        } catch (error) {
            console.error("Failed to update vehicle:", error);
            throw error;
        }
    };


  return (
    <EditViewLayout viewPath={viewPath} assetid={data?.assetId ?? ""} assetName={data?.assetName ?? ""} category={data?.assetCategory ?? "Asset"} onCategorySubmit={onCategorySubmit} initialData={data ? { ...data, name: data.assetName } : undefined}>
        <VehicleEditFields />
    </EditViewLayout>
  )
}

export default VehiclesEditView