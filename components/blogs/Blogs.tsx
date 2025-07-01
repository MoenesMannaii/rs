"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import blogsData from '@/data/blogs.json';

interface Blog {
  id: string;
  title: string;
  image: string;
  teaser: string;
  location: string;
  activities: string[];
  description: string;
  comments: { name: string; comment: string; date: string }[];
}

const Blogs: React.FC = () => {
  const blogs: Blog[] = blogsData;

  return (
    <section
      id="places"
      className="py-24 bg-black px-4 sm:px-6 lg:px-8 text-gray-100"
      aria-labelledby="blogs-title"
    >
      <div className="max-w-7xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            id="blogs-title"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-green-400"
          >
            Discover Eco-Friendly Adventures
          </h2>
          <div className="mt-3 h-1 w-24 bg-green-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Explore sustainable travel experiences in Tunisia that blend adventure with eco-conscious practices.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
          <div
  key={blog.id}
  className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition-transform transform  hover:shadow-2xl flex flex-col"
  style={{ height: '420px' }}
>
  {/* Top Image */}
  <div className="relative h-56 w-full">
    <Image
      src={blog.image}
      alt={blog.title}
      fill
      className="object-cover"
    />
    <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
      {blog.location}
    </div>
  </div>

  {/* Content */}
  <div className="flex flex-col flex-grow p-5 text-gray-100">
    <h3 className="text-lg font-semibold mb-2 line-clamp-1">{blog.title}</h3>
    <p className="text-sm text-gray-400 flex-grow line-clamp-3">
      {blog.teaser}
    </p>

    <Link
      href={`/places/${blog.id}`}
      className="mt-4 inline-flex items-center justify-end text-green-400  hover:text-white font-medium py-2 px-4 rounded-lg transition"
    >
      Explore Now
      <svg
        className="ml-2 w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
