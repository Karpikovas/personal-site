import type { CollectionConfig } from 'payload'

export const LiveOrchestralChamber: CollectionConfig = {
  slug: 'live-orchestral-chamber',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['displayOrder', 'name', 'group'],
  },
  fields: [
    {
      name: 'displayOrder',
      label: 'Номер отображения в списке',
      type: 'number',
      required: true,
    },
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
      defaultValue: 'single',
    },
    {
      name: 'group',
      label: 'Группа',
      type: 'text',
      defaultValue: 'Orchestral (live) & Chamber',
    },
    {
      name: 'cardSubtitle',
      label: 'Подзаголовок карточки',
      type: 'text',
    },
    {
      name: 'cover',
      label: 'Обложка',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'image',
      label: 'Legacy image filename (из /public/covers)',
      type: 'text',
    },
    {
      name: 'youtubeLinks',
      label: 'Legacy youtube links',
      type: 'array',
      admin: {
        hidden: true,
      },
      fields: [
        {
          name: 'url',
          label: 'YouTube URL',
          type: 'text',
        },
      ],
    },
    { name: 'youtube', label: 'YouTube', type: 'text' },
    { name: 'video', label: 'Video URL', type: 'text' },
    { name: 'spotify', label: 'Spotify', type: 'text' },
    { name: 'apple', label: 'Apple Music', type: 'text' },
    { name: 'vk', label: 'VK Music', type: 'text' },
    { name: 'yandex', label: 'Yandex Music', type: 'text' },
    { name: 'zvuk', label: 'Zvuk', type: 'text' },
    { name: 'amazon', label: 'Amazon Music', type: 'text' },
  ],
}
