import { ALL_ASSET_QUERY_KEYS } from "@/src/constants/react_query/all_asset_query_keys";
import { QueryClient } from "@tanstack/react-query";


export const invalidateAssetQueries = async (queryClient: QueryClient) => {
  await Promise.all(
    ALL_ASSET_QUERY_KEYS.map((queryKey) =>
      queryClient.invalidateQueries({ queryKey })
    )
  );
};