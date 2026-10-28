import MarketInfo from '../components/MarketInfo'
import CoinsList from '../components/CoinsList'
import { useQuery } from '@tanstack/react-query'
import { getGlobalMarketData } from '../api/GlobalService'
import { getTopCoins } from '../api/CoinsService'
import Loader from '../components/Loader'
import SearchBar from '../components/SearchBar'


const Home = () => {

  const marketData = useQuery({
          queryKey: ['globalMarketData'],
          queryFn: getGlobalMarketData,
          staleTime: 0,
          refetchInterval: 30000
      });

    const coinsData = useQuery({
        queryKey: ['coins'],
        queryFn: getTopCoins
      });

    const isLoading = marketData.isLoading || coinsData.isLoading;
    const isError = marketData.isError || coinsData.isError;
    const error = marketData.error || coinsData.error;

      if(isLoading) {
        return <Loader/>
      }
      if(isError) {
        return <div className="py-5 lg:py-15 flex justify-center items-center text-text-secondary text-center min-h-75">Error: {error?.message}</div>
      }

      if(!marketData.data || !coinsData.data) return <Loader/>

  return (
    <>
    <SearchBar/>
    <MarketInfo data={marketData.data}/>
    <CoinsList coins={coinsData.data}/>
    </>
  )
}

export default Home