import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { LiabilityAssetFilters } from "@/src/interfaces/search_filters/financial/liability_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.FINANCIAL.LIABILITY;

export const useCreateLiabilityAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const response = await api.post(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["liability-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Liability Asset", error);
    },
  });
};

export const useGetLiabilityAssets = (filters?: LiabilityAssetFilters) => {
  return useQuery({
    queryKey: ["liability-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Liability Assets", error);
        throw error;
      }
    },
  });
};

export const useGetLiabilityAsset = (id: string) => {
  return useQuery({
    queryKey: ["liability-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Liability Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateLiabilityAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      try {
        const response = await api.patch(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Liability Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["liability-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["liability-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};