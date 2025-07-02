// /schemas/hero.ts

export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule : any) => Rule.required().max(100),
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      validation: (Rule : any) => Rule.required().max(300),
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule : any) => Rule.required(),
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      validation: (Rule : any) => Rule.required().uri({
        allowRelative: true,
        scheme: ['http', 'https'],
      }),
    },
  ],
};
