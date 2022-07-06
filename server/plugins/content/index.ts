import { loadOptions, NitroApp } from 'nitropack'
import { makeImage } from './og'

const isSpaceAt = (text: string, index: number) => {
  return text.charCodeAt(index) === ' '.charCodeAt(0)
}

const makeLines = (text: string): string[] => {
  let index = Math.floor(text.length / 2)

  while (index < text.length && !isSpaceAt(text, index)) { index++ }

  return [text.slice(0, index), text.slice(index)]
}

const makeName = (file: { _id: string }) => {
  return file._id.split(':').pop().replace(/\.md$/, '')
}

export default defineNitroPlugin((nitro: NitroApp) => {
  nitro.hooks.hook('content:file:afterParse', async (file) => {
    const options = await loadOptions()
    const output = `${options.output.publicDir}/og/content/${makeName(file)}.png`

    await makeImage({ lines: makeLines(file.title), output })
  })
})
