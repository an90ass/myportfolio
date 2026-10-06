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

      <!-- Frameless Floating Marquee with Official Brand Colored SVGs -->
      <div class="relative py-4 overflow-hidden mask-fade-edges">
        <div class="flex gap-3 animate-scroll-left w-max py-1">
          <div
            v-for="(tech, i) in [...row1, ...row1]"
            :key="`r1-${i}`"
            class="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-bg-secondary/70 border border-bg-border/60 hover:border-accent-amber/40 hover:bg-bg-secondary transition-all text-xs font-medium text-text-secondary hover:text-text-primary flex-shrink-0 shadow-sm"
          >
            <span class="w-4 h-4 flex items-center justify-center flex-shrink-0" v-html="tech.svg"></span>
            <span class="font-mono text-xs font-medium">{{ tech.name }}</span>
          </div>
        </div>

        <div class="flex gap-3 animate-scroll-right w-max py-1 mt-2.5">
          <div
            v-for="(tech, i) in [...row2, ...row2]"
            :key="`r2-${i}`"
            class="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-bg-secondary/70 border border-bg-border/60 hover:border-accent-amber/40 hover:bg-bg-secondary transition-all text-xs font-medium text-text-secondary hover:text-text-primary flex-shrink-0 shadow-sm"
          >
            <span class="w-4 h-4 flex items-center justify-center flex-shrink-0" v-html="tech.svg"></span>
            <span class="font-mono text-xs font-medium">{{ tech.name }}</span>
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
          class="rounded-2xl p-5 bg-bg-secondary/30 hover:bg-bg-secondary/70 border border-bg-border/40 hover:border-accent-amber/30 transition-all duration-300 backdrop-blur-sm flex flex-col"
        >
          <div class="flex items-center gap-2.5 mb-3 text-accent-amber">
            <component :is="cat.icon" :size="16" />
            <span class="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">{{ cat.label }}</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in cat.techs"
              :key="tech"
              class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-bg-card text-text-secondary border border-bg-border/60 hover:border-accent-amber/40 hover:text-text-primary transition-colors"
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

