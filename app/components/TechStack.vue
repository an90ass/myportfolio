<template>
  <section id="tech" class="scroll-mt-20">
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    >
      <!-- Header -->
      <div class="card-base p-8 mb-4">
        <div class="section-label">
          <span class="font-mono text-accent-blue">~/</span> {{ $t('tech.sectionLabel') }}
        </div>
        <h2 class="text-2xl font-bold text-text-primary">{{ $t('tech.title') }}</h2>
        <p class="text-text-muted text-sm mt-1">{{ $t('tech.subtitle') }}</p>
      </div>

      <!-- Marquee rows -->
      <div class="card-base py-6 overflow-hidden mb-4 pause-on-hover">
        <div class="flex gap-4 animate-scroll-left w-max">
          <div v-for="(tech, i) in [...row1, ...row1]" :key="`r1-${i}`"
               class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-border border border-bg-border
                      hover:border-accent-blue/40 hover:bg-bg-hover transition-all duration-200 flex-shrink-0 group">
            <span class="text-lg">{{ tech.emoji }}</span>
            <span class="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors whitespace-nowrap">
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="card-base py-6 overflow-hidden mb-4 pause-on-hover">
        <div class="flex gap-4 animate-scroll-right w-max">
          <div v-for="(tech, i) in [...row2, ...row2]" :key="`r2-${i}`"
               class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-border border border-bg-border
                      hover:border-accent-cyan/40 hover:bg-bg-hover transition-all duration-200 flex-shrink-0 group">
            <span class="text-lg">{{ tech.emoji }}</span>
            <span class="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors whitespace-nowrap">
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Category breakdown -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(cat, i) in categories"
          :key="cat.label"
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 80 } }"
          class="card-base p-5 hover:border-accent-blue/30 transition-all duration-300"
        >
          <div class="flex items-center gap-2 mb-3">
            <component :is="cat.icon" :size="15" class="text-accent-blue" />
            <span class="text-xs font-mono text-text-muted uppercase tracking-wider">{{ cat.label }}</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tech in cat.techs" :key="tech" class="tech-badge">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Smartphone, Server, Database, Globe } from 'lucide-vue-next'
import { computed } from 'vue'

const { t } = useI18n()

const row1 = [
  { name: 'Flutter',      emoji: '🐦' },
  { name: 'Dart',         emoji: '🎯' },
  { name: 'Python',       emoji: '🐍' },
  { name: 'FastAPI',      emoji: '⚡' },
  { name: 'Flask',        emoji: '🌶️' },
  { name: 'Django',       emoji: '🎸' },
  { name: 'TypeScript',   emoji: '🔷' },
  { name: 'Angular',      emoji: '🔴' },
  { name: 'Vue.js',       emoji: '💚' },
  { name: 'Nuxt.js',      emoji: '🟢' },
  { name: '.NET / C#',    emoji: '💜' },
  { name: 'Firebase',     emoji: '🔥' },
]

const row2 = [
  { name: 'PostgreSQL',    emoji: '🐘' },
  { name: 'MS SQL Server', emoji: '🗄️' },
  { name: 'MySQL',         emoji: '🛢️' },
  { name: 'SQLite',        emoji: '💾' },
  { name: 'BLoC',          emoji: '🧩' },
  { name: 'Riverpod',      emoji: '💧' },
  { name: 'BLE & NFC',     emoji: '📡' },
  { name: 'WebSocket',     emoji: '🔁' },
  { name: 'GCP',           emoji: '☁️' },
  { name: 'Nginx',         emoji: '🌐' },
  { name: 'Git',           emoji: '🔀' },
  { name: 'Postman',       emoji: '🚀' },
]

const categories = computed(() => [
  {
    label: t('tech.mobile'),
    icon: Smartphone,
    techs: ['Flutter', 'Dart', 'BLoC', 'Cubit', 'Provider', 'Riverpod', 'BLE & NFC', 'SDK Dev'],
  },
  {
    label: t('tech.web'),
    icon: Globe,
    techs: ['TypeScript', 'JavaScript', 'Angular', 'Vue.js', 'Nuxt.js', 'HTML5', 'CSS3'],
  },
  {
    label: t('tech.backend'),
    icon: Server,
    techs: ['FastAPI', 'Django', 'Flask', '.NET / C#', 'REST API', 'WebSocket', 'OAuth / JWT'],
  },
  {
    label: t('tech.database'),
    icon: Database,
    techs: ['PostgreSQL', 'MS SQL Server', 'MySQL', 'SQLite', 'Firebase', 'GCP', 'Railway', 'Nginx'],
  },
])
</script>

