export const isValidURL = (value: string) => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export const validateOptionalURL = (value: unknown) => {
  if (value == null || value === '') return true
  if (typeof value !== 'string') return 'Введите строку URL'
  return isValidURL(value) ? true : 'Введите корректный URL (https://...)'
}

export const validateRequiredURL = (value: unknown) => {
  if (typeof value !== 'string' || value.trim().length === 0) return 'Ссылка обязательна'
  return isValidURL(value) ? true : 'Введите корректный URL (https://...)'
}

export const validateSlugNoSpaces = (value: unknown) => {
  if (typeof value !== 'string' || value.trim().length === 0) return 'Slug обязателен'
  if (value.includes(' ')) return 'Slug не должен содержать пробелы'
  return true
}
