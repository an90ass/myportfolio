<template>
  <section class="pt-8 sm:pt-14 pb-12 sm:pb-16">
    <div
      v-motion
      :initial="{ opacity: 0, y: 24 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      class="space-y-10"
    >
      <!-- Top Grid: Intro Narrative + Portrait -->
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14">
        <!-- Left / Main narrative -->
        <div class="flex-1 max-w-2xl">
          <!-- Status & availability badge -->
          <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-accent-amber text-xs font-mono mb-6 backdrop-blur-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
            </span>
            <span class="font-medium tracking-wide uppercase">{{ $t('hero.available') }}</span>
          </div>

          <!-- Big Editorial Headline -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.12] mb-6">
            {{ $t('hero.greeting') }}
            <span class="block mt-1 gradient-text font-extrabold">ANAS ESKANDER</span>
          </h1>

          <!-- Single Unified Rich Narrative -->
          <div class="space-y-3.5 text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            <p v-html="p1Formatted" class="first-letter:text-3xl first-letter:font-bold first-letter:text-accent-amber first-letter:mr-1"></p>
            <p v-html="p2Formatted" class="text-sm sm:text-base text-text-muted"></p>
          </div>

          <!-- Harmonious Links Row -->
          <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            <!-- Projects -->
            <a
              href="#projects"
              class="h-11 px-5 rounded-xl bg-accent-amber hover:bg-accent-warm text-stone-950 font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md shadow-accent-amber/20 hover:shadow-accent-amber/35 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              @click.prevent="scrollTo('#projects')"
            >
              <Folder :size="16" class="flex-shrink-0" />
              <span>{{ $t('hero.viewProjects') }}</span>
            </a>

            <!-- Social Links (GitHub & LinkedIn) -->
            <a
              v-for="link in socials"
              :key="link.href"
              :href="link.href"
              target="_blank"
              class="h-11 px-5 rounded-xl bg-bg-secondary/80 hover:bg-bg-hover text-text-primary border border-bg-border/80 hover:border-accent-amber/40 font-medium text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm whitespace-nowrap"
            >
              <component :is="link.icon" :size="15" class="flex-shrink-0" />
              <span>{{ link.label }}</span>
            </a>
          </div>
        </div>

        <!-- Right / Integrated Portrait Showcase -->
        <div class="w-full lg:w-auto flex justify-center lg:justify-end">
          <div class="relative group">
            <!-- Strategic Emerald aura (5% Accent) -->
            <div class="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-emerald-400/10 to-teal-500/15 blur-2xl opacity-60 group-hover:opacity-85 transition-all duration-700 pointer-events-none" />

            <!-- Portrait Frame -->
            <div class="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl p-2 bg-gradient-to-b from-bg-border/80 via-bg-card to-bg-border/40 border border-bg-border/60 shadow-2xl overflow-hidden backdrop-blur-md">
              <div class="w-full h-full rounded-xl overflow-hidden relative bg-bg-secondary">
                <img
                  :src="useAsset('media/avatar.JPG')"
                  alt="ANAS ESKANDER"
                  class="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                <!-- Floating minimal pill tag on image (High contrast in all modes) -->
                <div class="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 flex items-center justify-between text-xs shadow-xl">
                  <div>
                    <p class="font-bold text-white tracking-tight">{{ $t('hero.specialty') }}</p>
                    <p class="text-[11px] text-gray-300 font-mono mt-0.5">{{ $t('hero.remote') }}</p>
                  </div>
                  <div class="w-2.5 h-2.5 rounded-full bg-accent-green shadow-sm shadow-accent-green/50 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Integrated Summary Snapshot Shelf (Merged from About Me) -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 border-t border-bg-border/60">
        <div
          v-for="info in summary"
          :key="info.label"
          class="p-4 rounded-xl bg-bg-secondary/40 border border-bg-border/50 backdrop-blur-sm"
        >
          <div class="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1">{{ info.label }}</div>
          <div class="text-xs sm:text-sm font-semibold text-text-primary truncate">{{ info.value }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Folder, Github, Linkedin } from 'lucide-vue-next'
import { computed } from 'vue'

const { t } = useI18n()

const p1Formatted = computed(() => t('hero.description1'))
const p2Formatted = computed(() => t('hero.description2'))

const summary = computed(() => [
  { label: t('hero.experienceLabel'),   value: t('hero.experienceValue') },
  { label: t('hero.locationLabel'),     value: t('hero.locationValue') },
  { label: t('hero.nationalityLabel'),  value: t('hero.nationalityValue') },
  { label: t('hero.statusLabel'),       value: t('hero.statusValue') },
  { label: t('hero.remoteLabel'),       value: t('hero.remoteValue') },
])

const socials = [
  { href: 'https://github.com/an90ass/',                                               icon: Github,   label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/anas-al-maqtari-12815124b/?locale=en', icon: Linkedin, label: 'LinkedIn' },
]

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(0.5deg); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.25; }
  50% { transform: scale(1.08); opacity: 0.45; }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 15s linear infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}
</style>

