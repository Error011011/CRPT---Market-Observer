import { formatMoney } from './utils/moneyHelper'
import StatItem from './StatItem'
import type { GlobalMarketData } from '../api/GlobalService'

type MarketInfoProps = {
    data: GlobalMarketData
}

const MarketInfo = ({data}: MarketInfoProps) => {
    
  return (
    <section className='py-section-sm md:py-section-md xl:py-section-xl'>
        <div className="container">

            {data && <div className='grid grid-cols-2 grid-rows-3 lg:grid-cols-4 lg:grid-rows-2'>
                    <div className='col-span-2 lg:col-span-4'>
                        <StatItem label='Total Market Cap' value={formatMoney(data.total_market_cap.usd) ?? '-'}/>
                    </div>
                    <StatItem label='Total Volume' value={formatMoney(data.total_volume.usd) ?? '-'}/>
                    <StatItem label='BTC Dominance' value={`${data.market_cap_percentage.btc.toFixed(2)}%`}/>
                    <StatItem label='ETH Dominance' value={`${data.market_cap_percentage.eth.toFixed(2)}%`}/>
                    <StatItem label='Active coins' value={data.active_cryptocurrencies}/>
                </div>
            }
            
        </div>
    </section>
  )
}

export default MarketInfo