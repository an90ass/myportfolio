<template>
  <div :class="['min-h-screen transition-colors duration-300', colorMode.value === 'dark' ? 'dark' : '']">
    <NuxtPage />
    <ChatBot />
    <JobMatcherModal />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
    dir: computed(() => locale.value === 'ar' ? 'rtl' : 'ltr')
  }
})
</script>
