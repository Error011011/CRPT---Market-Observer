import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ChartRange } from "../../api/CoinChartService";
import { getCoinChart } from "../../api/CoinChartService";
import type { ChartPoint } from "../../api/CoinChartService";


export const useCoinChart = (id: string, range: ChartRange) => {
    return useQuery<ChartPoint[], Error>({
    queryKey: ['coinChart', id, range],
    queryFn: ({ signal }) => getCoinChart(id, range, signal),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}