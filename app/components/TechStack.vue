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
import { Smartphone, Server, Database, Cloud, Globe, Cpu, Shield, Wrench } from 'lucide-vue-next'
import { computed } from 'vue'

const { t } = useI18n()

const row1 = [
  { name: 'Flutter',      emoji: '🐦' },
  { name: 'Python',       emoji: '🐍' },
  { name: 'FastAPI',      emoji: '⚡' },
  { name: 'Flask',        emoji: '🌶️' },
  { name: 'Django',       emoji: '🎸' },
  { name: '.NET 8',       emoji: '💜' },
  { name: 'C#',           emoji: '🎯' },
  { name: 'SignalR',      emoji: '🔁' },
  { name: 'RabbitMQ',     emoji: '🐇' },
  { name: 'JavaScript',   emoji: '🟨' },
  { name: 'HTML5',        emoji: '🌐' },
  { name: 'CSS3',         emoji: '🎨' },
]

const row2 = [
  { name: 'PostgreSQL',    emoji: '🐘' },
  { name: 'MS SQL Server', emoji: '🗄️' },
  { name: 'MySQL',         emoji: '🛢️' },
  { name: 'SQLite',        emoji: '💾' },
  { name: 'Firestore',     emoji: '🔥' },
  { name: 'Redis',         emoji: '🔴' },
  { name: 'GCP',           emoji: '☁️' },
  { name: 'Firebase',      emoji: '🔥' },
  { name: 'Docker',        emoji: '🐳' },
  { name: 'Git',           emoji: '🔀' },
  { name: 'Postman',       emoji: '🚀' },
  { name: 'Figma',         emoji: '🎨' },
]

const categories = computed(() => [
  {
    label: t('tech.mobile'),
    icon: Smartphone,
    techs: ['Flutter', 'BLoC', 'Cubit', 'Provider', 'Riverpod', 'Clean Architecture', 'SDK Development'],
  },
  {
    label: t('tech.backend'),
    icon: Server,
    techs: ['Python (FastAPI, Django, Flask)', '.NET 8 (C#, ASP.NET Core)', 'EF Core', 'LINQ', 'CQRS', 'SignalR', 'RabbitMQ', 'RESTful API', 'WebSocket', 'JWT/OAuth 2.0'],
  },
  {
    label: t('tech.web'),
    icon: Globe,
    techs: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Admin Dashboards'],
  },
  {
    label: t('tech.database'),
    icon: Database,
    techs: ['PostgreSQL', 'MS SQL Server', 'MySQL', 'SQLite', 'Firestore', 'Redis'],
  },
  {
    label: t('tech.cloud'),
    icon: Cloud,
    techs: ['Firebase (Auth, Functions)', 'Google Cloud Platform', 'Railway', 'Render', 'Nginx', 'Ngrok'],
  },
  {
    label: t('tech.architecture'),
    icon: Cpu,
    techs: ['Clean Architecture', 'MVC', 'MVVM', 'SOLID Principles', 'SDLC', 'Data Structures & Algorithms'],
  },
  {
    label: t('tech.security'),
    icon: Shield,
    techs: ['Device Sensors', 'BLE & NFC Integration', 'E2EE', 'PCI-Aligned Payment Security', 'RBAC', 'App Security Best Practices'],
  },
  {
    label: t('tech.tools'),
    icon: Wrench,
    techs: ['Docker', 'Git/GitHub/GitLab', 'Trello', 'Postman', 'Figma', 'Canva', 'Play Store & App Store Publishing'],
  },
])
</script>

