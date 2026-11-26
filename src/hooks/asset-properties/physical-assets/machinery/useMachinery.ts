import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { MachineryResponse, MachinerySearchResponse } from "@/src/interfaces/asset_properties/physical/machineryTypes";
import { MachineryAssetFilters } from "@/src/interfaces/search_filters/physical/machinery_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.MACHINERY;

export const useCreateMachineryAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<MachineryResponse>(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["machinery-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Machinery Asset", error);
    },
  });
};

export const useGetMachineryAssets = (filters?: MachineryAssetFilters) => {
  return useQuery({
    queryKey: ["machinery-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get<MachinerySearchResponse[]>(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Machinery Assets", error);
        throw error;
      }
    },
  });
};

export const useGetMachineryAsset = (id: string) => {
  return useQuery({
    queryKey: ["machinery-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get<MachineryResponse>(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Machinery Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateMachineryAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      try {
        const response = await api.patch<MachineryResponse>(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Machinery Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["machinery-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["machinery-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};