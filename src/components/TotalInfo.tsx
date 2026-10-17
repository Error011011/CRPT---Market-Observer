import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getGlobalMarketData } from '../api/GlobalService'
import { formatMoney } from './utils/moneyHelper'
import StatItem from './StatItem'

const TotalInfo = () => {

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['globalMarketData'],
        queryFn: getGlobalMarketData,
        staleTime: 0,
        refetchInterval: 30000
    })


  if (isLoading) {
    return <div className="text-text-secondary text-center animate-pulse">Загрузка глобальных данных...</div>;
  }

   if (isError) {
    // Проверяем, является ли ошибка ошибкой Axios, чтобы вытащить статус-код
    // const errorMessage = isAxiosError(error) 
    //   ? `Ошибка API: ${error.response?.status}`
    //   : error.message;  
    return <div className="text-error text-center">Ошибка: {error.message}</div>;
  }

  
    
    
  return (
    <section className='py-section-sm md:py-section-md xl:py-section-xl'>
        <div className="container">

            {data && <div className='grid grid-cols-2 grid-rows-3 lg:grid-cols-4 lg:grid-rows-2'>
                    <div className='col-span-2 lg:col-span-4'>
                        <StatItem label='Total Market Cap' value={formatMoney(data.total_market_cap.usd)}/>
                    </div>
                    <StatItem label='Total Volume' value={formatMoney(data.total_volume.usd)}/>
                    <StatItem label='BTC Dominance' value={`${data.market_cap_percentage.btc.toFixed(2)}%`}/>
                    <StatItem label='ETH Dominance' value={`${data.market_cap_percentage.eth.toFixed(2)}%`}/>
                    <StatItem label='Active coins' value={data.active_cryptocurrencies}/>
                </div>
            }
            
        </div>
    </section>
  )
}

export default TotalInfo