import { validateOptionalURL } from './validators.ts'

export const optionalURLField = (name: string, label: string) => ({
  name,
  label,
  type: 'text' as const,
  validate: validateOptionalURL,
})
