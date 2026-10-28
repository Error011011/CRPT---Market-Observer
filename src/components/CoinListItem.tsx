import type { TopCoinsData } from '../api/CoinsService'
import { formatMoney } from './utils/moneyHelper'
import { changeColor } from './utils/colorHelper'
import { Link } from 'react-router'
import CoinSparkline from './CoinSparkline'

const CoinListItem = ({market_cap_rank, id, name, symbol, current_price, total_volume, image, price_change_percentage_24h_in_currency, price_change_percentage_7d_in_currency, market_cap, sparkline_in_7d}: TopCoinsData) => {
    const sparklineData = sparkline_in_7d?.price?.slice(-24) || [];
    return (
    <tr className='py-5 text-center border-b border-border-line'>
        <td className=' py-3 m-0'>{market_cap_rank}</td>
        
            <td className='px-5 md:px-7 lg:px-9 flex items-center justify-center lg:justify-start'>
                <Link className='flex items-center' to={`${id}`}>
                <div>
                    <img className='w-5 md:w-7 h-5 md:h-7' src={image} alt="Coin image" />
                </div>
                <div     className='flex flex-col justify-start text-center lg:text-start px-5'>
                <h3 className='md:text-[1.5rem] font-normal'>{name}</h3>
                <p className='uppercase text-text-secondary text-[0.75rem] md:text-[1rem]'>{symbol}</p>
                </div>
                </Link>
            </td>
        
        <td className='font-bold font-mono py-3 m-0'>{current_price != null ? `$${current_price.toFixed(2)}` : '—'}</td>
        <td className={`${changeColor(price_change_percentage_24h_in_currency)} font-mono py-3 m-0`}>{price_change_percentage_24h_in_currency != null
    ? `${price_change_percentage_24h_in_currency.toFixed(2)}%`
    : '—'}</td>
        <td className={`${changeColor(price_change_percentage_7d_in_currency)} hidden md:table-cell font-mono py-3 m-0`}>{price_change_percentage_7d_in_currency != null
    ? `${price_change_percentage_7d_in_currency.toFixed(2)}%`
    : '—'}</td>
        <td className='hidden lg:table-cell text-text-secondary font-mono py-3 m-0'>{formatMoney(market_cap)}</td>
        <td className='hidden md:table-cell text-text-secondary font-mono py-3 m-0'>{formatMoney(total_volume)}</td>
        <td className='hidden md:table-cell py-3 m-0'><CoinSparkline data={sparklineData} /></td>
    </tr>
  )
}

export default CoinListItem