import type { GlobalConfig } from 'payload'

export const SiteSEO: GlobalConfig = {
  slug: 'site-seo',
  label: 'SEO (глобально)',
  admin: {
    group: 'SEO',
  },
  fields: [
    {
      name: 'title',
      label: 'Название сайта',
      type: 'text',
    },
    {
      name: 'title_meta',
      label: 'Title для главной страницы',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Описание сайта',
      type: 'textarea',
    },
    {
      name: 'keywords',
      label: 'Базовые SEO Keywords',
      type: 'textarea',
    },
    {
      name: 'url',
      label: 'Canonical URL',
      type: 'text',
    },
    {
      name: 'image',
      label: 'OpenGraph image URL',
      type: 'text',
    },
  ],
}
