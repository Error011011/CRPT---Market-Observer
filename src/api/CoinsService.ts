import { axiosClient } from "./axios";


export interface TopCoinsData {
    market_cap_rank: number
    id:string
    name: string
    symbol: string
    image: string
    current_price: number
    total_volume: number
    price_change_percentage_24h_in_currency: number | null
    price_change_percentage_7d_in_currency:number | null
    market_cap: number
    sparkline_in_7d: {
        price: number[]
    }


    
}


export interface OneCoinData {
    id: string
    symbol: string
    market_cap_rank: number
    name: string
    image: {
        small: string
    }
    description: {
        en: string
    }
    market_data: {
        current_price: {
            usd: number
        }
        market_cap: {
            usd: number
        }
        total_volume: {
            usd: number
        }
        high_24h: {
            usd:number
        }
        low_24h: {
            usd: number
        }
        price_change_percentage_24h: number | null
        price_change_percentage_7d: number | null
        price_change_percentage_30d: number | null
        total_supply: number | null
        circulating_supply: number | null
        max_supply: number | null

    }

}

export interface SearchCoinData {
    id: string
    thumb: string
    name: string
    symbol: string
    market_cap_rank: number | null

}

interface CoinGeckoSearchCoinResponse {
        coins: SearchCoinData[]
}


export const getTopCoins = async (): Promise<TopCoinsData[]> => {
    const response = await axiosClient.get<TopCoinsData[]>('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&price_change_percentage=24h,7d&sparkline=true');
    return response.data
    
}

export const getOneCoin = async (id: string) : Promise<OneCoinData> => {
    const response = await axiosClient.get<OneCoinData>(`/coins/${id}`);
    return response.data
}

export const searchCoins = async (query: string, signal?: AbortSignal) : Promise<SearchCoinData[]> => {
    const {data} = await axiosClient.get<CoinGeckoSearchCoinResponse>('/search', {
        params: {query},
        signal
    })
    return data.coins
}