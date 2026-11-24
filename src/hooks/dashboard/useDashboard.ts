import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useQuery } from "@tanstack/react-query";

export const useGetTotalNetworth = () => {
  return useQuery({
    queryKey: ["total_networth"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.METRICS.TOTAL_NETWORTH)
        return response.data;
      } catch (error) {
        logApiError("Get total networth", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

export const useGetTotalPhysicalAssetValue = () => {
  return useQuery({
    queryKey: ["total_physical_value"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.METRICS.TOTAL_PHYSICAL_VALUE)
        return response.data;
      } catch (error) {
        logApiError("Get total physical asset value", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};


export const useGetTotalFinancialAssetValue = () => {
  return useQuery({
    queryKey: ["total_financial_value"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.METRICS.TOTAL_FINANCIAL_VALUE)
        return response.data;
      } catch (error) {
        logApiError("Get total financial asset value", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};