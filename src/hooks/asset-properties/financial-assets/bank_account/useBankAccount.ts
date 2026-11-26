import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { BankAccountResponse, BankAccountSearchResponse, UpdateBankAccountRequest } from "@/src/interfaces/asset_properties/financial/bankAccountTypes";
import { PaginatedResponse } from "@/src/interfaces/pagination/pagination-response";
import { BankAccountAssetFilters } from "@/src/interfaces/search_filters/financial/bankAccount_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.FINANCIAL.BANK_ACCOUNTS;

export const useCreateBankAccountAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<BankAccountResponse>(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["bank-account-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Bank Account Asset", error);
    },
  });
};

export const useGetBankAccountAssets = (filters?: BankAccountAssetFilters) => {
  return useQuery({
    queryKey: ["bank-account-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get<PaginatedResponse<BankAccountSearchResponse>>(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Bank Account Assets", error);
        throw error;
      }
    },
  });
};

export const useGetBankAccountAsset = (id: string) => {
  return useQuery({
    queryKey: ["bank-account-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get<BankAccountResponse>(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Bank Account Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateBankAccountAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBankAccountRequest }) => {
      try {
        const response = await api.patch<BankAccountResponse>(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Bank Account Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["bank-account-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["bank-account-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};