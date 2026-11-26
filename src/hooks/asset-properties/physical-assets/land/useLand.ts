import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { LandResponse, LandSearchResponse, UpdateLandRequest } from "@/src/interfaces/asset_properties/physical/landTypes";
import { PaginatedResponse } from "@/src/interfaces/pagination/pagination-response";
import { LandAssetFilters } from "@/src/interfaces/search_filters/physical/land_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.LAND;

export const useCreateLandAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<LandResponse>(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["land-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Land Asset", error);
    },
  });
};

export const useGetLandAssets = (filters?: LandAssetFilters) => {
  return useQuery({
    queryKey: ["land-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get<PaginatedResponse<LandSearchResponse>>(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Land Assets", error);
        throw error;
      }
    },
  });
};

export const useGetLandAsset = (id: string) => {
  return useQuery({
    queryKey: ["land-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get<LandResponse>(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Land Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateLandAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateLandRequest }) => {
      try {
        const response = await api.patch<LandResponse>(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Land Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["land-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["land-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};