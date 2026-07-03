// Messages are now embedded directly in nuxt.config.ts locale definitions
// to ensure SSR renders translations on first load without hydration flash.
export default defineNuxtPlugin(() => {
  // no-op: kept for file structure, messages loaded via nuxt.config locales
})