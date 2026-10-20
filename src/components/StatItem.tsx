import React from 'react'

type Props = {
    label: string
    value: number | string
}

const StatItem = ({label, value}: Props) => {
  return (
    <div className='py-5 px-5 text-center lg:text-start'>
        <span className='uppercase text-text-secondary '>{label}</span>
        <p className='text-mono text-text-primary text-[2rem] md:text-[3rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:[4rem] 3xl:[6rem] w-full wrap-break-word'>{value}</p>
    </div>
  )
}

export default StatItem