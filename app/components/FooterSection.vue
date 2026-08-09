<template>
  <footer class="border-t border-bg-border mt-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <a href="#" class="font-mono font-medium text-sm text-text-primary mb-3 inline-block">
            <span class="text-accent-blue">#</span>anas.dev
          </a>
          <p class="text-text-muted text-xs leading-relaxed max-w-xs">
            {{ $t('footer.brand') }}
          </p>
        </div>

        <!-- Quick links -->
        <div>
          <p class="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">{{ $t('footer.quickLinks') }}</p>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.href">
              <a :href="link.href"
                 class="text-xs text-text-secondary hover:text-text-primary transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Tech used -->
        <div>
          <p class="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">{{ $t('footer.builtWith') }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="t in builtWith" :key="t" class="tech-badge">{{ t }}</span>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="pt-6 border-t border-bg-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-text-muted">
          © {{ new Date().getFullYear() }} Anas Eskander — {{ $t('footer.copyright') }}
          <span class="text-red-400">♥</span>
        </p>
        <div class="flex items-center gap-4">
          <a v-for="s in socials" :key="s.href" :href="s.href" target="_blank"
             class="text-text-muted hover:text-text-primary transition-colors">
            <component :is="s.icon" :size="16" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Github, Linkedin, Mail } from 'lucide-vue-next'
import { computed } from 'vue'

const { t } = useI18n()

const navLinks = computed(() => [
  { href: '#about',      label: t('nav.about') },
  { href: '#services',   label: t('nav.services') },
  { href: '#projects',   label: t('nav.projects') },
  { href: '#tech',       label: t('nav.techStack') },
  { href: '#experience', label: t('nav.experience') },
  { href: '#contact',    label: t('nav.contact') },
])

const builtWith = ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'Motion']

const socials = [
  { icon: Github,   href: 'https://github.com/an90ass/' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/anas-a-12815124b/' },
  { icon: Mail,     href: 'mailto:anass12976@gmail.com' },
]
</script>

