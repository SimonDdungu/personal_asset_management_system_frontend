import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { CreateVehicleRequest, UpdateVehicleRequest } from "@/src/interfaces/asset_properties/physical/vehicleTypes";
import { VehicleAssetFilters } from "@/src/interfaces/search_filters/physical/vehicle_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = API_ENDPOINTS.ASSETS.PROPERTIES.PHYSICAL.VEHICLES;

export const useCreateVehicleAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateVehicleRequest) => {
      const response = await api.post(endpoint, data);
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
        const response = await api.get(endpoint, { params: { ...filters } });
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
        const response = await api.get(`${endpoint}/${id}`);
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
        const response = await api.patch(`${endpoint}/${id}`, data);
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