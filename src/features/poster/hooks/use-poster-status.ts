import { getPosterStatus } from "@/features/poster/api/poster";
import { RequestPosterStatus, ResponsePosterStatus } from "@/features/poster/model";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const usePosterStatus = (
  payload: RequestPosterStatus,
  options: Omit<UseQueryOptions<ResponsePosterStatus, Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["posterStatus", payload.posterId],
    queryFn: () => getPosterStatus(payload),
    enabled: !!payload.posterId,
    ...options
  });
};
