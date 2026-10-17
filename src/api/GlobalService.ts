import axios from "axios";
import { axiosClient } from "./axios";

export interface GlobalMarketData {
    total_market_cap: {
        usd: number
    },
    total_volume: {
        usd: number
    },
    market_cap_percentage: {
        btc: number,
        eth: number
    },
    active_cryptocurrencies: number
}

interface CoinGeckoGlobalResponse {
    data: GlobalMarketData
}

export const getGlobalMarketData = async () : Promise<GlobalMarketData> => {
    const response = await axiosClient.get<CoinGeckoGlobalResponse>('/global')
    console.log(response.data.data)

    return response.data.data
}