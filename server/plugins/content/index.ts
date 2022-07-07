import { NitroApp } from 'nitropack'
import { og } from './og'
import { series } from './series'

export interface ContentFile {
  _id: string
  title: string
  series?: string | {
    name: string
    path: string
    slug: string
  }
}

export default defineNitroPlugin((nitro: NitroApp) => {
  nitro.hooks.hook('content:file:afterParse', async (file: ContentFile) => {
    await series(file)
    await og(file)
  })
})
