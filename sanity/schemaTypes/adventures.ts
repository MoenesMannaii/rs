export default {
  name: 'adventure',
  title: 'Adventure',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3).max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Camping', value: 'camping' },
          { title: 'Hiking', value: 'hiking' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tariff',
      title: 'Tariff',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "2 Days"',
      validation: (Rule : any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule : any) => Rule.required().min(10),
    },
    {
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Activity Name',
              type: 'string',
              validation: (Rule : any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Activity Description',
              type: 'text',
              validation: (Rule : any) => Rule.required().min(10),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule : any) => Rule.required().min(1),
    },
    {
      name: 'program',
      title: 'Program',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              description: 'e.g. "Day 1"',
              validation: (Rule : any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule : any) => Rule.required().min(10),
            },
          ],
          preview: {
            select: {
              title: 'day',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule : any) => Rule.required().min(1),
    },
     {
  name: 'gears',
  title: 'Gears',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Gear Name',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule: any) => Rule.required(),
        },
      ],
      preview: {
        select: {
          title: 'name',
          media: 'icon',
        },
      },
    },
  ],
  validation: (Rule: any) => Rule.required().min(1),
},

    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1).max(10),
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      accept: 'video/mp4',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};