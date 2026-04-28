import type { CollectionConfig } from 'payload'

export const Press: CollectionConfig = {
  slug: 'press',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['order', 'name', 'source', 'createdDate'],
  },
  fields: [
    {
      name: 'order',
      label: 'Порядок отображения',
      type: 'number',
      required: true,
    },
    {
      name: 'name',
      label: 'Название публикации',
      type: 'text',
      required: true,
    },
    {
      name: 'href',
      label: 'Ссылка',
      type: 'text',
      required: true,
    },
    {
      name: 'source',
      label: 'Издание',
      type: 'text',
    },
    {
      name: 'createdDate',
      label: 'Дата публикации',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'image',
      label: 'Legacy image filename (из /public/covers)',
      type: 'text',
    },
    {
      name: 'cover',
      label: 'Изображение (upload)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'relatedTrack',
      label: 'Связанный релиз/произведение',
      type: 'relationship',
      relationTo: ['releases', 'live-orchestral-chamber'],
      hasMany: false,
    },
  ],
}
