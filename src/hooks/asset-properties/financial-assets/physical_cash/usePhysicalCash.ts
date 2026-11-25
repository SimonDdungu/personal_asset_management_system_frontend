import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { CreatePhysicalCashRequest } from "@/src/interfaces/asset_properties/financial/physicalCashTypes";
import { PhysicalCashAssetFilters } from "@/src/interfaces/search_filters/financial/physicalCash_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.FINANCIAL.CASH;

export const useCreatePhysicalCashAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreatePhysicalCashRequest) => {
      const response = await api.post(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["physical-cash-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Physical Cash Asset", error);
    },
  });
};

export const useGetPhysicalCashAssets = (filters?: PhysicalCashAssetFilters) => {
  return useQuery({
    queryKey: ["physical-cash-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Physical Cash Assets", error);
        throw error;
      }
    },
  });
};

export const useGetPhysicalCashAsset = (id: string) => {
  return useQuery({
    queryKey: ["physical-cash-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Physical Cash Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdatePhysicalCashAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Record<string, never> }) => {
      try {
        const response = await api.patch(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Physical Cash Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["physical-cash-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["physical-cash-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};