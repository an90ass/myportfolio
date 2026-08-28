<template>
  <section id="experience" class="scroll-mt-20 pt-16 border-t border-bg-border/60">
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
    >
      <!-- Left Header & Key Metrics Column -->
      <div class="lg:col-span-4 space-y-6">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-text-primary">{{ $t('experience.title') }}</h2>
        </div>

        <!-- Quick Facts Matrix -->
        <div class="rounded-2xl p-6 bg-bg-secondary/40 border border-bg-border/50 backdrop-blur-sm space-y-4">
          <div class="text-xs font-mono font-semibold uppercase tracking-wider text-accent-amber">
            {{ $t('experience.quickFacts') }}
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div v-for="fact in facts" :key="fact.label" class="p-3.5 rounded-xl bg-bg-card/70 border border-bg-border/40 text-center hover:border-accent-amber/30 transition-all">
              <p class="text-xl font-bold text-text-primary font-mono">{{ fact.value }}</p>
              <p class="text-[11px] text-text-muted uppercase font-mono mt-0.5">{{ fact.label }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Detailed Work Timeline -->
      <div class="lg:col-span-8 space-y-6">
        <div class="relative pl-6 sm:pl-8 border-l border-bg-border/70 space-y-10">
          <div
            v-for="(job, i) in experience"
            :key="job.company + job.period"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 400, delay: i * 80 } }"
            class="relative group"
          >
            <!-- Timeline glowing amber pip -->
            <div class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-accent-amber bg-bg-primary group-hover:scale-125 group-hover:bg-accent-amber transition-all duration-300 shadow-sm" />

            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <div>
                <h3 class="text-base font-bold text-text-primary group-hover:text-accent-amber transition-colors">{{ job.role }}</h3>
                <a
                  v-if="job.url"
                  :href="job.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-accent-amber hover:text-accent-gold text-xs font-semibold font-mono transition-colors group/company"
                >
                  <span>{{ job.company }}</span>
                  <ExternalLink :size="11" class="opacity-70 group-hover/company:opacity-100 group-hover/company:translate-x-0.5 transition-all" />
                </a>
                <p v-else class="text-accent-amber text-xs font-semibold font-mono">{{ job.company }}</p>
              </div>
              <div class="text-left sm:text-right">
                <span class="text-xs text-text-muted font-mono bg-bg-secondary px-2.5 py-1 rounded-full border border-bg-border/50">{{ job.period }}</span>
                <p class="text-xs text-text-muted mt-1">{{ job.location }}</p>
              </div>
            </div>

            <ul class="space-y-1.5 my-3.5">
              <li
                v-for="item in job.responsibilities"
                :key="item"
                class="flex items-start gap-2 text-xs sm:text-sm text-text-secondary leading-relaxed"
              >
                <ChevronRight :size="13" class="text-accent-amber mt-1 flex-shrink-0" />
                <span>{{ item }}</span>
              </li>
            </ul>

            <div class="flex flex-wrap gap-1.5 pt-1">
              <span
                v-for="tech in job.techs"
                :key="tech"
                class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-bg-secondary/80 text-text-secondary border border-bg-border/50"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronRight, ExternalLink } from 'lucide-vue-next'
import { computed } from 'vue'

const { t } = useI18n()

const experience = computed(() => [
  {
    role: t('experience.job1.role'),
    company: t('experience.job1.company'),
    url: 'https://www.visight.com.tr/',
    period: t('experience.job1.period'),
    location: t('experience.job1.location'),
    responsibilities: [
      t('experience.job1.r1'),
      t('experience.job1.r2'),
      t('experience.job1.r3'),
      t('experience.job1.r4'),
    ],
    techs: ['FastAPI', 'Python', 'Redis', 'PostgreSQL', 'JWT', 'Server-Side Pagination'],
  },
  {
    role: t('experience.job2.role'),
    company: t('experience.job2.company'),
    url: 'https://kurtarplatform.github.io/',
    period: t('experience.job2.period'),
    location: t('experience.job2.location'),
    responsibilities: [
      t('experience.job2.r1'),
      t('experience.job2.r2'),
      t('experience.job2.r3'),
      t('experience.job2.r4'),
    ],
    techs: ['Flutter', 'Google Maps', 'WebSocket', 'IoT', 'BLE', 'TensorFlow Lite'],
  },
  {
    role: t('experience.job3.role'),
    company: t('experience.job3.company'),
    url: 'https://turviapp.com/',
    period: t('experience.job3.period'),
    location: t('experience.job3.location'),
    responsibilities: [
      t('experience.job3.r1'),
    ],
    techs: ['Flutter', 'FastAPI', 'Google Play', 'App Store', 'Full-Stack'],
  },
  {
    role: t('experience.job4.role'),
    company: t('experience.job4.company'),
    url: 'https://www.visight.com.tr/',
    period: t('experience.job4.period'),
    location: t('experience.job4.location'),
    responsibilities: [
      t('experience.job4.r1'),
      t('experience.job4.r2'),
      t('experience.job4.r3'),
      t('experience.job4.r4'),
    ],
    techs: ['Flutter', 'FastAPI', 'Biometrics', 'MRZ', 'NFC', 'Computer Vision'],
  },
])

const facts = computed(() => [
  { value: '2+',  label: t('experience.factYears') },
  { value: '10+', label: t('experience.factProjects') },
  { value: '3',   label: t('experience.factCompanies') },
  { value: '30+', label: t('experience.factTechs') },
])
</script>