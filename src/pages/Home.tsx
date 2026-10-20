import React from 'react'
import TotalInfo from '../components/TotalInfo'
import CoinsList from '../components/CoinsList'

type Props = {}

const Home = (props: Props) => {
  return (
    <>
    {/* search */}


    {/* total info */}
    <TotalInfo/>

    {/* list of currencies */}
    <CoinsList/>
    </>
  )
}

export default Home