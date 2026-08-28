<template>
  <section id="services" class="scroll-mt-20 pt-16 border-t border-bg-border/60">
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="space-y-8"
    >
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-text-primary">{{ $t('services.title') }}</h2>
        </div>
      </div>

      <!-- 2x2 Capabilities Matrix -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 80 } }"
          class="group rounded-2xl p-6 sm:p-7 bg-bg-secondary/40 hover:bg-bg-secondary/80 border border-bg-border/50 hover:border-accent-amber/40 transition-all duration-300 backdrop-blur-sm flex flex-col justify-start"
        >
          <div class="flex items-center gap-3.5 mb-3.5">
            <div class="w-10 h-10 rounded-xl bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center text-accent-amber flex-shrink-0 group-hover:scale-105 transition-transform">
              <component :is="service.icon" :size="20" />
            </div>
            <div>
              <span class="text-xs font-mono font-semibold text-accent-amber/80 mr-1.5">0{{ i + 1 }}</span>
              <h3 class="text-lg font-bold text-text-primary inline-block">{{ service.title }}</h3>
            </div>
          </div>
          <p class="text-text-muted text-xs sm:text-sm leading-relaxed">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Server, Smartphone, Globe, Sparkles } from 'lucide-vue-next'
import { computed } from 'vue'

const { t } = useI18n()

const services = computed(() => [
  {
    title: t('services.s1.title'),
    description: t('services.s1.description'),
    icon: Smartphone,
  },
  {
    title: t('services.s2.title'),
    description: t('services.s2.description'),
    icon: Server,
  },
  {
    title: t('services.s3.title'),
    description: t('services.s3.description'),
    icon: Sparkles,
  },
  {
    title: t('services.s4.title'),
    description: t('services.s4.description'),
    icon: Globe,
  },
])
</script>

