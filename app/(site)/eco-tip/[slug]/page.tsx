import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from 'sanity';
import Link from 'next/link';

interface EcoTip {
  title: string;
  description: PortableTextBlock[];
  link?: string;
}

export async function generateStaticParams() {
  const tips = await client.fetch(`*[_type == "ecoTip"]{ slug }`);
  return tips.map((tip: any) => ({ slug: tip.slug.current }));
}

export default async function EcoTipPage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "ecoTip" && slug.current == $slug][0]{
    title,
    description,
    link
  }`;

  const tip: EcoTip = await client.fetch(query, { slug: params.slug });

  if (!tip) {
    return <div className="text-white text-center py-20">Eco Tip not found</div>;
  }

  return (
    <main className="bg-black text-white min-h-screen py-24 px-2">
      <article className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-green-400">
          {tip.title}
        </h1>

        {/* Divider */}
        <div className="h-1 w-24 bg-green-500 mb-10 rounded" />

        {/* Description */}
        <div className="prose prose-invert prose-lg text-gray-300 leading-relaxed space-y-6 mb-10">
          <PortableText
            value={tip.description}
            components={{
              marks: {
                link: ({ value, children }) => (
                  <a
                    href={value.href}
                    target={value.blank ? '_blank' : '_self'}
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

        {/* Learn More Button */}
        {tip.link && (
          <div className="mt-8">
            <a
              href={tip.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded transition"
            >
              Learn More →
            </a>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-16">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-green-400 transition underline"
          >
            ← Back to all tips
          </Link>
        </div>
      </article>
    </main>
  );
}