// Official Brand Colored SVGs (Crisp, authentic, zero AI emojis)
const row1 = [
  {
    name: 'Flutter',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#02569B"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM14.286 10.428l-5.6 5.6 5.6 5.6h7.4l-5.6-5.6 5.6-5.6h-7.4z"/></svg>`,
  },
  {
    name: 'Python',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="#3776AB" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.753h5.814v.825H3.945S0 5.762 0 11.9c0 6.14 3.44 5.92 3.44 5.92h2.052v-2.875s-.112-3.44 3.376-3.44h5.776s3.266.052 3.266-3.155V3.155S18.396 0 11.914 0zm-3.03 1.83a1.03 1.03 0 1 1 0 2.062 1.03 1.03 0 0 1 0-2.062z"/><path fill="#FFD43B" d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.753H11.98v-.825h8.075S24 18.238 24 12.1c0-6.14-3.44-5.92-3.44-5.92h-2.052v2.875s.112 3.44-3.376 3.44H9.356s-3.266-.052-3.266 3.155v5.189S5.604 24 12.086 24zm3.03-1.83a1.03 1.03 0 1 1 0-2.062 1.03 1.03 0 0 1 0 2.062z"/></svg>`,
  },
  {
    name: 'FastAPI',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#009688"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.714 3.657l6.63 7.828h-5.203l1.86 8.858-7.794-9.372h5.132l-1.625-7.314z"/></svg>`,
  },
  {
    name: '.NET 8',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#512BD4"><path d="M2.5 12a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0zm9.5-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm-2.8 3.5h1.8l2.6 4.2V9h1.7v6h-1.8l-2.6-4.2V15H9.2V9z"/></svg>`,
  },
  {
    name: 'C#',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#239120"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.8 7.5a4.5 4.5 0 0 1 4.2 3.1h-2a2.6 2.6 0 0 0-2.2-1.3 2.7 2.7 0 0 0 0 5.4c1.1 0 1.9-.6 2.2-1.3h2A4.5 4.5 0 0 1 10.2 16.5 4.5 4.5 0 0 1 5.7 12a4.5 4.5 0 0 1 4.5-4.5zm5.5 1.5h1.2v1.5h1.5v1.2h-1.5v1.8h1.5v1.2h-1.5V16h-1.2v-1.3h-1.8V16h-1.2v-1.3h-1.5v-1.2h1.5v-1.8h-1.5V10.5h1.5V9h1.2v1.5h1.8V9zm0 2.7h-1.8v1.8h1.8v-1.8z"/></svg>`,
  },
  {
    name: 'PyTorch',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#EE4C2C"><path d="M12.7 0a8.5 8.5 0 0 0-1.4.1l1.5 1.5a6.3 6.3 0 1 1-6.1 6.3l.1-1.3-1.6-1.6a8.5 8.5 0 1 0 7.5-5zm2.7 3.3a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z"/></svg>`,
  },
  {
    name: 'GenAI / LLMs',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#10b981"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>`,
  },
  {
    name: 'Django',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#092E20" class="dark:fill-[#44B78B]"><path d="M11.146 0h3.32v15.228c-.64.103-1.203.14-1.905.14-3.494 0-5.35-1.583-5.35-4.57 0-3.057 1.99-4.83 5.09-4.83.69 0 1.258.077 1.845.228V0zm0 8.563a3.524 3.524 0 0 0-1.436-.263c-1.644 0-2.585.875-2.585 2.457 0 1.543.893 2.41 2.53 2.41.52 0 .973-.048 1.49-.153V8.563zM16.5 0h3.32v18.7h-3.32V0zm-14.7 6.3h3.32v8.5c0 2.2-.4 3.7-1.4 4.7-1 1-2.4 1.4-4.2 1.4-.7 0-1.4-.1-2-.3v-2.8c.5.2 1 .3 1.6.3 1 0 1.7-.3 2.1-.8.4-.5.6-1.4.6-2.6V6.3z"/></svg>`,
  },
  {
    name: 'SignalR',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#512BD4"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V14h-2v2.93A8 8 0 0 1 4.07 13H7v-2H4.07A8 8 0 0 1 11 4.07V7h2V4.07A8 8 0 0 1 19.93 11H17v2h2.93A8 8 0 0 1 13 16.93z"/></svg>`,
  },
  {
    name: 'RabbitMQ',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#FF6600"><path d="M21.9 14.8c-.2-.4-.6-.7-1.1-.9-.3-.1-.6-.2-.8-.4-.4-.3-.6-.8-.7-1.3-.2-1.3-.9-4.8-1.5-6.7-.4-1.2-1-2.2-1.8-3-1.1-1.1-2.5-1.7-4-1.7-.8 0-1.5.2-2.2.5-.7.4-1.3.9-1.7 1.5-.7 1-1.2 2.2-1.5 3.5-.3 1.2-.5 2.5-.7 3.8-.1.6-.4 1.1-.9 1.4-.4.2-.9.3-1.4.3-1 0-1.9-.4-2.6-1.1-.7-.7-1.1-1.6-1.1-2.6 0-.8.2-1.5.7-2.1L0 7.2C0 9.2.7 11 2 12.4c1.2 1.3 2.9 2 4.7 2 .8 0 1.7-.2 2.4-.6.3-.2.6-.4.9-.7.4-.4.9-.6 1.4-.7.6 0 1.2.2 1.7.5.9.6 1.6 1.4 2.1 2.3.6 1.1 1 2.3 1.2 3.6.1.7.3 1.3.7 1.8.6.8 1.5 1.3 2.5 1.3 1.1 0 2-.5 2.6-1.3.4-.6.6-1.3.6-2.1 0-1.5-.4-2.7-.9-3.7z"/></svg>`,
  },
  {
    name: 'JavaScript',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><path fill="#000" d="M6.5 17.5l2-1.2c.4.7.8 1.2 1.5 1.2.7 0 1.2-.3 1.2-1.1V9.5h2.5v6.8c0 2.1-1.3 3.1-3.2 3.1-1.8 0-3-1-3.5-1.9zm8.5-.1l2-1.2c.5.8 1.2 1.4 2.2 1.4.9 0 1.5-.4 1.5-1 0-.7-.6-.9-1.7-1.4l-.6-.3c-1.7-.7-2.8-1.6-2.8-3.4 0-1.7 1.3-3 3.3-3 1.4 0 2.5.5 3.3 1.8l-1.9 1.2c-.4-.7-.9-1-1.4-1-.6 0-1 .4-1 .9 0 .6.4.8 1.4 1.2l.6.3c2 .9 3.1 1.7 3.1 3.6 0 2.1-1.6 3.2-3.8 3.2-2.1 0-3.5-1-4.2-2.3z"/></svg>`,
  },
  {
    name: 'Angular',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#DD0031"><path d="M12 2.5l9.2 3.3-1.4 12.2L12 22.5l-7.8-4.5L2.8 5.8 12 2.5zm0 2.8L5.7 18.2h2.2l1.3-3.2h5.6l1.3 3.2h2.2L12 5.3zm2.3 8.1H9.7l2.3-5.6 2.3 5.6z"/></svg>`,
  },
]

