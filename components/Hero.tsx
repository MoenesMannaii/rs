'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';

interface HeroProps {
  backgroundImage?: {
    asset?: {
      _ref: string;
    };
  };
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink?: string; // Made optional to handle undefined
}

const HeroWithNavbar: React.FC<HeroProps> = ({
  backgroundImage,
  heading,
  subheading,
  buttonText,
  buttonLink,
}) => {
  // Fallback image URL if backgroundImage is undefined
  const imageUrl = backgroundImage?.asset
    ? urlFor(backgroundImage).url()
    : 'https://imgs.search.brave.com/L3kO8ehqJFSYWjXjR_7p91Q5DcfQXMQybV3dWMPxIcg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC9iLzEv/Ny8xMDc4MzMwLTI1/NjB4MTYwMC1kZXNr/dG9wLWhkLXBhdHJp/Y2stc3Rhci1zcG9u/Z2Vib2Itc3F1YXJl/cGFudHMtYmFja2dy/b3VuZC1pbWFnZS5q/cGc';

  // Fallback for buttonLink
  const linkHref = buttonLink || '/#fallback';

  return (
    <section className="relative h-[100vh] flex flex-col">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt="Hero background"
        fill
        className="absolute inset-0 object-cover w-full h-full"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-black"></div>

      {/* Hero Content */}
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