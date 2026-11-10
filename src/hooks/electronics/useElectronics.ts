import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/src/lib/api";
import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { config } from "@/src/config/config";
import { logApiError } from "@/src/util/logApiError";

export const useCreateElectronicAsset = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`${API_ENDPOINTS.ASSETS.ELECTRONICS}?userId=${config.testing_userId}`, data);
      return response.data;
    },

    onSuccess: (data) => {
      console.log("Asset created successfully:", data);
    },

    onError: (error) => {
      logApiError("Create Electronic Asset", error);
    },
  });
};

export const useGetElectronicAssets = () => {
  return useQuery({
    queryKey: ["electronic-assets"],
    queryFn: async () => {
      try {
        const response = await api.get(`${API_ENDPOINTS.ASSETS.ELECTRONICS}?userId=${config.testing_userId}`);
        return response.data;
      } catch (error) {
        logApiError("Get Electronic Assets", error);
        throw error;
      }
    },
  });
};

export const useGetElectronicAsset = (id: string) => {
  return useQuery({
    queryKey: ["electronic-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get(`${API_ENDPOINTS.ASSETS.ELECTRONICS}/${id}?userId=${config.testing_userId}`)
        return response.data;
      } catch (error) {
        logApiError("Get Electronic Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};