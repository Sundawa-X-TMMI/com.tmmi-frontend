import {useQuery} from "@tanstack/react-query";
import DashboardService from "@/features/dashboard/services/dashboard.service.mock";

export const dashboardKeys = {
  data: ["Dashboard", "data"] as const,
};

export function useDashboardData() {
  return useQuery({
    queryKey: dashboardKeys.data,
    queryFn: () => DashboardService.getDashboardData(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}