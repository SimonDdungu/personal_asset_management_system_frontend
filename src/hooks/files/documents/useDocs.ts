import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/api";
import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { config } from "@/src/config/config";
import { logApiError } from "@/src/util/logApiError";


export const useAddAssetDocs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({uploadId, docs, category_key, itemId} : {uploadId: string, docs: FormData, category_key: string, itemId: string}) => {
      const response = await api.post(`${API_ENDPOINTS.ASSETS.DOCS}/${uploadId}`, docs);
      return response.data;
    },

    onSuccess: (_, { category_key, itemId }) => {
      queryClient.invalidateQueries({ queryKey: [category_key, itemId] });
    },

    onError: (error) => {
      logApiError("Add Docs", error);
    },
  });
};

export const useDeleteDocs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, uploadId, category_key, itemId }: { id: string, uploadId: string, category_key: string, itemId: string }) => {
      try {
        const response = await api.delete(`${API_ENDPOINTS.ASSETS.DOCS}/${uploadId}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Delete Docs: ", error);
        throw error;
      }
    },

    onSuccess: async (_, {category_key, itemId}) => {
      queryClient.invalidateQueries({ queryKey: [category_key, itemId] })
    },
  });
};