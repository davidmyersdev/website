import { defineNuxtConfig } from 'nuxt'

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
        'js',
        'json',
        'powershell',
        'ts',
      ],
      theme: 'material-palenight',
    },
  },
  meta: {
    title: 'The Voracious Developer',
    link: [
      {
        rel: 'icon', type: 'image/png', href: '/icon.png',
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
        content: "I'm a full-stack web developer with a voracious appetite for knowledge, practice, and improvement.",
        hid: 'description',
        name: 'description',
      },
    ],
    script: [
      {
        defer: true,
        src: "https://neon-instant.voracious.dev/script.js",
        'data-site': "XUGBCQTL",
      },
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
