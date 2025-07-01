// schemas/blog.ts
export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule : any) => Rule.required() },
    { name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'video', title: 'Video URL', type: 'url' },
    { name: 'teaser', title: 'Teaser', type: 'text' },
    { name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image' }] },
    { name: 'description', title: 'Main Description', type: 'text' },
    { name: 'createdAt', title: 'Created At', type: 'datetime', initialValue: () => new Date().toISOString() },
  ],
};
