import { defineNuxtConfig } from 'nuxt'
import sharp from 'sharp'

export default defineNuxtConfig({
  buildModules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
  ],
  content: {
    highlight: {
      preload: [
        'bash',
        'css',
        'html',
        'ini',
        'js',
        'json',
        'powershell',
        'ts',
        'yaml',
      ],
      theme: 'material-palenight',
    },
  },
  hooks: {
    'build:before': () => {
      // https://sharp.pixelplumbing.com/install#worker-threads
      sharp()
    },
  },
  meta: {
    title: 'The Voracious Developer',
    link: [
      {
        rel: 'icon', type: 'image/png', href: '/logo-dark-20x20.png',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'true',
      },
    ],
    meta: [
      {
        name: 'description',
        content: 'I am a full-stack web developer with a voracious appetite for knowledge, practice, and improvement.',
      },
      {
        property: 'og:description',
        content: 'I am a full-stack web developer with a voracious appetite for knowledge, practice, and improvement.',
      },
      {
        property: 'og:image',
        content: 'https://cdn.voracious.dev/og/default.png',
      },
      {
        property: 'og:title',
        content: 'The Voracious Developer',
      },
      {
        property: 'og:url',
        content: 'https://voracious.dev',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: '@voraciousdev',
      },
      {
        name: 'twitter:creator',
        content: '@voraciousdev',
      },
    ],
    script: [
      ({
        async: true,
        defer: true,
        src: 'https://neon-instant.voracious.dev/script.js',
        'data-site': process.env.NODE_ENV === 'production' ? 'XUGBCQTL' : '',
      }),
    ],
  },
  nitro: {
    plugins: [
      '~/server/plugins/content/index.ts',
    ],
  },
  router: {
    trailingSlash: false,
    options: {
      strict: true,
    },
  },
  ssr: true,
  tailwindcss: {
    configPath: '~/tailwind.config.cjs',
  },
  target: 'static',
})
