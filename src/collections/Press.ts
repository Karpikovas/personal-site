import type { CollectionConfig } from 'payload'
import { setOrderableToTopOnCreate } from '../shared/payload/orderable.ts'
import { getPressPreviewPath } from '../shared/payload/preview.ts'
import { validateRequiredURL } from '../shared/payload/validators.ts'

export const Press: CollectionConfig = {
  slug: 'press',
  orderable: true,
  hooks: {
    beforeChange: [setOrderableToTopOnCreate({ collection: 'press' })],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'source', 'createdDate'],
    pagination: {
      defaultLimit: 50,
      limits: [25, 50, 100],
    },
    preview: (doc) => getPressPreviewPath(doc?.id),
    livePreview: {
      url: ({ data }) => getPressPreviewPath(data?.id),
    },
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
        description: 'Формат даты: дд.мм.гггг',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },
    {
      name: 'isVisible',
      label: 'Показывать на сайте',
      type: 'checkbox',
      defaultValue: true,
      access: {
        read: ({ req }) => Boolean(req.user),
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
