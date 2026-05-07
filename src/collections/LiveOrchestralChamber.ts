import type { CollectionConfig } from 'payload'
import { optionalURLField } from '../shared/payload/fields.ts'
import { getMusicPreviewPath } from '../shared/payload/preview.ts'
import { createCrossCollectionSlugValidator } from '../shared/payload/slug-validation.ts'

export const LiveOrchestralChamber: CollectionConfig = {
  slug: 'live-orchestral-chamber',
  orderable: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'cardSubtitle'],
    preview: (doc) =>
      getMusicPreviewPath({
        collection: 'live-orchestral-chamber',
        href: doc?.href,
        id: doc?.id,
      }),
    livePreview: {
      url: ({ data }) =>
        getMusicPreviewPath({
          collection: 'live-orchestral-chamber',
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
                currentCollection: 'live-orchestral-chamber',
                otherCollection: 'releases',
              }),
            },
            {
              name: 'cardSubtitle',
              label: 'Жанр',
              type: 'text',
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
                description: 'По умолчанию используется название произведения. Заполняйте только если нужно переопределить.',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Description',
              type: 'textarea',
              admin: {
                description: 'По умолчанию используется описание страницы. Заполняйте только если нужно переопределить.',
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
