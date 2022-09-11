import { appConfig } from '~/composables/appConfig'
import type { ContentFile } from './index'

export const series = async (file: ContentFile) => {
  const series = appConfig.series.find(s => s.slug === file.series)

  if (series) {
    file.series = {
      name: series.name,
      path: `/series/${series.slug}`,
      slug: series.slug,
    }
  }
}

// These files are autoloaded by Nuxt, so we must provide a default export.
export default () => {}