const row2 = [
  {
    name: 'PostgreSQL',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#4169E1"><path d="M12 0C5.4 0 0 5.4 0 12c0 4.1 2.1 7.7 5.2 9.8.4-.5.7-1.1.9-1.8-.7-.6-1.3-1.4-1.7-2.3 1.3.4 2.7.6 4.1.6 1.1 0 2.2-.1 3.2-.4.8 1.4 1.9 2.5 3.3 3.3 1.4-.9 2.5-2.1 3.3-3.6.8.4 1.7.7 2.6.8.8-1.5 1.3-3.2 1.4-5 .6-.8 1-1.8 1-2.9 0-3.1-2-5.7-4.8-6.6-.9-2.3-3.2-3.9-5.8-3.9H12zm0 3.5c1.8 0 3.3 1.1 4 2.7-.8-.1-1.6-.2-2.5-.2-2.3 0-4.4.6-6.2 1.7.7-2.4 2.5-4.2 4.7-4.2z"/></svg>`,
  },
  {
    name: 'MS SQL Server',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#CC292B"><path d="M12 2C6.5 2 2 4.2 2 7v10c0 2.8 4.5 5 10 5s10-2.2 10-5V7c0-2.8-4.5-5-10-5zm0 3c4.4 0 7.8 1.5 8 2.8-.2 1.3-3.6 2.8-8 2.8S4.2 9.1 4 7.8C4.2 6.5 7.6 5 12 5zm0 14c-4.4 0-7.8-1.5-8-2.8V14c1.8 1.3 4.8 2 8 2s6.2-.7 8-2v2.2c-.2 1.3-3.6 2.8-8 2.8zm0-5c-4.4 0-7.8-1.5-8-2.8V9c1.8 1.3 4.8 2 8 2s6.2-.7 8-2v2.2c-.2 1.3-3.6 2.8-8 2.8z"/></svg>`,
  },
  {
    name: 'MySQL',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#4479A1"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5c-3 0-5.5-2-5.5-4.5S10 7.5 13 7.5s5.5 2 5.5 4.5-2.5 4.5-5.5 4.5zm0-7c-1.7 0-3 1.1-3 2.5s1.3 2.5 3 2.5 3-1.1 3-2.5-1.3-2.5-3-2.5z"/></svg>`,
  },
  {
    name: 'Redis',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#DC382D"><path d="M21.5 6.5l-9.5-5-9.5 5v11l9.5 5 9.5-5v-11zm-9.5-2.8l6.8 3.6-6.8 3.6-6.8-3.6 6.8-3.6zm-7.5 5.5l6.5 3.4v7.3l-6.5-3.4v-7.3zm8.5 10.7v-7.3l6.5-3.4v7.3l-6.5 3.4z"/></svg>`,
  },
  {
    name: 'SQLite',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#003B57" class="dark:fill-[#29B6F6]"><path d="M12 2C6.5 2 2 3.8 2 6v12c0 2.2 4.5 4 10 4s10-1.8 10-4V6c0-2.2-4.5-4-10-4zm0 2.5c4.1 0 7.5 1.1 7.5 2.5S16.1 9.5 12 9.5 4.5 8.4 4.5 7 7.9 4.5 12 4.5zM4.5 10.8C5.8 11.5 8.7 12 12 12s6.2-.5 7.5-1.2V13c0 1.4-3.4 2.5-7.5 2.5s-7.5-1.1-7.5-2.5v-2.2zm0 5C5.8 16.5 8.7 17 12 17s6.2-.5 7.5-1.2V18c0 1.4-3.4 2.5-7.5 2.5s-7.5-1.1-7.5-2.5v-2.2z"/></svg>`,
  },
  {
    name: 'Firebase',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#FFCA28"><path d="M4.6 17.5L6.8 3.8a.7.7 0 0 1 1.3-.2l3.4 6.3-6.9 7.6zm14.8 0L17.5 8a.7.7 0 0 0-1.2-.3l-9.9 9.8 6.4 3.7c.6.4 1.4.4 2 0l4.6-3.7zm-14-1.2l6.2-6.8-3.1-5.9a.7.7 0 0 0-1.3 0L3.2 15a1 1 0 0 0 .3 1.1l1.9.2z"/></svg>`,
  },
  {
    name: 'Google Cloud Platform',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#4285F4"><path d="M19.4 10.4c-.2-.1-.5-.2-.7-.2A7.5 7.5 0 0 0 5 12.3 5.5 5.5 0 0 0 6 23h13a5 5 0 0 0 .4-10v-.2c0-.8-.3-1.6-.7-2.2z"/></svg>`,
  },
  {
    name: 'Docker',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#2496ED"><path d="M13.8 6.2h2.2v2.2h-2.2V6.2zm-2.8 0h2.2v2.2H11V6.2zM8.2 6.2h2.2v2.2H8.2V6.2zm5.6 2.8h2.2v2.2h-2.2V9zm-2.8 0h2.2v2.2H11V9zm-2.8 0h2.2v2.2H8.2V9zm-2.8 0h2.2v2.2H5.4V9zm18.3 2.8c-.3-.2-1.3-.7-2.6-.4-.3-1.2-1.2-2.1-2.3-2.1-.2 0-.4 0-.6.1-.2-1.2-1.3-2.1-2.5-2.1H3.1C1.9 7.3.9 8.3.9 9.5v5c0 3.9 3.1 7.1 7 7.1h6.6c4.6 0 8.4-3.5 8.9-8.1.3-.2.8-.7.8-1.7 0-.3-.1-.7-.3-1z"/></svg>`,
  },
  {
    name: 'Git',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#F05032"><path d="M23.5 10.9L13.1.5c-.7-.7-1.8-.7-2.4 0l-2.4 2.4 3 3c.7-.2 1.5 0 2.1.5.6.6.8 1.4.5 2.1l2.9 2.9c.7-.2 1.5 0 2.1.5.8.8.8 2.2 0 3-.8.8-2.2.8-3 0-.6-.6-.8-1.5-.5-2.2l-2.7-2.7v5.6c.2.2.4.4.5.7.8.8.8 2.2 0 3-.8.8-2.2.8-3 0-.8-.8-.8-2.2 0-3 .2-.3.5-.5.8-.6V9.8c-.3-.1-.6-.3-.8-.6-.6-.6-.8-1.5-.5-2.2l-3-3-4.1 4.1c-.7.7-.7 1.8 0 2.4l10.4 10.4c.7.7 1.8.7 2.4 0l10.4-10.4c.7-.7.7-1.8 0-2.4z"/></svg>`,
  },
  {
    name: 'Nginx',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#009639"><path d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2zm5 14.8l-7.3-9.5v9.5H7.2V7.2h2.5l7.3 9.5V7.2H17v9.6z"/></svg>`,
  },
  {
    name: 'BLE & NFC',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#0082FC"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 3.5l4 3.5-3 2.5 3 2.5-4 3.5V13l-2.5 2-1-1.5 3-2.5-3-2.5 1-1.5 2.5 2V5.5zm1.5 3.2l1.6 1.3-1.6 1.4V8.7zm0 5.2l1.6 1.4-1.6 1.3v-2.7z"/></svg>`,
  },
  {
    name: 'WebSocket',
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#E05D44"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14l-4-5h3V7l4 5h-3v4z"/></svg>`,
  },
]

