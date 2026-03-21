export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (R) => R.required(),
    },
    { name: 'role_en', title: 'Role (English)', type: 'string', validation: (R) => R.required() },
    { name: 'role_tr', title: 'Role (Turkish)', type: 'string' },
    {
      name: 'dept',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Leadership', value: 'leadership' },
          { title: 'Mechanical Design', value: 'mechanical_design' },
          { title: 'Electric & Software', value: 'electric_software' },
          { title: 'Team Operations', value: 'team_ops' },
        ],
      },
      validation: (R) => R.required(),
    },
    {
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'e.g. 2025/26',
      validation: (R) => R.required(),
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the department',
    },
  ],
  orderings: [
    {
      title: 'Department + Order',
      name: 'deptOrder',
      by: [
        { field: 'dept', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role_en', media: 'photo' },
  },
}
