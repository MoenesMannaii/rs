'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LuLeaf,
  LuMountain,
  LuShoppingBag,
  LuRecycle,
  LuGlobe,
} from 'react-icons/lu';
import { getEcoTips } from '@/sanity/lib/getEcoTips';
import type { PortableTextBlock } from 'sanity';

interface EcoTip {
  title: string;
  description: PortableTextBlock[];
  icon: string;
  slug: { current: string };
  link?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  leaf: <LuLeaf className="text-green-500 text-3xl" />,
  globe: <LuGlobe className="text-green-500 text-3xl" />,
  mountain: <LuMountain className="text-green-500 text-3xl" />,
  shoppingBag: <LuShoppingBag className="text-green-500 text-3xl" />,
  recycle: <LuRecycle className="text-green-500 text-3xl" />,
};

const Advices: React.FC = () => {
  const [ecoTips, setEcoTips] = useState<EcoTip[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    getEcoTips().then(setEcoTips);
  }, []);

  return (
    <section className="py-20 bg-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl uppercase font-bold text-white">
            Eco Tips
          </h2>
          <div className="mt-3 h-1 w-24 bg-green-500 mx-auto rounded-full" />
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Small actions. Big impact. Sustainable travel starts here.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {ecoTips.map((advice, index) => {
            const isHovered = hoveredIndex === index;
            const icon =
              iconMap[advice.icon] || <LuLeaf className="text-green-500 text-3xl" />;

            return (
             <Link href={`/eco-tip/${advice.slug.current}`} key={advice.slug.current}
                className="w-96 h-72"
              >
                <div
                  className={`w-full h-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-green-500 ${isHovered ? 'scale-105' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex justify-center items-center w-14 h-14 bg-zinc-800 rounded-full mb-3">
                    {icon}
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-white hover:text-green-400 transition">
                    {advice.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advices;
