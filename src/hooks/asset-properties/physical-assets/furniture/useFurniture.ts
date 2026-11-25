import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { CreateFurnitureRequest, UpdateFurnitureRequest } from "@/src/interfaces/asset_properties/physical/furnitureTypes";
import { FurnitureAssetFilters } from "@/src/interfaces/search_filters/physical/furniture_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.FURNITURE;

export const useCreateFurnitureAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateFurnitureRequest) => {
      const response = await api.post(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["furniture-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Furniture Asset", error);
    },
  });
};

export const useGetFurnitureAssets = (filters?: FurnitureAssetFilters) => {
  return useQuery({
    queryKey: ["furniture-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Furniture Assets", error);
        throw error;
      }
    },
  });
};

export const useGetFurnitureAsset = (id: string) => {
  return useQuery({
    queryKey: ["furniture-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Furniture Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateFurnitureAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateFurnitureRequest }) => {
      try {
        const response = await api.patch(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Furniture Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["furniture-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["furniture-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};