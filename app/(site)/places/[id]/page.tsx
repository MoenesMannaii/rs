'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogDetailClient from '@/components/BlogDetailClient';

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

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    import('@/data/blogs.json').then((mod) => {
      const found = mod.default.find((b: Blog) => b.id === id);
      setBlog(found || null);
    });
  }, [id]);

  return <BlogDetailClient blog={blog} />;
}
