import type { Metadata } from 'next';
import './globals.css';
import ReactQueryProvider from './ReactQueryProvider';
import * as stylex from '@stylexjs/stylex';
import GoogleAnalytics from './components/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'Elkin Cardona NextJs Base Project',
  description:
    'NextJs Base Project using typescript, eslint, stylexjs, tailwind, chartjs, cypress, google analitys and testing library',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body {...stylex.props(styles.body)}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
      <GoogleAnalytics />
    </html>
  );
}

const styles = stylex.create({
  body: {
    boxSizing: 'border-box',
    background: 'black',
  },
});
