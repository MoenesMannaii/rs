import BlogDetailClient from '@/components/BlogDetailClient';
import { liveSanityFetch } from '@/sanity/lib/live';
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

  const result = await liveSanityFetch({ query, params: { slug } });
  const blog: Blog | null = result?.data ?? null;

  return <BlogDetailClient blog={blog} />;
}
