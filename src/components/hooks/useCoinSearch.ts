import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { searchCoins } from '../../api/CoinsService';
import type { SearchCoinData } from  '../../api/CoinsService';


export const useCoinSearch = (rawQuery: string) => {
     const [debouncedQuery, setDebouncedQuery] = useState(rawQuery);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(rawQuery), 300);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  return useQuery<SearchCoinData[], Error>({
    queryKey: ['coinSearch', debouncedQuery],
    queryFn: ({ signal }) => searchCoins(debouncedQuery, signal),
    enabled: debouncedQuery.length > 1,
    staleTime: 1000 * 60 * 5, 
    placeholderData: keepPreviousData, 
  });

}