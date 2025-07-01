'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroWithNavbar: React.FC = () => {
  return (
    <section className="relative h-[100vh] flex flex-col">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/4125029/4125029-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-black"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div>
          <div className="flex mx-auto justify-center mb-4">
            <Image
              src="https://res.cloudinary.com/dnntpvrmp/image/upload/v1749413691/l3qce518kqbbe3vuqzqu.png"
              alt="EcoExplore Logo"
              width={180}
              height={36}
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
            Discover Tunisia’s Hidden Gems
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Explore stunning green destinations like Ain Drahm, Tunisia, and join us in preserving the planet’s natural beauty.
          </p>
          <Link
            href="#adventure"
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroWithNavbar;
