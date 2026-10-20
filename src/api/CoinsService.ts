import axios from "axios";
import { axiosClient } from "./axios";


export interface TopCoinsData {
    market_cap_rank: number
    id:string
    name: string
    symbol: string
    image: string
    current_price: number
    total_volume: number
    price_change_percentage_24h_in_currency: number
    price_change_percentage_7d_in_currency:number
    market_cap: number


    
}

interface CoinGeckoCoinsResponse {
    data: TopCoinsData[]
}


export const getTopCoins = async (): Promise<TopCoinsData> => {
    const response = await axiosClient.get<CoinGeckoCoinsResponse>('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&price_change_percentage=24h,7d')
    console.log(response.data);

    return response.data
    
}