'use client';

import Link from 'next/link';
import { sendEvent } from '../components/GoogleAnalytics';

export default function CardComponent() {
  return (
    <div>
      <b>CART</b>
      <br />
      <br />
      <button
        onClick={() => {
          sendEvent({
            action: 'goToCheckout',
            category: 'key events',
          });
        }}
      >
        <b>--Go to checkout--</b>
      </button>
      <br />
      <br />
      <Link href="/">Go to home page</Link>
    </div>
  );
}
