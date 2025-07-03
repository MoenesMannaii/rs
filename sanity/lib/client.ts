import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2a5peobn',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-06-24',
  useCdn: false, 
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN, // ✅ ONLY write token
   stega: {
    studioUrl: process.env.NODE_ENV === 'production'
      ? `${process.env.NEXT_PUBLIC_PROD_BASE_URL}/studio`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  },
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
