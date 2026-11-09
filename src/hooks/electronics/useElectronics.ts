import { useMutation } from "@tanstack/react-query";
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