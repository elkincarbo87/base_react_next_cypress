import type { Metadata } from 'next';
import AboutComponent from './AboutComponent';

export const metadata: Metadata = {
  title: 'About page',
  description: 'About page',
};

export default function Page() {
  return <AboutComponent />;
}
