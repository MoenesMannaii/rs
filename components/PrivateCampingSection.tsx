'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client, urlFor } from '@/sanity/lib/client';
import type { Image as SanityImage } from 'sanity';

interface CampingAdventure {
  _id: string;
  slug: { current: string };
  title: string;
  image: SanityImage;
  duration: string;
  description: string;
  gallery: SanityImage[];
}

const PrivateCampingSection: React.FC = () => {
  const [adventures, setAdventures] = useState<CampingAdventure[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const q = `*[_type == "privateadventure"] | order(title asc) {
      _id,
      slug,
      title,
      image,
      duration,
      description,
      gallery
    }`;
    client.fetch(q).then(setAdventures);
  }, []);

  const slides: CampingAdventure[][] = [];
  for (let i = 0; i < adventures.length; i += 3) {
    slides.push(adventures.slice(i, i + 3));
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (!adventures.length) return <p className="text-center text-white py-20">Loading adventures...</p>;

  return (
    <section className="py-24 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl text-center uppercase font-bold">Private Camping<br />Adventures</h2>
        <div className="mt-3 h-1 w-48 bg-green-500 mx-auto rounded"></div>

        <div className="relative mt-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
                    {slide.map((adventure) => (
                      <div key={adventure._id} className="relative rounded border border-zinc-800 bg-zinc-900 overflow-hidden">
                        <Image
                          src={urlFor(adventure.image).url()}
                          alt={adventure.title}
                          width={400}
                          height={320}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-5">
                          <h3 className="text-lg font-bold text-white mb-2">{adventure.title}</h3>
                          <p className="text-sm text-green-400 font-medium mb-4">{adventure.duration} Days</p>
                          <Link
                            href={`/adventure/${adventure.slug.current}`}
                            className="inline-block bg-green-600 hover:bg-green-500 text-sm text-white font-medium py-2 px-2.5 rounded transition"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-md"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-md"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default PrivateCampingSection;
