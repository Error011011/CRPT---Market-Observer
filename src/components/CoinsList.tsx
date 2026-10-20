import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getTopCoins } from '../api/CoinsService'
import CoinListItem from './CoinListItem'


const CoinsList = () => {

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['coins'],
    queryFn: getTopCoins
  })

  return (
    <section className='py-section-sm md:py-section-md xl:py-section-xl'>
        <div className="container">
            <div className='mb-10 lg:mb-15 flex flex-col gap-2 md:gap-3 text-center lg:text-start'>
              <h2 className='text-text-primary text-[2rem] lg:text-[4rem]'>Market</h2>
              <p className='text-text-secondary uppercase lg:text-[1.5rem]'>Top 50 by market cap</p>
            </div>

            <table className='w-full'>
              <thead className='text-text-secondary uppercase font-normal'>
                <tr className=''>
                  <th>#</th>
                  <th>Coin</th>
                  <th>Price</th>
                  <th className=''>24H</th>
                  <th className='hidden md:table-cell'>7D</th>
                  <th className='hidden lg:table-cell'>Market Cap</th>
                  <th className='hidden md:table-cell'>Volume 24h</th>
                  <th className='hidden md:table-cell'>Last 24H</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((coin) => {
                  return <CoinListItem market_cap_rank={coin.market_cap_rank} id={coin.id} name={coin.name} symbol={coin.symbol} current_price={coin.current_price} total_volume={coin.total_volume} price_change_percentage_24h_in_currency={coin.price_change_percentage_24h_in_currency} price_change_percentage_7d_in_currency={coin.price_change_percentage_7d_in_currency} image={coin.image} market_cap={coin.market_cap}/>
                })}
              </tbody>
            </table>

        </div>
    </section>
  )
}

export default CoinsList