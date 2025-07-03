// /schemas/blog.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Blog Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (auto-generated)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'file',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'images',
              title: 'Images (Max 2)',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
              validation: (Rule) => Rule.max(2),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'ecotourism_title',
      title: 'Ecotourism Title',
      type: 'string',
    }),
    defineField({
      name: 'ecotourism',
      title: 'Ecotourism Content',
      type: 'text',
    }),
    defineField({
      name: 'whatToDo_title',
      title: 'Why choose this place (Title)?',
      type: 'string',
    }),
    defineField({
      name: 'whatToDo',
      title: 'Why choose this place (Content)?',
      type: 'text',
    }),
    defineField({
      name: 'whatToDo_gallery',
      title: 'Why choose this place (Gallery)',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'whyvisit_title',
      title: 'Why Visit Title',
      type: 'string',
    }),
    defineField({
      name: 'whyvisit',
      title: 'Why Visit Content',
      type: 'text',
    }),
    defineField({
      name: 'whyvisit_gallery',
      title: 'Why Visit Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Main Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'sources',
      title: 'Sources / Attribution',
      type: 'string',
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'comment', type: 'text', title: 'Comment' },
            { name: 'date', type: 'datetime', title: 'Date' },
          ],
        },
      ],
    }),
  ],
});
