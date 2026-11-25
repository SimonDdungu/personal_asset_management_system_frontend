import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { SavingsAssetFilters } from "@/src/interfaces/search_filters/financial/savings_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.FINANCIAL.SAVINGS;

export const useCreateSavingsAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const response = await api.post(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["savings-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Savings Asset", error);
    },
  });
};

export const useGetSavingsAssets = (filters?: SavingsAssetFilters) => {
  return useQuery({
    queryKey: ["savings-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Savings Assets", error);
        throw error;
      }
    },
  });
};

export const useGetSavingsAsset = (id: string) => {
  return useQuery({
    queryKey: ["savings-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Savings Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateSavingsAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      try {
        const response = await api.patch(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Savings Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["savings-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["savings-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};