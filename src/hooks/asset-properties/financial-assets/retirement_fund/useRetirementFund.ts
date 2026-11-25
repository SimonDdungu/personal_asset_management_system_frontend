import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { CreateRetirementFundRequest, UpdateRetirementFundRequest } from "@/src/interfaces/asset_properties/financial/retirementFundTypes";
import { RetirementFundAssetFilters } from "@/src/interfaces/search_filters/financial/retirementFund_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.FINANCIAL.RETIREMENT_FUND;

export const useCreateRetirementFundAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateRetirementFundRequest) => {
      const response = await api.post(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["retirement-fund-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Retirement Fund Asset", error);
    },
  });
};

export const useGetRetirementFundAssets = (filters?: RetirementFundAssetFilters) => {
  return useQuery({
    queryKey: ["retirement-fund-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Retirement Fund Assets", error);
        throw error;
      }
    },
  });
};

export const useGetRetirementFundAsset = (id: string) => {
  return useQuery({
    queryKey: ["retirement-fund-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Retirement Fund Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateRetirementFundAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateRetirementFundRequest }) => {
      try {
        const response = await api.patch(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Retirement Fund Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["retirement-fund-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["retirement-fund-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};