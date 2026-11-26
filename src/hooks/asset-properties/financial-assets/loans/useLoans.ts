import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { LoansResponse, LoansSearchResponse, UpdateLoansRequest } from "@/src/interfaces/asset_properties/financial/loansTypes";
import { LoansAssetFilters } from "@/src/interfaces/search_filters/financial/loans_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.FINANCIAL.LOANS;

export const useCreateLoansAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<LoansResponse>(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["loans-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Loans Asset", error);
    },
  });
};

export const useGetLoansAssets = (filters?: LoansAssetFilters) => {
  return useQuery({
    queryKey: ["loans-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get<LoansSearchResponse[]>(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Loans Assets", error);
        throw error;
      }
    },
  });
};

export const useGetLoansAsset = (id: string) => {
  return useQuery({
    queryKey: ["loans-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get<LoansResponse>(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Loans Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateLoansAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateLoansRequest }) => {
      try {
        const response = await api.patch<LoansResponse>(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Loans Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["loans-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["loans-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};