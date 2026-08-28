<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300"
    :class="scrolled
      ? 'bg-bg-primary/90 border-bg-border dark:bg-bg-primary/90'
      : 'bg-transparent border-transparent'"
  >
    <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="font-mono font-medium text-sm text-text-primary hover:text-accent-amber transition-colors">
        <span class="text-accent-amber font-bold">#</span>anas.dev
      </a>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-6 text-sm text-text-secondary">
        <li v-for="item in navItems" :key="item.href">
          <a :href="item.href"
             class="hover:text-text-primary transition-colors duration-200 py-1"
             @click.prevent="scrollTo(item.href)">
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- Right side actions -->
      <div class="flex items-center gap-3">
        <!-- Language Switcher Dropdown -->
        <div class="relative lang-switcher">
          <button
            @click="isLangOpen = !isLangOpen"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-bg-card border border-bg-border hover:border-accent-amber/40
                   transition-all duration-200 text-text-secondary hover:text-text-primary text-sm font-medium"
            aria-label="Select Language"
          >
            <Globe :size="15" />
            <span class="uppercase font-semibold text-xs">{{ locale }}</span>
          </button>
          
          <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="isLangOpen"
              class="absolute right-0 mt-2 w-32 rounded-xl bg-bg-card/95 backdrop-blur-md border border-bg-border shadow-lg py-1 z-50"
            >
              <button
                v-for="loc in availableLocales"
                :key="loc.code"
                @click="changeLocale(loc.code)"
                class="w-full text-left px-4 py-2 text-sm hover:bg-bg-hover transition-colors duration-150 flex items-center justify-between cursor-pointer"
                :class="locale === loc.code ? 'text-accent-amber font-semibold' : 'text-text-secondary'"
              >
                <span>{{ loc.name }}</span>
                <span class="text-xs uppercase text-text-muted font-mono">{{ loc.code }}</span>
              </button>
            </div>
          </Transition>
        </div>

        <!-- Theme toggle -->
        <button
          @click="toggleColorMode"
          class="p-2 rounded-lg bg-bg-card border border-bg-border hover:border-accent-amber/40
                 transition-all duration-200 text-text-secondary hover:text-text-primary"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="isDark" :size="16" />
          <Moon v-else :size="16" />
        </button>

        <!-- Download CV -->
        <a href="/Anas_Eskander_CV.pdf" download="Anas_Eskander_CV.pdf"
           class="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-amber/10 border border-accent-amber/30
                  text-accent-amber text-sm font-medium hover:bg-accent-amber/20 transition-all duration-200">
          <Download :size="14" />
          {{ $t('nav.cv') }}
        </a>

        <!-- Contact CTA (Direct Gmail) -->
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anass12976@gmail.com"
           target="_blank"
           rel="noopener noreferrer"
           class="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-amber
                  text-stone-950 text-sm font-bold hover:bg-accent-gold shadow-sm hover:shadow-accent-amber/20 transition-all duration-200 cursor-pointer">
          <Mail :size="14" />
          {{ $t('nav.contact') }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Sun, Moon, Mail, Download, Globe } from 'lucide-vue-next'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { t, locale, setLocale } = useI18n()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const scrolled = ref(false)
const isLangOpen = ref(false)

const availableLocales = computed(() => [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'tr', name: 'Türkçe' },
])

const navItems = computed(() => [
  { href: '#services',   label: t('nav.services') },
  { href: '#tech',       label: t('nav.techStack') },
  { href: '#projects',   label: t('nav.projects') },
  { href: '#experience', label: t('nav.experience') },
  { href: '#education',  label: t('nav.education') },
  { href: '#contact',    label: t('nav.contact') },
])

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

function changeLocale(code: string) {
  setLocale(code)
  if (typeof document !== 'undefined') {
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = code
  }
  isLangOpen.value = false
}

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function closeDropdown(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.lang-switcher')) {
    isLangOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('click', closeDropdown)
})
</script>

