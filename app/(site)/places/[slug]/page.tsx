import BlogDetailClient from '@/components/BlogDetailClient';
import { client } from '@/sanity/lib/client';
import { Blog } from '@/sanity/types/blog'; // adjust the path as needed

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const query = `*[_type == "blog" && slug.current == $slug][0]{
    title,
    slug,
    teaser,
    image { asset->{url} },
    video,
    location,
    activities,
    contentSections[] {
      title,
      description,
      images[]{ asset->{url} }
    },
    ecotourism_title,
    ecotourism,
    whatToDo_title,
    whatToDo,
    whatToDo_gallery[]{ asset->{url} },
    whyvisit_title,
    whyvisit,
    whyvisit_gallery[]{ asset->{url} },
    gallery[]{ asset->{url} },
    sources,
    comments[] {
      name,
      comment,
      date
    }
  }`;

  const blog: Blog | null = await client.fetch(query, { slug });

  return <BlogDetailClient blog={blog} />;
}
