import { config } from "@/src/config/config";
import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { AssetFilters } from "@/src/interfaces/search_filters/assets_SearchFilters";
import api from "@/src/lib/api";
import { logApiError } from "@/src/util/logApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAssets = (filters?: AssetFilters) => {
  return useQuery({
     queryKey: ["all_assets", filters],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.BASE, {params: {...filters}});
        return response.data;
      } catch (error) {
        logApiError("Get Assets", error);
        throw error;
      }
    },
  });
};

export const useAsset = (id: string) => {
  return useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      try {
        const response = await api.get(`${API_ENDPOINTS.ASSETS.BASE}/${id}`)
        return response.data;
      } catch (error) {
        logApiError("Get Asset", error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      try {
        const response = await api.patch(`${API_ENDPOINTS.ASSETS.BASE}/${id}`, data);
        return response.data;
      } catch (error) {
        logApiError("Update Asset", error);
        throw error;
      }
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-asset"] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-asset"] }),
      ]);
    },
  });
};

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      try {
        const response = await api.delete(`${API_ENDPOINTS.ASSETS.BASE}/${id}`);
        return response.data;
      } catch (error) {
        logApiError("Delete Asset: ", error);
        throw error;
      }
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["asset", variables.id] }),
        queryClient.invalidateQueries({ queryKey: ["all_assets"] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["realestate-asset"] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-assets"] }),
        queryClient.invalidateQueries({ queryKey: ["electronic-asset"] }),
      ]);
    },
  });
};


// count 
export const useGetTotalAssetCount = () => {
  return useQuery({
    queryKey: ["total_asset_count"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.TOTAL_COUNT)
        return response.data;
      } catch (error) {
        logApiError("Get total asset count", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

export const useGetTotalPhysicalAssetCount = () => {
  return useQuery({
    queryKey: ["total_physical_asset_count"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.TOTAL_PHYSICAL_COUNT)
        return response.data;
      } catch (error) {
        logApiError("Get total physical asset count", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

export const useGetTotalFinancialAssetCount = () => {
  return useQuery({
    queryKey: ["total_financial_asset_count"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.TOTAL_FINANCIAL_COUNT)
        return response.data;
      } catch (error) {
        logApiError("Get total financial asset count", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

// categories
export const useGetTopAssetCategories = () => {
  return useQuery({
    queryKey: ["top_asset_categories"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.TOP_CATEGORIES)
        return response.data;
      } catch (error) {
        logApiError("Get total asset count", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};


export const useGetPhysicalTopAssetCategories = () => {
  return useQuery({
    queryKey: ["top_physical_asset_categories"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.TOP_PHYSICAL_CATEGORIES)
        return response.data;
      } catch (error) {
        logApiError("Get top physical asset categories", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};


export const useGetFinancialTopAssetCategories = () => {
  return useQuery({
    queryKey: ["top_financial_asset_categories"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.TOP_FINANCIAL_CATEGORIES)
        return response.data;
      } catch (error) {
        logApiError("Get top financial asset categories", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

// categories count
export const useGetAssetCategoryCount = () => {
  return useQuery({
    queryKey: ["category_count"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.CATEGORIES_COUNT)
        return response.data;
      } catch (error) {
        logApiError("Get category count", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

export const useGetPhysicalCategoryCount = () => {
  return useQuery({
    queryKey: ["physical_category_count"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.PHYSICAL_CATEGORIES_COUNT)
        return response.data;
      } catch (error) {
        logApiError("Get physical category count", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

export const useGetFinancialCategoryCount = () => {
  return useQuery({
    queryKey: ["financial_category_count"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.FINANCIAL_CATEGORIES_COUNT)
        return response.data;
      } catch (error) {
        logApiError("Get financial category count", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};




// largest
export const useGetLargestAssets = () => {
  return useQuery({
    queryKey: ["total_largest_assets"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.LARGEST)
        return response.data;
      } catch (error) {
        logApiError("Get largest assets", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

export const useGetPhysicalLargestAssets = () => {
  return useQuery({
    queryKey: ["total_physical_largest_assets"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.PHYSICAL_LARGEST)
        return response.data;
      } catch (error) {
        logApiError("Get physical largest assets", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};

export const useGetFinancialLargestAssets = () => {
  return useQuery({
    queryKey: ["total_financial_largest_assets"],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.ASSETS.FINANCIAL_LARGEST)
        return response.data;
      } catch (error) {
        logApiError("Get financial largest assets", error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000, 
  });
};
