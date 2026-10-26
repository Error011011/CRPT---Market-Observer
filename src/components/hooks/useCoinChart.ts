import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ChartRange } from "../../api/CoinChartService";


export const useCoinChart = (id: string, range: ChartRange) {
    return useQuery<ChartPoint[], Error>({
    queryKey: ['coinChart', coinId, range],
    queryFn: ({ signal }) => getCoinChart(coinId, range, signal),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}