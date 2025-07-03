'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import { sanityFetch } from '@/sanity/lib/live'; // Make sure path is correct

interface HeroData {
  _id: string;
  _type: string;
  _rev: string;
  _updatedAt: string;
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink?: string;
  backgroundImage?: {
    asset?: {
      _ref: string;
    };
  };
}

const HeroWithNavbar: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
  const fetchHeroData = async () => {
    const query = `*[_type == "heroSection"][0]{ 
      _id, 
      _type, 
      _rev, 
      _updatedAt,
      heading, 
      subheading, 
      buttonText, 
      buttonLink, 
      backgroundImage 
    }`;

    const { data } = await sanityFetch({ query });
    setHeroData(data);
  };

  fetchHeroData();
}, []);


  if (!heroData) return null;

  const {
    backgroundImage,
    heading,
    subheading,
    buttonText,
    buttonLink,
  } = heroData;

  const imageUrl = backgroundImage?.asset
    ? urlFor(backgroundImage).url()
    : 'https://imgs.search.brave.com/L3kO8ehqJFSYWjXjR_7p91Q5DcfQXMQybV3dWMPxIcg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC9iLzEv/Ny8xMDc4MzMwLTI1/NjB4MTYwMC1kZXNr/dG9wLWhkLXBhdHJp/Y2stc3Rhci1zcG9u/Z2Vib2Itc3F1YXJl/cGFudHMtYmFja2dy/b3VuZC1pbWFnZS5q/cGc';

  const linkHref = buttonLink || '/#fallback';

  return (
    <section className="relative h-[100vh] flex flex-col">
      <Image
        src={imageUrl}
        alt="Hero background"
        fill
        className="absolute inset-0 object-cover w-full h-full"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-black"></div>

      <div className="relative z-10 flex-1 flex items-center justify-center text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
            {heading}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            {subheading}
          </p>
          <Link
            href={linkHref}
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroWithNavbar;
