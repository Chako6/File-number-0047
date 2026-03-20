export default {
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    },
    {
      name: 'url',
      title: 'Website URL',
      type: 'url',
    },
    {
      name: 'tier',
      title: 'Sponsorship Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Title Sponsor', value: 'title' },
          { title: 'Gold', value: 'gold' },
          { title: 'Silver', value: 'silver' },
          { title: 'Partner', value: 'partner' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', media: 'logo', subtitle: 'tier' },
  },
}
