"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout';
import { useGetCollectiblesValuablesAsset, useUpdateCollectiblesValuablesAsset } from '@/src/hooks/asset-properties/physical-assets/collectibles_valuables/useCollectiblesValuables';
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation';
import { UpdateCollectiblesValuablesFormData, updateCollectiblesValuablesSchema } from '@/src/validation/asset_properties/physical/collectiblesValuables_Validation';
import CollectiblesEditFields from './components/CollectiblesEditFields';

const CollectiblesEditView = ({id}: {id: string}) => {
const { data } = useGetCollectiblesValuablesAsset(id);
    const viewPath = `/assets/physical/collectibles/${id}`;

    const updateCollectibles = useUpdateCollectiblesValuablesAsset();

    const onCategorySubmit = async(values: UpdateAssetFormData & UpdateCollectiblesValuablesFormData) => {
        try {
        const collectiblesData = updateCollectiblesValuablesSchema.parse(values);

        await updateCollectibles.mutateAsync({id, data: collectiblesData});

        } catch (error) {
            console.error("Failed to update collectibles:", error);
            throw error;
        }
    };


  return (
    <EditViewLayout viewPath={viewPath} assetid={data?.assetId ?? ""} assetName={data?.assetName ?? ""} category={data?.assetCategory ?? "Asset"} onCategorySubmit={onCategorySubmit} initialData={data ? { ...data, name: data.assetName } : undefined}>
        <CollectiblesEditFields />
    </EditViewLayout>
  )
}

export default CollectiblesEditView