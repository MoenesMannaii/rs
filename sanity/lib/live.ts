// File: sanity/lib/live.ts
'use server'; // this ensures it's treated as a Server Module

import { defineLive } from 'next-sanity';
import { client } from './client';

const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2021-10-21', // ✅ correct live API version
  }),
});

// Export separately
export { SanityLive }; // ✅ only for server components (e.g. layout.tsx)
export const liveSanityFetch = sanityFetch; // ✅ for client components
