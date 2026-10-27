import { axiosClient } from "./axios"
import type { UTCTimestamp } from 'lightweight-charts';

interface CoinChartResponse {
    prices: [number, number][]
    market_caps: [number, number][]
    total_volumes: [number, number][]

}

export type ChartPoint =
  | { time: UTCTimestamp; value: number } // 1D
  | { time: string; value: number };      // 'YYYY-MM-DD'

export type ChartRange = '1' | '7' | '30'| '90' | '365'


export const getCoinChart = async (id: string, days: ChartRange, signal?: AbortSignal) : Promise<ChartPoint[]> => {
    const {data} = await axiosClient.get<CoinChartResponse>(`/coins/${id}/market_chart`, {params: {vs_currency: 'usd', days}, signal});

    // // 1 day
    // if(days === '1') {
    //     return data.prices.map(([ts, price]) => ({
    //         time: Math.floor(ts/1000) as UTCTimestamp,
    //         value: price
    //     }))
    // }

    // // > 1 day
    // return data.prices.map(([ts, price]) => ({
    //     time: new Date(ts).toISOString().split('T')[0],
    //     value: price
    // }))
    return data.prices.map(([ts, price]) => ({
        time: Math.floor(ts / 1000) as UTCTimestamp,
        value: price,
    }));
}   