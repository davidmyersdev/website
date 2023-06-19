import sharp from 'sharp'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          href: '/logo-dark-20x20.png',
          rel: 'icon',
          type: 'image/png',
        },
        {
          crossorigin: '',
          href: 'https://fonts.gstatic.com',
          rel: 'preconnect',
        },
      ],
      meta: [
        {
          name: 'description',
          content: 'Stay current in the evolving world of web development.',
        },
        {
          property: 'og:description',
          content: 'Stay current in the evolving world of web development.',
        },
        {
          property: 'og:image',
          content: 'https://cdn.davidmyers.dev/og/default.png',
        },
        {
          property: 'og:title',
          content: 'David Myers | Dev',
        },
        {
          property: 'og:url',
          content: 'https://davidmyers.dev',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:site',
          content: '@davidmyersdev',
        },
        {
          name: 'twitter:creator',
          content: '@davidmyersdev',
        },
      ],
      script: [
        ({
          async: true,
          defer: true,
          src: 'https://cdn.usefathom.com/script.js',
          'data-site': process.env.NODE_ENV === 'production' ? 'XUGBCQTL' : '',
        }),
      ],
      title: 'David Myers | Dev',
    },
  },
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
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],
  nitro: {
    plugins: [
      '~/server/plugins/content/index.ts',
    ],
    prerender: {
      routes: [
        '/sitemap.xml',
      ],
    },
  },
  router: {
    options: {
      strict: true,
    },
  },
  runtimeConfig: {
    email: {
      api: {
        token: 'email_api_token',
        url: 'email_api_url',
      },
    },
    public: {
      baseUrl: 'https://davidmyers.dev',
    },
  },
  sourcemap: true,
  ssr: true,
  tailwindcss: {
    configPath: '~/tailwind.config.cjs',
  },
})
