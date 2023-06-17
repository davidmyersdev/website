import { SitemapStream, streamToPromise } from 'sitemap'
import { serverQueryContent } from '#content/server'
import { appConfig } from '~/composables/appConfig'

export default defineEventHandler(async (event) => {
  const posts = await serverQueryContent(event).find()
  const sitemap = new SitemapStream({
    hostname: 'https://davidmyers.dev'
  })

  // Homepage
  sitemap.write({
    changefreq: 'daily',
    url: '/',
  })

  // Blog
  sitemap.write({
    changefreq: 'daily',
    url: '/blog',
  })

  // Series
  appConfig.series.forEach(({ slug }) => {
    const url = `/series/${slug}`

    sitemap.write({
      changefreq: 'daily',
      url,
    })
  })

  // Posts
  posts.forEach(({ _path: url, updatedAt: lastmod }) => {
    sitemap.write({
      changefreq: 'weekly',
      lastmod,
      url,
    })
  })

  // Sheets
  sitemap.write({
    changefreq: 'monthly',
    url: '/sheets',
  })

  sitemap.end()

  return streamToPromise(sitemap)
})
