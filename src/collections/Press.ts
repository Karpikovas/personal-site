import type { CollectionConfig } from 'payload'
import { validateRequiredURL } from '../shared/payload/validators.ts'

export const Press: CollectionConfig = {
  slug: 'press',
  orderable: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'source', 'createdDate'],
  },
  fields: [
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
      validate: validateRequiredURL,
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
      name: 'relatedTrack',
      label: 'Связанный релиз/произведение',
      type: 'relationship',
      relationTo: ['releases', 'live-orchestral-chamber'],
      hasMany: false,
      required: true,
    },
  ],
}
