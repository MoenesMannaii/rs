'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import type { Image as SanityImage } from 'sanity';
import { liveSanityFetch } from '@/sanity/lib/live';

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
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const fetchData = async () => {
    const query = `*[_type == "privateadventure"] | order(title asc) {
      _id,
      slug,
      title,
      image,
      duration,
      description,
      gallery
    }`;
    const { data } = await liveSanityFetch({ query }); // <-- liveSanityFetch expects an object
    setAdventures(data);
  };
  fetchData();
}, []);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerSlide(1);
      else if (width < 1024) setCardsPerSlide(2);
      else setCardsPerSlide(3);
    };
    updateCardsPerSlide();
    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  const slides: CampingAdventure[][] = [];
  for (let i = 0; i < adventures.length; i += cardsPerSlide) {
    slides.push(adventures.slice(i, i + cardsPerSlide));
  }

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (slides.length ? (prev + 1) % slides.length : 0));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (slides.length ? (prev - 1 + slides.length) % slides.length : 0));
  }, [slides.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      else if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prevSlide, nextSlide]);

  if (!adventures.length)
    return (
      <p className="text-center text-white py-14 text-base tracking-wide font-semibold">
        Loading adventures...
      </p>
    );

  return (
    <section
      className="py-16 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 text-white select-none"
      aria-label="Private Outings Carousel"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl uppercase font-bold text-white text-center mb-3">
          Private Outings
        </h2>
        <div className="w-48 h-1 bg-green-500 mx-auto rounded-full mb-10 shadow-lg"></div>

        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden rounded-xl ring-black/10">
            <div
              className="flex transition-transform duration-600 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full flex justify-center gap-6 py-6"
                >
                  <div
                    className={`grid w-full max-w-6xl gap-6 ${
                      cardsPerSlide === 1
                        ? 'grid-cols-1'
                        : cardsPerSlide === 2
                        ? 'md:grid-cols-2 grid-cols-1'
                        : 'md:grid-cols-3 grid-cols-1'
                    }`}
                  >
                    {slide.map((adventure) => (
                      <article
                        key={adventure._id}
                        tabIndex={0}
                        aria-label={`${adventure.title} - ${adventure.duration} Day${Number(adventure.duration) > 1 ? 's' : ''
                          }`}
                        className="relative rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 shadow-md hover:shadow-green-600/10 focus-within:shadow-green-500/80 transition-shadow duration-300 cursor-pointer"
                      >
                        <div className="relative w-full h-64">
                          <Image
                            src={urlFor(adventure.image).width(500).height(400).url()}
                            alt={adventure.title}
                            fill
                            className="object-cover rounded-t-xl"
                            placeholder="blur"
                            blurDataURL="https://picsum.photos/536/354"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={false}
                          />
                        </div>

                        <div className="p-4 flex flex-col justify-between h-32 bg-gradient-to-t from-black/90 to-transparent rounded-b-xl">
                          <h3 className="text-lg font-extrabold tracking-wide text-white line-clamp-1 mb-1">
                            {adventure.title}
                          </h3>
                          <p className="text-green-400 text-sm uppercase font-semibold mb-3 tracking-tight">
                            {adventure.duration} Day{Number(adventure.duration) > 1 ? 's' : ''}
                          </p>
                          <Link
                            href={`/adventure/${adventure.slug.current}`}
                            className="self-start rounded bg-green-600 px-5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition"
                            aria-label={`Book now for ${adventure.title}`}
                          >
                            Book Now
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute top-1/2 -left-2 -translate-y-1/2 rounded-full bg-zinc-800 p-2.5 shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute top-1/2 -right-2 -translate-y-1/2 rounded-full bg-zinc-800 p-2.5 shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  currentSlide === idx ? 'bg-green-500' : 'bg-zinc-700 hover:bg-green-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateCampingSection;
