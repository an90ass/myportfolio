<template>
  <section class="pt-12 pb-4">
    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
      class="grid grid-cols-1 lg:grid-cols-5 gap-4"
    >
      <!-- Main hero card -->
      <div class="lg:col-span-3 card-base p-8 lg:p-10 relative overflow-hidden group">
        <!-- Background glow -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

        <div class="relative z-10">
          <div class="section-label">
            <span class="w-2 h-2 rounded-full bg-accent-green animate-pulse-slow" />
            {{ $t('hero.available') }}
          </div>

          <h1 class="text-4xl lg:text-5xl font-bold leading-tight text-text-primary mt-2 mb-4">
            {{ $t('hero.greeting') }}<br />
            <span class="gradient-text">Anas AL-MAQTARI</span>
          </h1>

          <p class="text-text-secondary leading-relaxed mb-6 max-w-lg">
            {{ $t('hero.description') }}
          </p>

          <div class="flex flex-wrap gap-3">
            <a href="#contact"
               class="flex items-center gap-2 px-5 py-2.5 bg-accent-blue text-white font-medium
                      rounded-lg hover:bg-accent-blue/90 transition-all duration-200 text-sm"
               @click.prevent="scrollTo('#contact')">
              <Mail :size="15" />
              {{ $t('hero.getInTouch') }}
            </a>
            <a href="#projects"
               class="flex items-center gap-2 px-5 py-2.5 bg-bg-border text-text-primary font-medium
                      rounded-lg hover:bg-bg-hover transition-all duration-200 text-sm border border-bg-border"
               @click.prevent="scrollTo('#projects')">
              <Folder :size="15" />
              {{ $t('hero.viewProjects') }}
            </a>
            <a href="/Anas_AL-MAQTARI_CV.pdf" download="Anas_AL-MAQTARI_CV.pdf"
               class="flex items-center gap-2 px-5 py-2.5 bg-accent-green/10 text-accent-green font-medium
                      rounded-lg hover:bg-accent-green/20 transition-all duration-200 text-sm border border-accent-green/30"
            >
              <Download :size="15" />
              {{ $t('hero.downloadCV') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Stats + photo grid -->
      <div class="lg:col-span-2 grid grid-cols-2 gap-4">
        <!-- Photo card -->
        <div class="col-span-2 card-base relative overflow-hidden flex flex-col justify-center items-center p-6 group" style="min-height: 240px">
          <!-- Animated gradient grid background -->
          <div class="absolute inset-0 bg-gradient-to-br from-accent-blue/15 via-bg-primary to-accent-purple/15 opacity-80 transition-all duration-500 group-hover:opacity-100" />
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-blue/10 via-transparent to-transparent blur-xl pointer-events-none" />
          
          <!-- Layered glowing rings behind avatar -->
          <div class="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-accent-blue via-accent-cyan to-accent-purple blur-xl opacity-30 animate-pulse-glow" />
          
          <!-- Avatar Container -->
          <div class="relative z-10 animate-float mb-4">
            <!-- Rotating gradient ring -->
            <div class="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent-blue via-accent-cyan to-accent-purple animate-spin-slow opacity-80 group-hover:opacity-100 blur-[2px]" />
            
            <!-- Outer border -->
            <div class="relative w-48 h-48 rounded-full p-1 bg-bg-card border border-bg-border overflow-hidden">
              <!-- Avatar Image -->
              <img
                 :src="useAsset('media/avatar.JPG')"

                alt="Anas AL-MAQTARI"
                class="w-full h-full object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
              />
            </div>
            
            <!-- Pulse Online status dot -->
            <div class="absolute bottom-3 right-3 w-5.5 h-5.5 bg-bg-card rounded-full flex items-center justify-center border border-bg-border shadow-md">
              <span class="w-3.5 h-3.5 rounded-full bg-accent-green animate-pulse" />
            </div>
          </div>

          <!-- Description / Role -->
          <div class="relative z-10 text-center">
            <p class="text-xs font-semibold text-accent-blue font-mono tracking-wider uppercase">
              {{ $t('hero.role') }}
            </p>
            <p class="text-xs text-text-secondary mt-1 flex items-center justify-center gap-1">
              <span>📍</span> {{ $t('hero.location') }}
            </p>
          </div>
        </div>

        <!-- Stat: Years -->
        <div class="card-base p-5 flex flex-col justify-between">
          <span class="text-text-muted text-xs font-mono">{{ $t('hero.experienceLabel') }}</span>
          <div>
            <p class="text-3xl font-bold text-text-primary">2<span class="text-accent-blue">+</span></p>
            <p class="text-xs text-text-secondary mt-1">{{ $t('hero.years') }}</p>
          </div>
        </div>

        <!-- Stat: Projects -->
        <div class="card-base p-5 flex flex-col justify-between">
          <span class="text-text-muted text-xs font-mono">{{ $t('hero.projectsLabel') }}</span>
          <div>
            <p class="text-3xl font-bold text-text-primary">10<span class="text-accent-cyan">+</span></p>
            <p class="text-xs text-text-secondary mt-1">{{ $t('hero.delivered') }}</p>
          </div>
        </div>
      </div>

      <!-- Quick info bar -->
      <div class="lg:col-span-5 card-base px-6 py-4 flex flex-wrap gap-6 items-center">
        <div v-for="item in quickInfo" :key="item.label" class="flex items-center gap-2 text-sm">
          <component :is="item.icon" :size="15" class="text-accent-blue flex-shrink-0" />
          <span class="text-text-muted">{{ item.label }}:</span>
          <span class="text-text-primary font-medium">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mail, Folder, MapPin, Code2, Briefcase, Globe, Download } from 'lucide-vue-next'
import { computed } from 'vue'

const { t } = useI18n()

const quickInfo = computed(() => [
  { icon: MapPin,    label: t('hero.locationLabel'),   value: t('hero.location') },
  { icon: Briefcase, label: t('hero.statusLabel'),     value: t('hero.status') },
  { icon: Code2,     label: t('hero.specialtyLabel'),  value: t('hero.specialty') },
  { icon: Globe,     label: t('hero.remoteLabel'),     value: t('hero.remote') },
])

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

