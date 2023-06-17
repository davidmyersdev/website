import { useNitro } from '@nuxt/kit'
import chalk from 'chalk'
import { existsSync } from 'fs'
import { relative } from 'path'
import sharp from 'sharp'
import { appConfig } from '~/composables/appConfig'
import type { ContentFile } from './index'

const calculateLineOffset = (lineCount: number, index: number, fontSize: number) => {
  const rowHeight = fontSize * 1.25
  const totalHeight = rowHeight * lineCount

  return (rowHeight * index) + (rowHeight / 2) + ((600 / 2) - (totalHeight / 2))
}

const isSpaceAt = (text: string, index: number) => {
  return text.charCodeAt(index) === ' '.charCodeAt(0)
}

const makeLines = (text: string): string[] => {
  let index = Math.floor(text.length / 2)

  while (index < text.length && !isSpaceAt(text, index)) { index++ }

  return [text.slice(0, index), text.slice(index)]
}

const makeImage = async ({ lines, output }: { lines: string[], output: string }) => {
  if (!existsSync(output)) {
    const logo = await sharp(appConfig.assets.logo).resize(60, 60).toBuffer()
    const site = Buffer.from(`
      <svg width="1920" height="80" viewBox="0 0 1920 80">
        <text font-family="Inter" x="50%" y="50" alignment-baseline="after-edge" text-anchor="middle" style="font-size: 60px;" fill="#aaaaaa">davidmyers.dev</text>
      </svg>
    `)
    const title = Buffer.from(`
      <svg width="1920" height="600" viewBox="0 0 1920 600">
        ${
          lines.map((line, index) => {
            return `
              <text font-family="Inter" x="50%" y="${calculateLineOffset(lines.length, index, 80)}" text-anchor="middle" style="font-size: 80px; font-family: Inter; font-weight: 700;" fill="#dddddd">${line}</text>
            `
          })
        }
      </svg>
    `)

    await sharp({
      create: {
        background: { r: 23, g: 23, b: 23 },
        channels: 3,
        height: 960,
        width: 1920,
      },
    })
      .composite([
        { input: site, top: 790, left: 0 },
        { input: logo, top: 100, left: 940 },
        { input: title },
      ])
      .png()
      .toFile(output)

    console.log(chalk.gray(`  ├─ ${relative(process.cwd(), output)}`))
  }
}

const makeName = (file: ContentFile) => {
  return file._id.split(':').pop()?.replace(/\.md$/, '')
}

export const og = async (file: ContentFile) => {
  const { options: { output: { publicDir } } } = useNitro()

  const output = `${publicDir}/og/content/${makeName(file)}.png`

  await makeImage({ lines: makeLines(file.title), output })

  if (typeof file.series === 'object') {
    const name = `${file.series.name} (Series)`
    const output = `${publicDir}/og/content/${file.series.slug}.png`

    await makeImage({ lines: [name], output })
  }
}

// These files are autoloaded by Nuxt, so we must provide a default export.
export default () => {}
