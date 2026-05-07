import type { CollectionConfig } from 'payload'
import { optionalURLField } from '../shared/payload/fields.ts'
import { getMusicPreviewPath } from '../shared/payload/preview.ts'
import { createCrossCollectionSlugValidator } from '../shared/payload/slug-validation.ts'

const getReleaseTypeValue = (value: unknown): string | undefined => {
  if (typeof value === 'string') return value

  if (value && typeof value === 'object' && 'value' in value) {
    const innerValue = (value as { value?: unknown }).value
    if (typeof innerValue === 'string') return innerValue
  }

  return undefined
}

const isAlbumType = (value: unknown): boolean => getReleaseTypeValue(value)?.toLowerCase() === 'album'

export const Releases: CollectionConfig = {
  slug: 'releases',
  orderable: true,
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (!data) return data

        if (operation === 'create' && !isAlbumType(data.type)) {
          data.items = []
        }

        return data
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'releaseYear'],
    preview: (doc) =>
      getMusicPreviewPath({
        collection: 'releases',
        href: doc?.href,
        id: doc?.id,
      }),
    livePreview: {
      url: ({ data }) =>
        getMusicPreviewPath({
          collection: 'releases',
          href: data?.href,
          id: data?.id,
        }),
    },
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
              required: true,
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
              type: 'row',
              admin: {
                condition: (data, siblingData) => isAlbumType(siblingData?.type ?? data?.type),
              },
              fields: [
                {
                  name: 'items',
                  label: 'Треки альбома',
                  type: 'array',
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
              name: 'seoTitle',
              label: 'SEO Title',
              type: 'text',
              admin: {
                description: 'По умолчанию используется название релиза. Заполняйте только если нужно переопределить.',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Description',
              type: 'textarea',
              admin: {
                description: 'По умолчанию используется поле "Описание". Заполняйте только если нужно переопределить.',
              },
            },
            {
              name: 'keywords',
              label: 'SEO Keywords',
              type: 'text',
              admin: {
                description: 'К этим ключевым словам автоматически добавятся базовые ключевые слова из глобальных SEO-настроек.',
              },
            },
          ],
        },
      ],
    },
  ],
}
