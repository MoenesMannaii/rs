'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';  // <-- Added
import { MapPin } from 'lucide-react';

interface SanityImage {
  asset: {
    url: string;
  };
}

interface VideoFile {
  asset: {
    _ref: string;
  };
}

interface Section {
  title: string;
  description: string;
  images: SanityImage[];
}

interface Blog {
  title: string;
  slug: { current: string };
  teaser: string;
  image: SanityImage;
  video?: VideoFile | null;
  location: string;
  activities: string[];
  contentSections: Section[];
  ecotourism_title: string;
  ecotourism: string;
  whatToDo_title: string;
  whatToDo: string;
  whatToDo_gallery: SanityImage[];
  whyvisit_title: string;
  whyvisit: string;
  whyvisit_gallery: SanityImage[];
  gallery?: SanityImage[];
  sources: string;
  comments: {
    name: string;
    comment: string;
    date: string;
  }[];
}

interface BlogDetailClientProps {
  blog: Blog | null;
}

// TODO: Replace these with your actual Sanity project ID and dataset
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;

const getVideoUrl = (videoFile: VideoFile) => {
  if (!videoFile?.asset?._ref) return null;
  const ref = videoFile.asset._ref; // e.g. "file-abc123xyz456-mp4"
  const parts = ref.split('-');
  if (parts.length < 3) return null;

  const fileId = parts.slice(1, parts.length - 1).join('-'); // supports hyphen in id
  const extension = parts[parts.length - 1];

  // Example: https://cdn.sanity.io/files/yourProjectId/production/abc123xyz456.mp4
  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${fileId}.${extension}`;
};

const BlogDetailClient: React.FC<BlogDetailClientProps> = ({ blog }) => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = blog?.video ? getVideoUrl(blog.video) : null;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  if (!blog) {
    return <div className="text-center py-16 text-gray-500">Blog not found</div>;
  }

  return (
    <div className="bg-zinc-950 text-gray-100">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background image */}
        <Image
          src={blog.image.asset.url}
          alt={blog.title}
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.5) blur(4px)' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-black flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-green-400 drop-shadow break-words">
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
          {/* Media Section */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* Video */}
            {videoUrl && !videoError ? (
              <div className="w-full aspect-video relative">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded"
                  onError={() => setVideoError(true)}
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-zinc-900 flex items-center justify-center rounded-xl">
                <p className="text-gray-500">Video unavailable</p>
              </div>
            )}

            {/* Preview Gallery */}
            <div className="grid grid-cols-3 gap-2">
              {blog.gallery?.slice(0, 3).map((img, idx) => (
                <div key={idx} className="relative w-full h-32 rounded overflow-hidden">
                  <Image
                    src={img.asset.url}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>

            {/* Sticky Main Image */}
            <div className="sticky top-48">
              <div className="relative w-full max-h-[60vh] h-[60vh] rounded overflow-hidden">
                <Image
                  src={blog.image.asset.url}
                  alt="Sticky related image"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Dynamic Content Sections */}
          <div className="w-full md:w-1/2 space-y-12">
            {blog.contentSections?.map((section, idx) => (
              <div key={idx}>
                {section.title && (
                  <h2 className="text-3xl uppercase font-bold mb-4 text-green-500">
                    {section.title}
                  </h2>
                )}
                {section.description && (
                  <p className="text-base text-justify leading-relaxed text-white/70">
                    {section.description}
                  </p>
                )}
                {section.images?.length > 0 && (
                  <div className="mt-4 flex gap-4">
                    {section.images.slice(0, 2).map((img, index) => (
                      <div
                        key={index}
                        className="relative w-1/2 h-48 rounded overflow-hidden"
                      >
                        <Image
                          src={img.asset.url}
                          alt={`Section ${idx + 1} Image ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Full Gallery */}
        {Array.isArray(blog.gallery) && blog.gallery.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-green-500 mb-6">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {blog.gallery.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden shadow-lg group relative h-64 rounded"
                >
                  <Image
                    src={image.asset.url}
                    alt={`Gallery ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-300"
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

        {/* What To Do Section */}
        <section className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold uppercase mb-4 text-green-500">
              {blog.whatToDo_title}
            </h2>
            <p className="text-white/70 text-justify">{blog.whatToDo}</p>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            {blog.whatToDo_gallery?.slice(0, 4).map((img, idx) => (
              <div key={idx} className="relative w-full h-48 rounded overflow-hidden">
                <Image
                  src={img.asset.url}
                  alt={`WhatToDo ${idx + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Why Visit Section */}
        <section className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            {blog.whyvisit_gallery?.slice(0, 4).map((img, idx) => (
              <div key={idx} className="relative w-full h-48 rounded overflow-hidden">
                <Image
                  src={img.asset.url}
                  alt={`WhyVisit ${idx + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
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
            <span className="italic underline text-green-400">
              {blog.sources}
            </span>
          </p>
        </section>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block mt-12 bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-semibold transition"
          >
            Back to Places
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BlogDetailClient;
