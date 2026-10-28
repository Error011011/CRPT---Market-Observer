import React from 'react'
import { Link } from 'react-router'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='py-header-sm sticky top-0 z-50 bg-bg-page border-border-line border-1'>
        <div className="container">
            <div  className='flex justify-between items-center'>
                    <Link to={'/'} className='flex items-center gap-3'>
                        <div className='w-3 h-3 bg-accent'> </div>
                        <h1 className='uppercase font-medium tracking-widest text-lg'>CRPT</h1>
                    </Link>
                <div className='flex items-center gap-1'>
                    <span className=''>LIVE</span>
                    <span className='hidden xl:block uppercase'>Usd</span>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header