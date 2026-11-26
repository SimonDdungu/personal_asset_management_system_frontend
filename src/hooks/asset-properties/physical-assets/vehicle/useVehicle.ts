import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { UpdateVehicleRequest, VehicleResponse, VehicleSearchResponse } from "@/src/interfaces/asset_properties/physical/vehicleTypes";
import { PaginatedResponse } from "@/src/interfaces/pagination/pagination-response";
import { VehicleAssetFilters } from "@/src/interfaces/search_filters/physical/vehicle_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.VEHICLES;

export const useCreateVehicleAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<VehicleResponse>(endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["vehicle-asset", data.id], data);
    },
    onError: (error) => {
      logApiError("Create Vehicle Asset", error);
    },
  });
};

export const useGetVehicleAssets = (filters?: VehicleAssetFilters) => {
  return useQuery({
    queryKey: ["vehicle-assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get<PaginatedResponse<VehicleSearchResponse>>(endpoint, { params: { ...filters } });
        return response.data;
      } catch (error) {
        logApiError("Get Vehicle Assets", error);
        throw error;
      }
    },
  });
};

export const useGetVehicleAsset = (id: string) => {
  return useQuery({
    queryKey: ["vehicle-asset", id],
    queryFn: async () => {
      try {
        const response = await api.get<VehicleResponse>(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Get Vehicle Asset", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useUpdateVehicleAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateVehicleRequest }) => {
      try {
        const response = await api.patch<VehicleResponse>(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Vehicle Asset", error);
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["vehicle-asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["vehicle-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
      ]);
    },
  });
};