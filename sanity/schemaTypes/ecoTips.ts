import { defineField, defineType } from 'sanity'
import { Leaf, Globe, Mountain, ShoppingBag, Recycle } from 'lucide-react'

export default defineType({
  name: 'ecoTip',
  title: 'Eco Tip',
  type: 'document',
  icon: Leaf,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Leaf', value: 'leaf' },
          { title: 'Globe', value: 'globe' },
          { title: 'Mountain', value: 'mountain' },
          { title: 'Shopping Bag', value: 'shoppingBag' },
          { title: 'Recycle', value: 'recycle' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Learn More Link',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls the order in which the tips appear',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'icon',
    },
  },
})
