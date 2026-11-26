import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { ElectronicSearchResponse, ElectronicsResponse, UpdateElectronicsRequest } from "@/src/interfaces/asset_properties/physical/electronicsTypes";
import { PaginatedResponse } from "@/src/interfaces/pagination/pagination-response";
import { ElectronicsAssetFilters } from "@/src/interfaces/search_filters/physical/electronics_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateElectronicAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<ElectronicsResponse>(`${API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.ELECTRONICS}`, data);
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["electronic-asset", data.id], data);
    },

    onError: (error) => {
      logApiError("Create Electronic Asset", error);
    },
  });
};

export const useGetElectronicAssets = (filters?: ElectronicsAssetFilters) => {
  return useQuery({
    queryKey: ["electronic-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get<PaginatedResponse<ElectronicSearchResponse>>(`${API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.ELECTRONICS}`, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Electronic Assets", error);
        throw error;
      }
    },
  });
};

export const useGetElectronicAsset = (id: string) => {
  return useQuery({
    queryKey: ["electronic-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get<ElectronicsResponse>(`${API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.ELECTRONICS}/${id}`)
        return response.data;
      } catch (error) {
        logApiError("Get Electronic Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateElectronicAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateElectronicsRequest }) => {
      try {
        const response = await api.patch<ElectronicsResponse>(`${API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.ELECTRONICS}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Electronic Asset", error);
        throw error;
      }
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["electronic-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};