import database from '@/app/constants/database';
import type { Metadata } from 'next';
import Link from 'next/link';

function getProductInfo(productId: string) {
  return database.find((product) => product.id === productId);
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = getProductInfo(params.id);
  return {
    title: product ? product.title : '',
    description: product ? product.description : '',
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const productDetails = getProductInfo(params.id);
  return (
    <div>
      {productDetails?.description}
      <br />
      <Link href="/">Go to home page</Link>
    </div>
  );
}
