import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { CollectiblesValuablesResponse, CollectiblesValuablesSearchResponse } from "@/src/interfaces/asset_properties/physical/collectiblesValuablesTypes";
import { CollectiblesValuablesAssetFilters } from "@/src/interfaces/search_filters/physical/collectiblesValuables_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.COLLECTIABLES;

export const useCreateCollectiblesValuablesAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<CollectiblesValuablesResponse>(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["collectibles-valuables-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Collectibles Valuables Asset", error);
    },
  });
};

export const useGetCollectiblesValuablesAssets = (filters?: CollectiblesValuablesAssetFilters) => {
  return useQuery({
    queryKey: ["collectibles-valuables-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get<CollectiblesValuablesSearchResponse[]>(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Collectibles Valuables Assets", error);
        throw error;
      }
    },
  });
};

export const useGetCollectiblesValuablesAsset = (id: string) => {
  return useQuery({
    queryKey: ["collectibles-valuables-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get<CollectiblesValuablesResponse>(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Collectibles Valuables Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateCollectiblesValuablesAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      try {
        const response = await api.patch<CollectiblesValuablesResponse>(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Collectibles Valuables Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["collectibles-valuables-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["collectibles-valuables-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};