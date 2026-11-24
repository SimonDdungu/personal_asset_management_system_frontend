import { config } from "@/src/config/config";
import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { AssetFilters } from "@/src/interfaces/search_filters/assets_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAssets = (filters?: AssetFilters) => {
  return useQuery({
     queryKey: ["all_assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.BASE, {params: {...filters}});
        return response.data;
      } catch (error) {
        logApiError("Get Assets", error);
        throw error;
      }
    },
  });
};

export const useAsset = (id: string) => {
  return useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      try {
        const response = await api.get(`${API_ENDPOINTS.ASSETS.BASE}/${id}`)
        return response.data;
      } catch (error) {
        logApiError("Get Asset", error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      try {
        const response = await api.patch(`${API_ENDPOINTS.ASSETS.BASE}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Asset", error);
        throw error;
      }
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-asset"] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-asset"] }),
      ]);
    },
  });
};

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      try {
        const response = await api.delete(`${API_ENDPOINTS.ASSETS.BASE}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Delete Asset: ", error);
        throw error;
      }
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-asset"] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-asset"] }),
      ]);
    },
  });
};