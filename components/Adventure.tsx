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
        className="relative rounded overflow-hidden h-80 bg-zinc-900 border border-zinc-800 hover:shadow-lg transition-shadow duration-300
        hover:shadow-green-400/10"
        style={{
          backgroundImage: `url(${urlFor(card.image)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 p-5 flex flex-col justify-end">
          <h3 className="text-lg font-bold uppercase text-white mb-2">{card.title}</h3>
          <p className="text-md font-semibold text-green-400 mb-3">{card.tariff} TND</p>
          <ul className="space-y-1 text-sm text-gray-300">
            {card.activities.slice(0, 3).map((activity, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
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
