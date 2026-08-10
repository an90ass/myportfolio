
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
    lazy: false,
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'ar', language: 'ar-YE', dir: 'rtl' },
      { code: 'tr', language: 'tr-TR' },
    ],
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
      title: 'Anas Eskander — Software Engineer',
      meta: [
        { name: 'description', content: 'Software Engineer specializing in mobile & backend development — Flutter, Python, .NET, Databases, Cloud & DevOps.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0a0f1a' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/myportfolio/favicon.ico' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/myportfolio/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@300;400;600;700;900&display=swap'
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
})