import type { CollectionConfig } from 'payload'
import { optionalURLField } from '../shared/payload/fields.ts'
import { validateSlugNoSpaces } from '../shared/payload/validators.ts'

export const LiveOrchestralChamber: CollectionConfig = {
  slug: 'live-orchestral-chamber',
  orderable: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'cardSubtitle'],
  },
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
      validate: validateSlugNoSpaces,
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
    },
    optionalURLField('youtube', 'YouTube'),
    optionalURLField('video', 'Video URL'),
    optionalURLField('spotify', 'Spotify'),
    optionalURLField('apple', 'Apple Music'),
    optionalURLField('vk', 'VK Music'),
    optionalURLField('yandex', 'Yandex Music'),
    optionalURLField('zvuk', 'Zvuk'),
    optionalURLField('amazon', 'Amazon Music'),
  ],
}
