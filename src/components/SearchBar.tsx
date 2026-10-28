import { useState } from 'react'
import { useCoinSearch } from './hooks/useCoinSearch'
import { Link } from 'react-router'
import { IoCloseOutline } from "react-icons/io5";


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const {data: results, isLoading, isError} = useCoinSearch(query);

  const clearInput = (): void => {
    setQuery('')
  }
  return (
    <section className='py-section-sm md:py-section-md xl:py-section-xl'>
        <div className="container">
          <div className='relative w-full text-start'>
            <input className='px-4 py-2 w-full border-b border-border-line bg-transparent text-text-primary font-mono focus:scale-105 focus:outline-none focus:border-accent duration-300' type="text" value={query}  onChange={(e) => setQuery(e.target.value)} placeholder='Search coin or ticker'/>
            {query !== '' && <IoCloseOutline onClick={clearInput} onMouseDown={(e) => e.preventDefault() } className='absolute right-2 top-2 w-7 h-7 cursor-pointer' />}

            {/* dropdown */}
            {query.length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-border-line rounded shadow-lg max-h-80 overflow-y-auto z-50 custom-scrollbar">
                  {isLoading && <div className="p-3 text-text-secondary text-sm">Searching...</div>}
                  {isError && <div className="p-3 text-red-500 text-sm">Search failed</div>}
                  {results?.length === 0 && !isLoading && (
                    <div className="p-3 text-text-secondary text-sm">No results found</div>
                  )}
                  {results?.map((coin) => (
                    <Link
                      key={coin.id}
                      to={`/${coin.id}`}
                      onClick={() => setQuery('')} // очистить после перехода
                      className="flex items-center gap-3 px-3 py-3 hover:bg-white/5 transition-colors"
                    >
                      <img src={coin.thumb} alt={coin.name} className="w-6 h-6 " />
                      <div>
                        <span className="text-text-primary text-sm">{coin.name}</span>
                        <span className="text-text-secondary text-xs ml-2 uppercase">{coin.symbol}</span>
                      </div>
                      {coin.market_cap_rank && (
                        <span className="ml-auto text-text-secondary text-xs">#{coin.market_cap_rank}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
          </div>

        </div>
    </section>
  )
}

export default SearchBar