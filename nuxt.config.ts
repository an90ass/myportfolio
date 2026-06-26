// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
compatibilityDate: '2025-01-01',
  devtools: { enabled: false },


  ssr: true,
nitro: {
    output: {
      publicDir: './docs' 
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/motion/nuxt',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English', dir: 'ltr' },
      { code: 'ar', iso: 'ar-YE', file: 'ar.json', name: 'العربية', dir: 'rtl' },
      { code: 'tr', iso: 'tr-TR', file: 'tr.json', name: 'Türkçe', dir: 'ltr' }
    ],
    lazy: true,
    langDir: '../i18n/', // since app is configured or project has a srcDir, let's see where srcDir points or if it's default. Let's make sure it reaches /i18n folder
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },

  app: {
            baseURL: '/me/', 
    buildAssetsDir: 'assets',
    head: {
      title: 'Anas AL-MAQTARI — Flutter Developer',
  
      meta: [
        { name: 'description', content: 'Flutter Developer specializing in AI-powered mobile apps, IoT systems, and clean architecture. Based in Kocaeli, Türkiye.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0a0f1a' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
})
