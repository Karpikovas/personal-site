exports.script = async function script(config) {
  const module = await import('./seed-content.ts')
  if (typeof module.script !== 'function') {
    throw new Error('seed-content.ts does not export script(config)')
  }
  await module.script(config)
}
