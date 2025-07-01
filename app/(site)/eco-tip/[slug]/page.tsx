import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from 'sanity';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface EcoTip {
  title: string;
  description: PortableTextBlock[];
  link?: string;
}

export default async function EcoTipPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const query = `*[_type == "ecoTip" && slug.current == $slug][0]{
    title,
    description,
    link
  }`;

  const tip: EcoTip | null = await client.fetch(query, {
    slug: resolvedParams.slug,
  });

  if (!tip) return notFound();

  return (
    <main className="bg-black text-white min-h-screen py-24 px-4">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-400 leading-tight">
          {tip.title}
        </h1>
        <div className="h-1 w-24 bg-green-500 mb-10 rounded" />
        <div className="prose prose-invert prose-lg text-gray-300 space-y-6 mb-10">
          <PortableText
            value={tip.description}
            components={{
              marks: {
                link: ({ value, children }) => (
                  <a
                    href={value?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 underline hover:text-green-300 transition"
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>
       
      
      </article>
    </main>
  );
}
