import { useEffect, useState, useRef } from 'react'
import type { ChartRange, ChartPoint } from '../api/CoinChartService'
import { useCoinChart } from './hooks/useCoinChart'
import {
  createChart,
  LineSeries,
  type IChartApi,
  type ISeriesApi,
  type LineData,
} from 'lightweight-charts';

type Props = {
    id: string
}

const RANGES: { label: string; value: ChartRange }[] = [
  { label: '1D', value: '1' },
  { label: '7D', value: '7' },
  { label: '30D', value: '30' },
  { label: '90D', value: '90' },
  { label: '1Y', value: '365' },
];

const toLineData = (p: ChartPoint): LineData => p as LineData;

const CoinChart = ({id}: Props) => {
    const [range, setRange] = useState<ChartRange>('1');
    const {data, isLoading, isError, error} = useCoinChart(id, range)

    // ref
     const containerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);

    // useEffect - creating chart

    useEffect(() => {
        const container = containerRef.current;
        if(!container) return;

        const chart = createChart(container, {
            width: container.clientWidth,
            height: container.clientHeight,
            layout: {background: {color: '#080808'}, textColor: '#fff'},
            grid: { vertLines: { color: 'rgba(255,255,255,0.06)' }, horzLines: { color: 'rgba(255,255,255,0.06)' } },
            timeScale: { borderColor: 'rgba(255,255,255,0.1)' },
            rightPriceScale: { borderColor: 'rgba(255,255,255,0.1)' },

        });

        const series = chart.addSeries(LineSeries, {
            color: '#00FF94',
            lineWidth: 2,
            priceLineVisible: false
        });

        chartRef.current = chart;
        seriesRef.current = series;


        const onResize = () => {
            if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth, height: container.clientHeight });
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            chart.remove();
            chartRef.current = null;
            seriesRef.current = null;
        };
        
    }, [])

    // update chart based on new figures
    useEffect(() => {
    if (!seriesRef.current || !data) return;
    seriesRef.current.setData(data.map(toLineData));
    chartRef.current?.timeScale().fitContent();
  }, [data]);



    
  return (
    <div>
      <div className='flex justify-center md:justify-start gap-3 '>
        {RANGES.map((r) => (
          <button
            key={r.value}
            onClick={() => setRange(r.value)}
            className={`px-3 py-1 rounded cursor-pointer border border-[#00FF94] ${
              range === r.value
                ? 'bg-[#00FF94] text-bg-page font-bold'
                : 'bg-transparent text-white'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {isLoading && <p className='py-3 text-center'>Loading…</p>}
      {isError && <p className='text-error'>Error: {error.message}</p>}

      <div ref={containerRef} className='w-full h-100 xl:h-150'/>
    </div>
  )
}

export default CoinChart