// schemas/blogComment.ts
export default {
  name: 'blogComment',
  title: 'Blog Comment',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule : any) => Rule.required() },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'comment', title: 'Comment', type: 'text', validation: (Rule : any) => Rule.required().min(5) },
    { name: 'blog', title: 'Blog', type: 'reference', to: [{ type: 'blog' }], validation: (Rule : any) => Rule.required() },
    { name: 'approved', title: 'Approved', type: 'boolean', initialValue: false },
    { name: 'createdAt', title: 'Created At', type: 'datetime', initialValue: () => new Date().toISOString() },
  ],
};