// EXACT 9 categories requested by the user — strictly no changes
const categories = computed(() => [
  {
    label: t('tech.mobile'),
    icon: Smartphone,
    techs: [
      'Flutter',
      'BLoC',
      'Cubit',
      'Provider',
      'Riverpod',
      'SDK Development',
    ],
  },
  {
    label: t('tech.backend'),
    icon: Server,
    techs: [
      'Python (FastAPI, Django, Flask)',
      '.NET 8 (C#, ASP.NET Core Web API)',
      'EF Core',
      'CQRS & MediatR',
      'FluentValidation',
      'SignalR',
      'RabbitMQ',
      'RESTful API Design',
      'WebSocket',
      'JWT & OAuth 2.0',
    ],
  },
  {
    label: t('tech.web'),
    icon: Globe,
    techs: [
      'Angular',
      'JavaScript',
    ],
  },
  {
    label: t('tech.ai'),
    icon: Sparkles,
    techs: [
      'Classical ML',
      'PyTorch',
      'LLMs',
      'RAG',
      'TensorFlow Lite',
      'Model Fine-tuning and Evaluation',
    ],
  },
  {
    label: t('tech.database'),
    icon: Database,
    techs: [
      'PostgreSQL',
      'MS SQL Server',
      'MySQL',
      'SQLite',
      'Firestore',
      'Redis',
    ],
  },
  {
    label: t('tech.cloud'),
    icon: Cloud,
    techs: [
      'Firebase',
      'Google Cloud Platform',
      'Railway',
      'Nginx',
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
      'Data Structures & Algorithms',
    ],
  },
  {
    label: t('tech.security'),
    icon: Shield,
    techs: [
      'Mobile Sensors',
      'BLE & NFC Integration',
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
      'CI/CD',
      'Publishing to Google Play and the App Store',
    ],
  },
])
</script>
