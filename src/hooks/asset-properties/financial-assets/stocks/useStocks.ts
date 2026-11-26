import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { StocksSearchResponse, UpdateStocksRequest } from "@/src/interfaces/asset_properties/financial/stocksTypes";
import { PaginatedResponse } from "@/src/interfaces/pagination/pagination-response";
import { StocksAssetFilters } from "@/src/interfaces/search_filters/financial/stocks_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.FINANCIAL.STOCKS;

export const useCreateStocksAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<StocksSearchResponse>(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["stocks-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Stocks Asset", error);
    },
  });
};

export const useGetStocksAssets = (filters?: StocksAssetFilters) => {
  return useQuery({
    queryKey: ["stocks-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get<PaginatedResponse<StocksSearchResponse>>(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Stocks Assets", error);
        throw error;
      }
    },
  });
};

export const useGetStocksAsset = (id: string) => {
  return useQuery({
    queryKey: ["stocks-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get<StocksSearchResponse>(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Stocks Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateStocksAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateStocksRequest }) => {
      try {
        const response = await api.patch<StocksSearchResponse>(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Stocks Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["stocks-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["stocks-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};