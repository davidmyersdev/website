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
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'true',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap',
      },
    ],
    meta: [
      {
        content: 'I am a full-stack web developer with a voracious appetite for knowledge, practice, and improvement.',
        hid: 'description',
        name: 'description',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/og/default.png',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@voraciousdev',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@voraciousdev',
      },
    ],
    script: [
      ({
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
