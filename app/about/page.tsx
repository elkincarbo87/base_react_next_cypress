'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as stylex from '@stylexjs/stylex';
import { DoughnutChart, chartData } from '../components/DonutChart';
import { useQuery } from '@tanstack/react-query';

type todosType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const fetchTodos = async (): Promise<todosType[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export default function Page() {
  const { data, isLoading, isError } = useQuery<todosType[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
  const [showGreen, setShowGreen] = useState(true);
  const [chartData, setCharData] = useState<chartData[]>([
    { label: 'Lifetime interest', value: 1000, color: '#0088AD' },
    { label: 'Loan amount', value: 12000, color: '#65CAE5' },
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1 {...stylex.props(showGreen ? styles.green : styles.red)}>About</h1>
      <Link {...stylex.props(styles.link)} href="/">
        Home
      </Link>
      <br />
      <button onClick={() => setShowGreen(!showGreen)}>
        Button: {showGreen ? 'true' : 'false'}
      </button>
      <br />
      <br />
      <div className="flex flex-row justify-center items-center">
        <DoughnutChart
          data={chartData}
          totalLabel="Lifetime cost"
          format={{
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }}
          reverseLegends
        />
      </div>
      <br />
      <br />
      <button
        onClick={() =>
          setCharData([
            { label: 'Lifetime interest', value: 5000, color: '#0088AD' },
            { label: 'Loan amount', value: 18000, color: '#65CAE5' },
          ])
        }
      >
        Change chart data
      </button>
      <br />
      <br />
      <br />
      <div>
        <h1>
          <b>Todos using react query</b>
        </h1>
        <ul>
          {data && data.map((todo) => <li key={todo.id}>{todo.title}</li>)}
        </ul>
      </div>
    </div>
  );
}

const styles = stylex.create({
  green: {
    fontSize: 16,
    lineHeight: 1.5,
    color: 'green',
  },
  red: {
    fontSize: 16,
    lineHeight: 1.5,
    color: 'red',
  },
  link: {
    fontWeight: 'bold',
    color: 'yellow',
  },
});
