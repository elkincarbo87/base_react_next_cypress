import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin page',
  description: 'Admin page',
};

export default function Page() {
  return (
    <div>
      test admin page <br />
      <Link href="/">Go to home page</Link>
    </div>
  );
}
