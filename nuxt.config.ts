import en from './i18n/en.json'
import ar from './i18n/ar.json'
import tr from './i18n/tr.json'

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
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    locales: ['en', 'ar', 'tr'],
    bundle: {
      fullInstall: true,
    },
    vueI18n: './i18n.config.ts',
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
  app: {
    baseURL: '/myportfolio/',
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