'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Play } from 'lucide-react';


interface Blog {
  id: string;
  title: string;
  image: string;
  teaser: string;
  location: string;
  video: string;
  activities: string[];
  titleOne: string;
  titleOneSpan: string;
  titleTwo: string;
  titleTwoSpan: string;
  titleThree: string;
  titleThreeSpan: string;
  description: string;
  descriptionTwo: string;
  descriptionThree: string;
  titleFour?: string;
  descriptionFour?: string;
  ecotourism_title: string;
  ecotourism: string;
  whatToDo_title: string;
  whatToDo: string;
  whatToDo_gallery: string[];
  whyvisit_gallery: string[];
  whyvisit_title: string;
  whyvisit: string;
  sources: string;
  comments: { name: string; comment: string; date: string }[];
  gallery?: string[];
}


interface BlogDetailClientProps {
  blog: Blog | null;
}

const BlogDetailClient: React.FC<BlogDetailClientProps> = ({ blog }) => {
  const [videoError, setVideoError] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

 
  useEffect(() => {
    if (videoRef.current && blog?.video && !videoError) {
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {
        setIsVideoPlaying(false);
      });
    }
  }, [blog?.video, videoError]);



  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {
        setVideoError(true);
      });
    }
  };

    useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Set slower speed here (e.g., 0.6 for 60% speed)
    }
  }, []);

  if (!blog) {
    return <div className="text-center py-16 text-gray-500">Blog not found</div>;
  }

  return (
   <div className="bg-zinc-950 text-gray-100">
  {/* Hero Section */}
  <section className="relative h-[60vh] overflow-hidden">
    <Image
      src={blog.image}
      alt={blog.title}
      layout="fill"
      objectFit="cover"
      className="brightness-50 blur-sm"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-black flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-green-400 drop-shadow">
        {blog.title}
      </h1>
      <p className="text-lg md:text-2xl flex items-center gap-2 mt-2 text-gray-300">
        <MapPin className="w-5 h-5" /> {blog.location}
      </p>
    </div>
  </section>

  <main className="max-w-7xl mx-auto px-6 py-20 space-y-20">
    {/* Content Grid */}
    <section className="flex flex-col md:flex-row gap-12">
      {/* Media */}
      <div className="w-full md:w-1/2 space-y-6">
        {/* Video */}
        {blog.video && !videoError ? (
          <div className="w-full aspect-video relative">
            <video
              ref={videoRef}
              src={blog.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded"
              onError={() => setVideoError(true)}
            />
            {!isVideoPlaying && (
              <button
                onClick={handlePlayVideo}
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl"
                aria-label="Play video"
              >
                <Play className="w-12 h-12 text-white" />
              </button>
            )}
          </div>
        ) : (
          <div className="w-full aspect-video bg-gray-800 flex items-center justify-center rounded-xl">
            <p className="text-gray-500">Video unavailable</p>
          </div>
        )}

        {/* Gallery Preview */}
        <div className="grid grid-cols-3 gap-2">
          {blog.gallery?.slice(0, 3).map((imgUrl, idx) => (
            <Image
              key={idx}
              src={imgUrl}
              alt={`Gallery ${idx + 1}`}
              width={200}
              height={160}
              className="w-full h-full object-cover rounded"
            />
          ))}
        </div>

        {/* Sticky Image */}
        <div className="sticky top-24">
          <Image
            src={blog.image}
            alt="Sticky related image"
            width={500}
            height={350}
            className="w-full mx-auto max-h-[60vh] object-contain rounded"
          />
        </div>
      </div>

      {/* Description */}
     <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-3xl uppercase font-bold mb-4">{blog.titleOne}<span className='text-green-600'>{blog.titleOneSpan}</span></h2>
            <p className="text-base text-justify leading-relaxed text-white/70">
              {blog.description}
            </p>
           
            <h2 className="text-3xl uppercase font-bold mb-4">{blog.titleTwo}
              <span className='text-green-600'>{blog.titleTwoSpan}</span>
            </h2>
            <p className="text-base text-justify leading-relaxed text-white/70">
              {blog.descriptionTwo}
            </p>
             <h2 className="text-3xl uppercase font-bold mb-4">{blog.titleThree}<span className='text-green-600'>{blog.titleThreeSpan}</span>
             </h2>
            <p className="text-base text-justify leading-relaxed text-white/70">
              {blog.descriptionThree}
            </p>
             <h2 className="text-3xl uppercase font-bold mb-4">{blog.titleFour}
             </h2>
            <p className="text-base text-justify leading-relaxed text-white/70">
              {blog.descriptionFour}
            </p>
            </div>
    </section>

    {/* Full Gallery */}
    {Array.isArray(blog.gallery) && blog.gallery.length > 0 && (
      <section>
        <h2 className="text-3xl font-bold text-green-500 mb-6">Photo Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {blog.gallery.map((image, index) => (
            <div key={index} className="overflow-hidden  shadow-lg group">
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                width={500}
                height={350}
                className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300 rounded"
              />
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Ecotourism Section */}
    <section>
      <h2 className="text-3xl font-bold uppercase mb-4 text-green-500">
        {blog.ecotourism_title}
      </h2>
      <p className="text-white/70 text-justify">{blog.ecotourism}</p>
    </section>

    {/* What To Do */}
    <section className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold uppercase mb-4 text-green-500">
          {blog.whatToDo_title}
        </h2>
        <p className="text-white/70 text-justify">{blog.whatToDo}</p>
      </div>
      <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
        {blog.whatToDo_gallery?.slice(0, 4).map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`WhatToDo ${idx + 1}`}
            width={300}
            height={200}
            className="w-full h-full object-cover rounded"
          />
        ))}
      </div>
    </section>

    {/* Why Visit */}
    <section className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
        {blog.whyvisit_gallery?.slice(0, 4).map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`WhyVisit ${idx + 1}`}
            width={300}
            height={200}
            className="w-full h-full object-cover rounded"
          />
        ))}
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold uppercase mb-4 text-green-500">
          {blog.whyvisit_title}
        </h2>
        <p className="text-gray-300 text-justify">{blog.whyvisit}</p>
      </div>
    </section>

    {/* Source */}
    <section className="text-center text-sm">
      <p>
        Source:{' '}
        <span className="italic underline text-green-400">{blog.sources}</span>
      </p>
    </section>

    {/* Back Link */}
    <div className="text-center">
      <Link href="/"  className="inline-block mt-12 bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-semibold transition"   >
          Back to Places
      
      </Link>
    </div>
  </main>
</div>

  );
};

export default BlogDetailClient;