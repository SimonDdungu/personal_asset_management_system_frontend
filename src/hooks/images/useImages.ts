import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/api";
import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { config } from "@/src/config/config";
import { logApiError } from "@/src/util/logApiError";

export const usedDeleteImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id,uploadId }: { id: string, uploadId: string }) => {
      try {
        const response = await api.delete(`${API_ENDPOINTS.ASSETS.IMAGES}/${uploadId}/${id}?userId=${config.testing_userId}`);
        return response.data;
      } catch (error) {
        logApiError("Delete Images: ", error);
        throw error;
      }
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-asset"] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-asset"] }),
      ]);
    },
  });
};