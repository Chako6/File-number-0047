export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title_en',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[şŞ]/g, 's')
            .replace(/[ğĞ]/g, 'g')
            .replace(/[ıİ]/g, 'i')
            .replace(/[öÖ]/g, 'o')
            .replace(/[üÜ]/g, 'u')
            .replace(/[çÇ]/g, 'c')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-'),
      },
      validation: (R) => R.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sponsor', value: 'sponsor' },
          { title: 'Team', value: 'team' },
          { title: 'Development', value: 'development' },
          { title: 'Event', value: 'event' },
        ],
      },
      validation: (R) => R.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (R) => R.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'title_en', title: 'Title (English)', type: 'string', validation: (R) => R.required() },
    { name: 'title_tr', title: 'Title (Turkish)', type: 'string' },
    { name: 'description_en', title: 'Description (English)', type: 'text', rows: 3 },
    { name: 'description_tr', title: 'Description (Turkish)', type: 'text', rows: 3 },
    {
      name: 'body_en',
      title: 'Body (English)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'body_tr',
      title: 'Body (Turkish)',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title_en', media: 'image', subtitle: 'date' },
  },
}
