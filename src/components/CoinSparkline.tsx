import { useEffect, useRef } from 'react';
import { createChart, LineSeries } from 'lightweight-charts';


type SparklineProps = {
    data: number[]
    color?: string

}

const CoinSparkline = ({data, color}: SparklineProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !data || data.length === 0) return;

    const container = containerRef.current;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 40, // Высота под размер строки таблицы
      layout: {
        background: { color: 'transparent' }, // Прозрачный фон
        textColor: 'transparent',
        attributionLogo: false
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      timeScale: {
        visible: false, // Убираем ось времени
        borderVisible: false,
      },
      rightPriceScale: {
        visible: false, // Убираем ось цен
        borderVisible: false,
      },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addSeries(LineSeries, {
      color: color,
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    // Преобразуем числа в формат { time, value }
    const lineData = data.map((price, index) => ({
      time: index as any, // Используем индекс как время
      value: price,
    }));

    series.setData(lineData);
    chart.timeScale().fitContent();
    
    return () => {
      chart.remove();
    };
  }, [data, color]);

  return (
    <div ref={containerRef} className="px-5 xl:px-0 w-24 h-10" />
  )
}

export default CoinSparkline