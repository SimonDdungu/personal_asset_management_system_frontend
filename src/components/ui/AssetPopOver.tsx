import React from 'react'
import { ActionPopover } from './ActionPopOver'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDeleteAsset } from '@/src/hooks/assets/useAssets';

interface AssetPopOverProps {
    basePath: string;
    id: string;
}

const AssetPopOver = ({basePath, id}: AssetPopOverProps) => {
    const router = useRouter();
    const { mutateAsync: deleteAsset, isPending: isDeleting } = useDeleteAsset();
    
    const handleDelete = async (id: string) => {
      try {
        await deleteAsset({ id });
      } catch (error) {
        console.error("Failed to delete asset:", error);
      }
    };

  return (
    <ActionPopover
          options={[
            {
              label: "View",
              icon: <Eye className="h-4 w-4" />,
              className: "text-gray-800",
              onClick: () => router.push(`${basePath}/${id}`),
            },
            {
              label: "Edit",
              icon: <Pencil className="h-4 w-4" />,
              className: "text-blue-800",
              onClick: () => router.push(`${basePath}/${id}/edit`),
            },
            {
              label: isDeleting ? "Deleting" : "Delete",
              icon: <Trash2 className="h-4 w-4" />,
              className: `text-red-600`,
              disabled: isDeleting,
              onClick: () => handleDelete(id),
            },
          ]}
    />
  )
}

export default AssetPopOver