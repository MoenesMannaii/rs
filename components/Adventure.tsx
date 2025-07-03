import React from 'react';
import Link from 'next/link';
import { client, urlFor } from '@/sanity/lib/client';

interface Activity {
  name: string;
}

interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface AdventureCard {
  slug: { current: string };
  title: string;
  image: SanityImage;
  tariff: string;
  duration: string;
  activities: Activity[];
  type?: string;
}

async function getAdventures() {
  const query = `*[_type == "adventure"] | order(title asc) {
    title,
    slug,
    type,
    image,
    tariff,
    duration,
    activities
  }`;
  const adventures: AdventureCard[] = await client.fetch(query);

  const camping = adventures.filter((adv) => adv.type === 'camping');
  const hiking = adventures.filter((adv) => adv.type === 'hiking');

  return { camping, hiking };
}

const AdventureSection: React.FC = async () => {
  const { camping, hiking } = await getAdventures();

  const renderCard = (card: AdventureCard) => (
    <Link href={`/adventures/${card.slug.current}`} key={card.slug.current}>
      <div
        className="relative rounded-lg overflow-hidden h-80 bg-zinc-900 border border-zinc-800 hover:shadow-lg transition-shadow duration-300 hover:shadow-green-400/10 cursor-pointer"
        style={{
          backgroundImage: `url(${urlFor(card.image)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 flex flex-col justify-end rounded-lg shadow-lg">
          <h3 className="text-xl font-extrabold uppercase text-white mb-3 tracking-wide drop-shadow-md">
            {card.title}
          </h3>

          <div className="flex items-center gap-3 mb-4 text-sm font-semibold text-gray-200">
            <p className="bg-zinc-900 bg-opacity-80 px-3 py-1 rounded shadow-sm">
              {card.tariff} TND
            </p>

            {/* Separator */}
            <span className="text-green-400 font-semibold">|</span>

            <p className="bg-zinc-900 bg-opacity-80 px-2 py-1 rounded shadow-sm">
              {card.duration} Day{Number(card.duration) > 1 ? 's' : ''}
            </p>
          </div>

          <ul className="space-y-2 text-sm text-gray-300">
            {card.activities.slice(0, 3).map((activity, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-medium capitalize">{activity.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );

  return (
    <section id="adventures" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl uppercase font-bold text-white">Our Adventures</h2>
          <div className="mt-3 h-1 w-48 bg-green-500 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          <div className="flex flex-col gap-10">
            <h3 className="text-2xl font-semibold uppercase text-green-400">Camping in Tunisia</h3>
            {camping.map(renderCard)}
          </div>

          <div className="flex flex-col gap-10">
            <h3 className="text-2xl font-semibold uppercase text-green-400">Hiking in Tunisia</h3>
            {hiking.map(renderCard)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdventureSection;
