import type { Metadata } from 'next';
import CardComponent from './CartComponent';

export const metadata: Metadata = {
  title: 'Cart page',
  description: 'Cart page',
};

export default function Page() {
  return <CardComponent />;
}
