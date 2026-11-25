import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { RealEstateAssetFilters } from "@/src/interfaces/search_filters/realEstate_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateRealEstateAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`${API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.REAL_ESTATE}`, data);
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["realestate-asset", data.id], data);
    },

    onError: (error) => {
      logApiError("Create Real Estate Asset", error);
    },
  });
};

export const useGetRealEstateAssets = (filters?: RealEstateAssetFilters) => {
  return useQuery({
     queryKey: ["realestate-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.REAL_ESTATE, {params: {...filters}});
        return response.data;
      } catch (error) {
        logApiError("Get Real Estate Assets", error);
        throw error;
      }
    },
  });
};

export const useGetRealEstateAsset = (id: string) => {
  return useQuery({
    queryKey: ["realestate-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get(`${API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.REAL_ESTATE}/${id}`)
        return response.data;
      } catch (error) {
        logApiError("Get Real Estate Asset", error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

export const useUpdateRealEstateAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      try {
        const response = await api.patch(`${API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.REAL_ESTATE}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Real Estate Asset", error);
        throw error;
      }
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["realestate-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};