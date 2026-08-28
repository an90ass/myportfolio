<template>
  <section id="tech" class="scroll-mt-20 pt-16 border-t border-bg-border/60">
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="space-y-10"
    >
      <!-- Header -->
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-text-primary">{{ $t('tech.title') }}</h2>
      </div>

      <!-- Frameless Floating Marquee -->
      <div class="relative py-4 overflow-hidden mask-fade-edges">
        <div class="flex gap-3 animate-scroll-left w-max py-1">
          <div
            v-for="(tech, i) in [...row1, ...row1]"
            :key="`r1-${i}`"
            class="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-bg-secondary/60 border border-bg-border/60 hover:border-accent-amber/40 hover:bg-bg-secondary transition-all text-xs font-medium text-text-secondary hover:text-text-primary flex-shrink-0"
          >
            <span>{{ tech.emoji }}</span>
            <span class="font-mono">{{ tech.name }}</span>
          </div>
        </div>

        <div class="flex gap-3 animate-scroll-right w-max py-1 mt-2">
          <div
            v-for="(tech, i) in [...row2, ...row2]"
            :key="`r2-${i}`"
            class="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-bg-secondary/60 border border-bg-border/60 hover:border-accent-amber/40 hover:bg-bg-secondary transition-all text-xs font-medium text-text-secondary hover:text-text-primary flex-shrink-0"
          >
            <span>{{ tech.emoji }}</span>
            <span class="font-mono">{{ tech.name }}</span>
          </div>
        </div>
      </div>

      <!-- Category shelves (3x3 Balanced Grid) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(cat, i) in categories"
          :key="cat.label"
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 60 } }"
          class="rounded-2xl p-5 bg-bg-secondary/30 hover:bg-bg-secondary/70 border border-bg-border/40 hover:border-accent-amber/30 transition-all duration-300 backdrop-blur-sm"
        >
          <div class="flex items-center gap-2.5 mb-3.5 text-accent-amber">
            <component :is="cat.icon" :size="16" />
            <span class="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">{{ cat.label }}</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in cat.techs"
              :key="tech"
              class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-bg-card text-text-secondary border border-bg-border/60"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Smartphone, Server, Database, Cloud, Globe, Cpu, Shield, Wrench, Sparkles } from 'lucide-vue-next'
import { computed } from 'vue'

const { t } = useI18n()

const row1 = [
  { name: 'Flutter',      emoji: '🐦' },
  { name: 'Python',       emoji: '🐍' },
  { name: 'FastAPI',      emoji: '⚡' },
  { name: '.NET 8',       emoji: '💜' },
  { name: 'C#',           emoji: '🎯' },
  { name: 'PyTorch',      emoji: '🔥' },
  { name: 'GenAI',        emoji: '✨' },
  { name: 'Django',       emoji: '🎸' },
  { name: 'SignalR',      emoji: '🔁' },
  { name: 'RabbitMQ',     emoji: '🐇' },
  { name: 'JavaScript',   emoji: '🟨' },
  { name: 'HTML5',        emoji: '🌐' },
]

const row2 = [
  { name: 'PostgreSQL',    emoji: '🐘' },
  { name: 'MS SQL Server', emoji: '🗄️' },
  { name: 'Redis',         emoji: '🔴' },
  { name: 'SQLite',        emoji: '💾' },
  { name: 'Firebase',      emoji: '🔥' },
  { name: 'GCP',           emoji: '☁️' },
  { name: 'Docker',        emoji: '🐳' },
  { name: 'Git',           emoji: '🔀' },
  { name: 'Postman',       emoji: '🚀' },
  { name: 'Nginx',         emoji: '⚙️' },
  { name: 'BLE / NFC',     emoji: '📡' },
  { name: 'WebSocket',     emoji: '⚡' },
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
    techs: [
      'Python (FastAPI, Django, Flask)',
      '.NET 8 (C#, ASP.NET Core Web API)',
      'EF Core',
      'LINQ',
      'CQRS',
      'MediatR',
      'FluentValidation',
      'SignalR',
      'RabbitMQ',
      'RESTful API Design',
      'WebSocket',
      'JWT',
      'OAuth 2.0',
    ],
  },
  {
    label: t('tech.ai'),
    icon: Sparkles,
    techs: [
      'Classical ML',
      'PyTorch',
      'Computer Vision',
      'GenAI',
      'On-Device AI Deployment',
      'Model Fine-tuning & Evaluation',
    ],
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
    techs: [
      'Firebase (Authentication, Cloud Functions)',
      'Google Cloud Platform',
      'Railway',
      'Render',
      'Nginx',
      'Ngrok',
    ],
  },
  {
    label: t('tech.architecture'),
    icon: Cpu,
    techs: [
      'Clean Architecture',
      'MVC',
      'MVVM',
      'SOLID Principles',
      'SDLC',
      'Data Structures & Algorithms',
    ],
  },
  {
    label: t('tech.security'),
    icon: Shield,
    techs: [
      'Device Sensors',
      'BLE & NFC Integration',
      'RBAC',
      'App Security Best Practices',
    ],
  },
  {
    label: t('tech.tools'),
    icon: Wrench,
    techs: [
      'Docker',
      'Git',
      'GitHub',
      'GitLab',
      'Postman',
      'Play Store & App Store Publishing',
    ],
  },
])
</script>

