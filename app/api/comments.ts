import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-06-25',
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  const { name, email, comment, blogId } = req.body;
  if (!name || !comment || !blogId) return res.status(400).json({ message: 'Missing fields' });

  try {
    await client.create({
      _type: 'blogComment',
      name,
      email,
      comment,
      blog: { _type: 'reference', _ref: blogId },
      approved: false,
      createdAt: new Date().toISOString(),
    });
    return res.status(200).json({ message: 'Comment submitted for review' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
