import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

function About() {
  return (
    <section
      id="about"
      className="min-h-screen bg-zinc-950 px-4 sm:px-0 flex items-center justify-center text-white"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
        {/* Left Content */}
        <div className="space-y-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl uppercase font-bold leading-tight">
            Who We Are !
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed">
            At <span className="text-green-400 font-semibold">Runaway Society</span>, we are a vibrant camping community dedicated to exploring and celebrating the breathtaking landscapes, rich culture, and unique biodiversity of Tunisia. Through responsible and immersive camping experiences, we bring travelers closer to nature, fostering a deep connection with Tunisia’s stunning outdoors.
          </p>
          <div className='mb-8'>
          <Link href="/about">
            <button className="px-6 py-3 rounded-md bg-green-500 text-black hover:bg-green-400 transition duration-200 font-medium shadow-lg">
              The Story
            </button>
          </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative min-h-[300px] lg:min-h-screen order-first sm:order-last">
          <div className="relative h-full w-full overflow-hidden shadow-xl border border-zinc-800 bg-zinc-900">
            <Image
              src="https://res.cloudinary.com/dnntpvrmp/image/upload/v1749414918/xnqmcnpkq25u7mf0dcri.png"
              alt="nature"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;