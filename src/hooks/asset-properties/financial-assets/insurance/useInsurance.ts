import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { InsuranceResponse, InsuranceSearchResponse } from "@/src/interfaces/asset_properties/financial/insuranceTypes";
import { InsuranceAssetFilters } from "@/src/interfaces/search_filters/financial/insurance_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.FINANCIAL.INSURANCE;

export const useCreateInsuranceAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<InsuranceResponse>(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["insurance-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Insurance Asset", error);
    },
  });
};

export const useGetInsuranceAssets = (filters?: InsuranceAssetFilters) => {
  return useQuery({
    queryKey: ["insurance-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get<InsuranceSearchResponse[]>(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Insurance Assets", error);
        throw error;
      }
    },
  });
};

export const useGetInsuranceAsset = (id: string) => {
  return useQuery({
    queryKey: ["insurance-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get<InsuranceResponse>(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Insurance Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateInsuranceAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      try {
        const response = await api.patch<InsuranceResponse>(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Insurance Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["insurance-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["insurance-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};