<template>
  <section id="experience" class="scroll-mt-20">
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="grid grid-cols-1 lg:grid-cols-3 gap-4"
    >
      <!-- Experience timeline -->
      <div class="lg:col-span-2 card-base p-8">
        <div class="section-label">
          <span class="font-mono text-accent-blue">~/</span> {{ $t('experience.sectionLabel') }}
        </div>
        <h2 class="text-2xl font-bold text-text-primary mb-6">{{ $t('experience.title') }}</h2>

        <div class="space-y-6">
          <div
            v-for="(job, i) in experience"
            :key="job.company + job.period"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 400, delay: i * 100 } }"
            class="relative pl-6 border-l border-bg-border last:border-transparent"
          >
            <!-- Dot -->
            <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-accent-blue bg-bg-primary" />

            <div class="flex items-start justify-between flex-wrap gap-2 mb-1.5">
              <div>
                <h3 class="font-semibold text-text-primary text-sm">{{ job.role }}</h3>
                <p class="text-accent-blue text-xs font-medium">{{ job.company }}</p>
              </div>
              <div class="text-right">
                <span class="text-xs text-text-muted font-mono">{{ job.period }}</span>
                <p class="text-xs text-text-muted">{{ job.location }}</p>
              </div>
            </div>

            <ul class="space-y-1 mb-3">
              <li v-for="item in job.responsibilities" :key="item"
                  class="flex items-start gap-1.5 text-xs text-text-muted">
                <ChevronRight :size="11" class="text-accent-blue mt-0.5 flex-shrink-0" />
                {{ item }}
              </li>
            </ul>

            <div class="flex flex-wrap gap-1.5">
              <span v-for="tech in job.techs" :key="tech" class="tech-badge">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="card-base p-6">
        <div class="section-label">
          <span class="font-mono text-accent-blue">~/</span> {{ $t('experience.educationTitle').toLowerCase() }}
        </div>
        <h2 class="text-lg font-bold text-text-primary mb-5">{{ $t('experience.educationTitle') }}</h2>

        <div class="space-y-5">
          <div v-for="edu in education" :key="edu.school" class="border-l-2 border-accent-purple/40 pl-4">
            <p class="text-sm font-semibold text-text-primary">{{ edu.degree }}</p>
            <p class="text-xs text-accent-blue font-medium mt-0.5">{{ edu.school }}</p>
            <p class="text-xs text-text-muted mt-0.5">{{ edu.period }}</p>
            <p v-if="edu.note" class="text-xs text-text-muted mt-1 italic">{{ edu.note }}</p>
          </div>
        </div>

        <!-- Quick facts -->
        <div class="mt-8 pt-6 border-t border-bg-border">
          <div class="section-label">{{ $t('experience.quickFacts') }}</div>
          <div class="grid grid-cols-2 gap-3 mt-2">
            <div v-for="fact in facts" :key="fact.label"
                 class="bg-bg-border/50 rounded-xl p-3 text-center">
              <p class="text-xl font-bold text-text-primary">{{ fact.value }}</p>
              <p class="text-xs text-text-muted mt-0.5">{{ fact.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'

const { t } = useI18n()

const experience = computed(() => [
  {
    role: t('experience.job3.role'),
    company: t('experience.job3.company'),
    period: t('experience.job3.period'),
    location: t('experience.job3.location'),
    responsibilities: [
      t('experience.job3.r1'),
      t('experience.job3.r2'),
      t('experience.job3.r3'),
      t('experience.job3.r4'),
    ],
    techs: ['Kotlin', '.NET', 'SignalR', 'BLE', 'NFC', 'E2EE', 'Real-time Dashboards'],
  },
  {
    role: t('experience.job1.role'),
    company: t('experience.job1.company'),
    period: t('experience.job1.period'),
    location: t('experience.job1.location'),
    responsibilities: [
      t('experience.job1.r1'),
      t('experience.job1.r2'),
      t('experience.job1.r3'),
      t('experience.job1.r4'),
      t('experience.job1.r5'),
      t('experience.job1.r6'),
    ],
    techs: ['Flutter', 'Provider', 'Google Maps', 'Firebase', 'IoT', 'AI/ML', 'SQLite', 'Dio'],
  },
  {
    role: t('experience.job2.role'),
    company: t('experience.job2.company'),
    period: t('experience.job2.period'),
    location: t('experience.job2.location'),
    responsibilities: [
      t('experience.job2.r1'),
      t('experience.job2.r2'),
      t('experience.job2.r3'),
      t('experience.job2.r4'),
      t('experience.job2.r5'),
    ],
    techs: ['Flutter', 'FastAPI', 'Firebase', 'BLoC', 'NFC', 'MRZ', 'PostgreSQL'],
  },
])

const education = computed(() => [
  {
    degree: t('experience.edu1.degree'),
    school: t('experience.edu1.school'),
    period: t('experience.edu1.period'),
    note: t('experience.edu1.note'),
  },
  {
    degree: t('experience.edu2.degree'),
    school: t('experience.edu2.school'),
    period: t('experience.edu2.period'),
    note: t('experience.edu2.note'),
  },
  {
    degree: t('experience.edu3.degree'),
    school: t('experience.edu3.school'),
    period: t('experience.edu3.period'),
    note: t('experience.edu3.note'),
  },
])

const facts = computed(() => [
  { value: '2+',  label: t('experience.factYears') },
  { value: '10+', label: t('experience.factProjects') },
  { value: '3',   label: t('experience.factCompanies') },
  { value: '30+', label: t('experience.factTechs') },
])
</script>