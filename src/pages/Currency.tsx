import { dataTagErrorSymbol, useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router'
import { getOneCoin } from '../api/CoinsService'
import { changeColor } from '../components/utils/colorHelper'
import { formatMoney } from '../components/utils/moneyHelper'
import { formatCoinAmount } from '../components/utils/coinHelper'
import CoinChart from '../components/CoinChart'


type CoinParams = {
  id: string
}

type Props = {}

const Currency = (props: Props) => {
  const {id}= useParams<CoinParams>();

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['coin', `${id}`],
    queryFn: () => getOneCoin(id),
    enabled: !!id
  })

  const statArray = [
    {
      name: 'Market Cap',
      value: formatMoney(data?.market_data.market_cap.usd)
    },
    {
      name: 'Total Volume',
      value: formatMoney(data?.market_data.total_volume.usd)
    },
    {
      name: 'High 24H',
      value: formatMoney(data?.market_data.high_24h.usd)
    },
    {
      name: 'Low 24H',
      value: formatMoney(data?.market_data.low_24h.usd)
    },
    {
      name: 'Total Supply',
      value: formatCoinAmount(data?.market_data.total_supply)
    },
    {
      name: 'Circulating Supply',
      value: formatCoinAmount(data?.market_data.circulating_supply)
    },
    
    {
      name: 'Max Supply',
      value: formatCoinAmount(data?.market_data.max_supply)
    },
    {
      name: 'Market Rank',
      value: data?.market_cap_rank ?? null
    },
    
  ]

  
    if(isLoading) {
      return <div className="py-5 lg:py-15 flex justify-center items-center text-text-secondary text-center animate-pulse min-h-75">Loading...</div>;
    }
    if(isError) {
      return <div className="py-5 lg:py-15 flex justify-center items-center text-text-secondary text-center min-h-75">Error: {error?.message}</div>
    }


  return (
    <>
      <section className='py-section-sm md:py-section-md xl:py-section-xl'>
        <div className="container">
          <div className='mb-7 flex justify-center md:justify-start items-center gap-3'>
             <img src={data?.image.small} alt="Coin image" />
             <div>
              <h3 className='mb-1 md:mb-2 md:text-2xl lg:text-4xl text-text-primary'>{data?.name}</h3>
              <div className='flex gap-2 md:text-xl uppercase text-text-secondary'>
                <span>{data?.symbol}</span>
                <span>Rank #{data?.market_cap_rank}</span>
              </div>
             </div>
          </div>

          <div className='flex flex-col md:flex-row md:justify-start md:items-baseline gap-7 lg:gap-9 text-center md:text-start '>
              <h2 className='text-[5rem] lg:text-[7rem] xl:text-[8rem]'>${data?.market_data.current_price.usd}</h2>
              <div className='flex gap-3 justify-center items-center'>
                <span className='py-2 px-5 border border-border-line rounded-full'>24H  <span className={`${changeColor(data?.market_data.price_change_percentage_24h)}`}>{data?.market_data.price_change_percentage_24h.toFixed(2)}</span></span>
                <span className='py-2 px-5 border border-border-line rounded-full'>7D  <span className={`${changeColor(data?.market_data.price_change_percentage_7d)}`}>{data?.market_data.price_change_percentage_7d.toFixed(2)}</span></span>
                <span className='py-2 px-5 border border-border-line rounded-full'>30D  <span className={`${changeColor(data?.market_data.price_change_percentage_30d)}`}>{data?.market_data.price_change_percentage_30d.toFixed(2)}</span></span>
              </div>
          
          </div>

          

          
        </div>
      </section>

      <section className='py-section-sm md:py-section-md xl:py-section-xl'>
        <div className="container">
            {id && <CoinChart id={id}/>}
        </div>
      </section>

      <section className='py-section-sm md:py-section-md xl:py-section-xl'>
        <div className="container">
          <h3 className='mb-9 lg:mb-12 xl:mb-15 text-center md:text-start text-text-secondary uppercase'>Statistics</h3>
          <div className='grid grid-cols-2 lg:grid-cols-4'>
            {data && <>
              {statArray.map((item) => {
                return <div key={item.name} className='py-9 px-5 border border-border-line'>
                  <p className='mb-1 text-[0.75rem] md:text-[1rem] text-text-secondary uppercase'>{item.name}</p>
                  <h3 className='font-mono text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] 2xl:text-[4rem] text-wrap'>{item.value ?? '-'}</h3>
                </div>
              })}
            </>}
          </div>
        </div>
      </section>
    </>

  )
}

export default Currency