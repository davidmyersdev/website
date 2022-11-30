import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { build } from 'vite'

const fnDir = resolve('./server/api')
const fnFiles = readdirSync(fnDir)

await Promise.all(
  fnFiles.map(async (fnFile) => {
    const name = fnFile.split('/').pop()?.split('.').shift()!

    await build({
      build: {
        lib: {
          entry: resolve(fnDir, fnFile),
          fileName: 'index',
          formats: ['es'],
        },
        outDir: resolve(`./.vercel/output/functions/api/${name}.func`),
      },
      envPrefix: 'NUXT_',
      publicDir: resolve('./edge'),
    })
  })
)
