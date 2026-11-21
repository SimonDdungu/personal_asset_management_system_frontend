import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logApiError } from "@/src/util/logApiError";
import { API_ENDPOINTS } from "@/src/constants/endpoints/apiEndpoints";
import { signupTypes } from "@/src/interfaces/auth/signUpTypes";
import api from "@/src/lib/api";


export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: signupTypes) => {
      const response = await api.post(API_ENDPOINTS.USERS.CREATE, data);
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },

    onError: (error) => {
      logApiError("Create User: ", error);
    },
  });
};

export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.USERS.ME);
      return response.data.user ?? response.data;
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    enabled
  });
};