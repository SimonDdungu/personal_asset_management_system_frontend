import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/src/lib/api";
import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { config } from "@/src/config/config";
import { logApiError } from "@/src/util/logApiError";
import { RealEstateAssetFilters } from "@/src/interfaces/search_filters/realEstate_SearchFilters";

export const useCreateRealEstateAsset = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`${API_ENDPOINTS.ASSETS.REAL_ESTATE}?userId=${config.testing_userId}`, data);
      return response.data;
    },

    onSuccess: (data) => {
      console.log("Asset created successfully:", data);
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
        const response = await api.get(API_ENDPOINTS.ASSETS.REAL_ESTATE, {params: { userId: config.testing_userId, ...filters}});
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
        const response = await api.get(`${API_ENDPOINTS.ASSETS.REAL_ESTATE}/${id}?userId=${config.testing_userId}`)
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