'use client';

import React, { useEffect, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  ArcElement,
  Chart as ChartJS,
  type Chart,
  type ChartData,
  type ChartOptions,
  type InteractionMode,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement);
const DESKTOP = '@media (min-width: 736px)';
const SMALLDEVICE = '@media (max-width: 346px)';
function formatStr(numStr: string, options: Intl.NumberFormatOptions) {
  if (numStr === '') return '';
  return new Intl.NumberFormat('COP', options).format(Number(numStr));
}
export type chartData = { label: string; value: number; color: string };

interface DoughnutChartProps {
  data: chartData[];
  format?: Intl.NumberFormatOptions;
  reverseLegends?: boolean;
  totalLabel?: string;
}

export function DoughnutChart({
  data,
  totalLabel = 'Total',
  reverseLegends,
  format,
}: DoughnutChartProps) {
  const chartRef = useRef<Chart<'doughnut'> | null>(null);
  const values: number[] = data.map((item) => item.value);
  const total = values.reduce((acc, value) => acc + value, 0);
  const processedData = reverseLegends ? [...data].reverse() : data;
  const chartData: ChartData<'doughnut'> = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: values,
        backgroundColor: data.map((item) => item.color),
        borderRadius: 4,
        spacing: 1,
      },
    ],
  };
  const options: ChartOptions<'doughnut'> = {
    cutout: '70%',
    hover: { mode: 'none' as InteractionMode },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { delay: 500 },
  };
  const handleResize = () => {
    if (chartRef.current && window) {
      const size = window.innerWidth >= 736 ? [120, 120] : [92, 92];
      if (chartRef.current) chartRef.current.resize(...size);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generateLegends = () => {
    if (
      !chartData.datasets ||
      chartData.datasets.length === 0 ||
      !chartData.datasets[0].backgroundColor
    ) {
      return null;
    }
    return (
      <div {...stylex.props(styles.legendContainer)}>
        {processedData.map((legend, index) => {
          return (
            <LegendItem
              key={legend.label}
              label={legend.label}
              value={legend.value}
              color={legend.color}
              format={format}
              isLast={index === data.length - 1}
            />
          );
        })}
        <div {...stylex.props(styles.divider)}>
          <LegendItem label={totalLabel} value={total || 0} format={format} />
        </div>
      </div>
    );
  };

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.chartColumn)}>
        <Doughnut data={chartData} options={options} ref={chartRef} />
      </div>
      <div {...stylex.props(styles.legendColumn)}>{generateLegends()}</div>
    </div>
  );
}

interface LegendItemProps {
  label: string;
  value: number;
  color?: string;
  isLast?: boolean;
  format?: Intl.NumberFormatOptions;
}

export function LegendItem({
  label,
  value,
  color,
  isLast,
  format,
}: LegendItemProps) {
  return (
    <div
      {...stylex.props([styles.legendItem, isLast ? styles.noMargin : null])}
    >
      <div {...stylex.props(styles.legendInfo)}>
        {color && (
          <div
            style={{ backgroundColor: color }}
            {...stylex.props(styles.legendColor)}
          />
        )}
        <span
          {...stylex.props([styles.legendLabel, color ? styles.margin : {}])}
        >
          {label}
        </span>
      </div>
      <span {...stylex.props(styles.legendValue)}>
        {`${format ? formatStr(String(value), format) : value}`}
      </span>
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    justifyContent: { default: 'flex-start', [SMALLDEVICE]: 'center' },
    flexWrap: { default: 'nowrap', [SMALLDEVICE]: 'wrap' },
    alignItems: 'center',
  },
  chartColumn: {
    marginRight: { default: '1.5rem', [DESKTOP]: '2.5rem', [SMALLDEVICE]: '0' },
    marginBottom: { default: '0', [DESKTOP]: '0', [SMALLDEVICE]: '1.5rem' },
    position: 'relative',
    height: { default: '5.75rem', [DESKTOP]: '7.5rem' },
    width: { default: '5.75rem', [DESKTOP]: '7.5rem' },
  },
  legendColumn: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  legendContainer: { width: '100%' },
  legendItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: { default: '0', [DESKTOP]: '0.25rem' },
  },
  legendInfo: { display: 'flex', flexWrap: 'nowrap', alignItems: 'center' },
  legendLabel: {
    fontSize: { default: '0.75rem', [DESKTOP]: '0.875rem' },
    letterSpacing: '0',
    wordSpacing: '0',
  },
  margin: { margin: '0 1rem 0 0.75rem' },
  noMargin: { margin: 0 },
  legendValue: {
    fontSize: { default: '1rem', [DESKTOP]: '1.25rem' },
    lineHeight: '1.5rem',
  },
  legendColor: { width: '1rem', height: '0.5rem', borderRadius: '2px' },
  divider: {
    paddingTop: { default: '0.25rem', [DESKTOP]: '0.5rem' },
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'silver',
    marginLeft: '1.75rem',
    marginTop: { default: '0.25rem', [DESKTOP]: '0.5rem' },
  },
});
