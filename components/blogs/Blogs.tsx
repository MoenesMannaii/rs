'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  image: { asset: { url: string } };
  teaser: string;
  location: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const query = `*[_type == "blog" && defined(slug.current)]{
        _id,
        title,
        slug,
        image { asset->{url} },
        teaser,
        location
      } | order(_createdAt desc)`;

      try {
        const data: Blog[] = await client.fetch(query);
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        Loading eco-adventures...
      </div>
    );
  }

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
            Explore sustainable travel experiences in Tunisia that blend
            adventure with eco-conscious practices.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs
            .filter((blog) => blog.slug?.current && blog.image?.asset?.url)
            .map((blog) => (
              <div
                key={blog._id}
                className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition-transform transform hover:shadow-2xl flex flex-col"
                style={{ height: '420px' }}
              >
                {/* Image */}
                <div className="relative h-56 w-full">
                  <Image
                    src={blog.image.asset.url}
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
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-400 flex-grow line-clamp-3">
                    {blog.teaser}
                  </p>

                  <Link
                   href={`/places/${blog.slug.current}`} 
                    className="mt-4 inline-flex items-center justify-end text-green-400 hover:text-white font-medium py-2 px-4 rounded-lg transition"
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
