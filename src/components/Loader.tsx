import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='flex justify-center items-center w-full min-h-screen '> 
        <div className='loader'> </div>
    </div>
  )
}

export default Loader