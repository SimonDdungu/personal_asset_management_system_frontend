import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { InvestmentResponse, InvestmentSearchResponse, UpdateInvestmentRequest } from "@/src/interfaces/asset_properties/financial/investmentTypes";
import { PaginatedResponse } from "@/src/interfaces/pagination/pagination-response";
import { InvestmentAssetFilters } from "@/src/interfaces/search_filters/financial/investment_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.FINANCIAL.INVESTMENT;

export const useCreateInvestmentAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<InvestmentResponse>(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["investment-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Investment Asset", error);
    },
  });
};

export const useGetInvestmentAssets = (filters?: InvestmentAssetFilters) => {
  return useQuery({
    queryKey: ["investment-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get<PaginatedResponse<InvestmentSearchResponse>>(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Investment Assets", error);
        throw error;
      }
    },
  });
};

export const useGetInvestmentAsset = (id: string) => {
  return useQuery({
    queryKey: ["investment-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get<InvestmentResponse>(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Investment Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateInvestmentAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateInvestmentRequest }) => {
      try {
        const response = await api.patch<InvestmentResponse>(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Investment Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["investment-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["investment-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};