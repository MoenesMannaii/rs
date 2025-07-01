"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Testimonial {
  _id: string;
  name: string;
  title: string;
  message: string;
  image?: SanityImageSource;
}

const TestimonialSlider: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const query = `*[_type == "testimonial"] | order(_createdAt desc)[0...5] {
        _id,
        name,
        title,
        message,
        image
      }`;

      const data: Testimonial[] = await client.fetch(query);
      setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length) {
    return <p className="text-center text-gray-600 py-20">Loading testimonials...</p>;
  }

  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl text-zinc-900 uppercase font-bold">What People Say</h2>
        <div className="mt-3 h-1 w-48 mb-10 bg-green-500 mx-auto rounded"></div>

        <div className="relative transition-all duration-500">
          {testimonials.map((t, index) => (
            <div
              key={t._id}
              className={`transition-opacity duration-700 ease-in-out ${
                index === current ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              <div className="flex flex-col items-center">
                {t.image && (
                  <div className="relative w-20 h-20 mb-4">
                    <Image
                      src={urlFor(t.image).width(80).height(80).url()}
                      alt={t.name}
                      fill
                      className="rounded-full object-cover border-2 border-green-500"
                    />
                  </div>
                )}
                <p className="text-lg text-gray-700 max-w-xl italic mb-6">&quot;{t.message}&quot;</p>
                <div className="text-zinc-900 font-semibold">{t.name}</div>
                <div className="text-sm text-gray-500">{t.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full transition ${
                idx === current ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
