// https://nuxt.com/docs/api/configuration/nuxt-config

import postcss from './postcss.config.js'

export default defineNuxtConfig({
  ssr: true,

  modules: [
    '@vueuse/nuxt',
  ],

  components: {
    global: true,
    dirs: [
      '~/components',
      // '~/components/common',
      // '~/components/fragments',
      // '~/components/global',
      // '~/components/modules',
      // '~/components/teasers',
      // { path: '~/components/navigation', extensions: ['vue'] },
    ]
  },

  nitro: {
    preset: 'netlify',
    // plugins: [
    //   '~/server/plugins/cors'
    // ]
  },

  css: [
    '~/assets/css/index.css',
  ],
})

/*
import postcss from './postcss.config.js'

// import VitePluginFonts from 'vite-plugin-fonts'

console.log('process.env.INTERCOM_APP_ENABLED,: ', process.env.INTERCOM_APP_ENABLED)

export default defineNuxtConfig({
  ssr: true,

  // env: process.env,
  // debug: process.env.BASE_URL?.includes('localhost'),

  postcss,
  // target: process.env.TARGET || 'static',
  runtimeConfig: {
    // Private config that is only available on the server
    apiSecret: '123',
    // Config within public will be also exposed to the client
    public: {
      BASE_URL: process.env.BASE_URL,
      CMS_URL: process.env.CMS_URL,
      BASE_API_URL: process.env.BASE_API_URL,
      api: process.env.BASE_API_URL,
      GTM_ID: process.env.GTM_ID,
      GTM_ENABLE: process.env.GTM_ENABLE,
      GTM_DEBUG: process.env.GTM_DEBUG,
      SMARTRECRUITERS_SMART_TOKEN: process.env.SMARTRECRUITERS_SMART_TOKEN,
      INTERCOM_APP_ID: process.env.INTERCOM_APP_ID,
      INTERCOM_APP_ENABLED: process.env.INTERCOM_APP_ENABLED,
    }
  },
  modules: [
    '@vueuse/nuxt',
    // '@pinia/nuxt',
    // '@nuxtjs/svg',
  ],
  components: {
    global: true,
    dirs: [
      '~/components',
      '~/components/common',
      '~/components/fragments',
      '~/components/global',
      '~/components/modules',
      '~/components/teasers',
      // { path: '~/components/navigation', extensions: ['vue'] },
    ]
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    // layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  plugins: [
    { src: "~/plugins/disableLogs.js" },
  ],

  nitro: {
    preset: 'netlify',
    // plugins: [
    //   '~/server/plugins/cors'
    // ]
  },

  css: [
    '~/assets/css/index.css',
  ],
})
*/