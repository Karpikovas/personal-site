import type { CollectionConfig } from 'payload'
import { optionalURLField } from '../shared/payload/fields.ts'
import { createCrossCollectionSlugValidator } from '../shared/payload/slug-validation.ts'

export const Releases: CollectionConfig = {
  slug: 'releases',
  orderable: true,
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (!data) return data

        if (operation === 'create' && data.type !== 'album') {
          data.items = []
        }

        return data
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'releaseYear'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Основная информация',
          fields: [
            {
              name: 'name',
              label: 'Название',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              label: 'Slug (href)',
              type: 'text',
              required: true,
              unique: true,
              validate: createCrossCollectionSlugValidator({
                currentCollection: 'releases',
                otherCollection: 'live-orchestral-chamber',
              }),
            },
            {
              name: 'type',
              label: 'Тип',
              type: 'select',
              required: true,
              options: [
                { label: 'Single', value: 'single' },
                { label: 'EP', value: 'ep' },
                { label: 'Album', value: 'album' },
              ],
            },
            {
              name: 'group',
              label: 'Группа (жанровая секция)',
              type: 'text',
              required: true,
            },
            {
              name: 'cardSubtitle',
              label: 'Жанр',
              type: 'text',
            },
            {
              name: 'releaseYear',
              label: 'Год релиза',
              type: 'number',
              min: 1900,
              max: 2200,
            },
            {
              name: 'description',
              label: 'Описание',
              type: 'textarea',
            },
            {
              name: 'cover',
              label: 'Обложка',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'items',
              label: 'Треки альбома',
              type: 'array',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'album',
              },
              fields: [
                { name: 'name', label: 'Название трека', type: 'text', required: true },
                { name: 'youtube', label: 'YouTube', type: 'text' },
                { name: 'youtube_music', label: 'YouTube Music', type: 'text' },
                { name: 'spotify', label: 'Spotify', type: 'text' },
                { name: 'apple', label: 'Apple Music', type: 'text' },
                { name: 'vk', label: 'VK Music', type: 'text' },
                { name: 'yandex', label: 'Yandex Music', type: 'text' },
                { name: 'zvuk', label: 'Zvuk', type: 'text' },
                { name: 'amazon', label: 'Amazon Music', type: 'text' },
                { name: 'video', label: 'Video URL', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Ссылки',
          fields: [
            optionalURLField('youtube', 'YouTube'),
            optionalURLField('video', 'Video URL'),
            optionalURLField('spotify', 'Spotify'),
            optionalURLField('apple', 'Apple Music'),
            optionalURLField('vk', 'VK Music'),
            optionalURLField('yandex', 'Yandex Music'),
            optionalURLField('zvuk', 'Zvuk'),
            optionalURLField('amazon', 'Amazon Music'),
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'keywords',
              label: 'SEO Keywords',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
