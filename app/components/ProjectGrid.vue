<template>
  <section id="projects" class="scroll-mt-20">
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    >
      <div class="card-base p-8 mb-4">
        <div class="section-label">
          <span class="font-mono text-accent-blue">~/</span> {{ $t('projects.sectionLabel') }}
        </div>
        <div class="flex items-end justify-between flex-wrap gap-3">
          <h2 class="text-2xl font-bold text-text-primary">{{ $t('projects.title') }}</h2>
          <a href="https://github.com/an90ass" target="_blank" class="flex items-center gap-1.5 text-sm text-accent-blue hover:text-accent-cyan transition-colors">
            {{ $t('projects.viewAll') }}
            <ArrowRight :size="14" />
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(project, i) in projects"
          :key="project.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 80 } }"
          class="card-base overflow-hidden group flex flex-col"
          :class="project.images.length > 0 ? 'cursor-pointer' : ''"
          @click="project.images.length > 0 ? openLightbox(i, activeSlide[i] || 0) : null"
        >
          <div class="relative overflow-hidden" style="height: 220px;">

            <template v-if="project.images.length > 0">
              <div
                class="flex h-full transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${(activeSlide[i] || 0) * 100}%)`, width: `${project.images.length * 100}%` }"
              >
                <img
                  v-for="(img, imgIdx) in project.images"
                  :key="imgIdx"
                  :src="img"
                  :alt="`${project.title} screenshot ${imgIdx + 1}`"
                  class="object-cover object-top flex-shrink-0"
                  :style="{ width: `${100 / project.images.length}%`, height: '220px' }"
                  loading="lazy"
                />
              </div>

              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-xs text-white border border-white/20">
                  <Maximize2 :size="13" />
                  {{ $t('projects.clickExpand') }}
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent pointer-events-none" />

              <button
                v-if="project.images.length > 1"
                class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-bg-primary/80 backdrop-blur-sm
                       flex items-center justify-center text-text-primary hover:bg-bg-hover transition-all
                       opacity-0 group-hover:opacity-100 duration-200 border border-bg-border z-10"
                @click.stop="prevSlide(i, project.images.length)"
              >
                <ChevronLeft :size="14" />
              </button>
              <button
                v-if="project.images.length > 1"
                class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-bg-primary/80 backdrop-blur-sm
                       flex items-center justify-center text-text-primary hover:bg-bg-hover transition-all
                       opacity-0 group-hover:opacity-100 duration-200 border border-bg-border z-10"
                @click.stop="nextSlide(i, project.images.length)"
              >
                <ChevronRight :size="14" />
              </button>

              <div v-if="project.images.length > 1" class="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                <button
                  v-for="(_, dotIdx) in project.images"
                  :key="dotIdx"
                  class="rounded-full transition-all duration-300"
                  :class="(activeSlide[i] || 0) === dotIdx ? 'w-4 h-1.5 bg-accent-blue' : 'w-1.5 h-1.5 bg-white/40'"
                  @click.stop="setSlide(i, dotIdx)"
                />
              </div>
            </template>

            <template v-else>
              <div class="absolute inset-0 flex flex-col items-center justify-center" :class="project.gradient">
                <div class="p-5 rounded-2xl bg-white/10 backdrop-blur-sm mb-3 border border-white/10">
                  <component :is="project.icon" :size="36" class="text-white" />
                </div>
                <p class="text-white/70 text-xs font-mono px-4 text-center">{{ project.category }}</p>
              </div>
            </template>

            <div class="absolute top-3 left-3 z-10">
              <span class="text-xs px-2 py-1 rounded-lg bg-bg-primary/80 backdrop-blur-sm text-text-muted border border-bg-border font-mono">
                {{ project.category }}
              </span>
            </div>
          </div>

          <div class="flex flex-col flex-1 p-5">
            <div class="flex items-start justify-between mb-2 gap-2">
              <div class="flex items-center gap-2">
                <div class="p-2 rounded-xl flex-shrink-0" :class="project.iconBg">
                  <component :is="project.icon" :size="16" :class="project.iconColor" />
                </div>
                <h3 class="font-semibold text-text-primary text-sm leading-tight">{{ project.title }}</h3>
              </div>
              <div class="flex gap-1.5 flex-shrink-0">
                <a v-if="project.github" :href="project.github" target="_blank"
                   class="p-1.5 rounded-lg bg-bg-border hover:bg-bg-hover text-text-muted hover:text-text-primary
                          transition-all duration-200"
                   @click.stop>
                  <Github :size="13" />
                </a>
                <a v-if="project.live" :href="project.live" target="_blank"
                   class="p-1.5 rounded-lg bg-bg-border hover:bg-bg-hover text-text-muted hover:text-text-primary
                          transition-all duration-200"
                   @click.stop>
                  <ExternalLink :size="13" />
                </a>
              </div>
            </div>

            <p class="text-text-muted text-xs leading-relaxed mb-3 flex-1">{{ project.description }}</p>

            <div class="flex flex-wrap gap-1.5 mt-auto">
              <span v-for="tag in project.tags" :key="tag" class="tech-badge">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lb-fade">
        <div
          v-if="lightbox.open"
          class="fixed inset-0 z-[200] flex items-center justify-center"
          style="background: rgba(2, 6, 23, 0.93); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);"
          @click.self="closeLightbox"
        >
          <button
            class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 border border-white/20 z-20 hover:scale-110"
            @click="closeLightbox"
          >
            <X :size="18" />
          </button>

          <div class="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 z-20">
            <span class="text-white/80 text-xs font-mono">{{ lightbox.slide + 1 }} / {{ lightboxImages.length }}</span>
          </div>

          <div class="absolute bottom-5 left-1/2 -translate-x-1/2 text-center z-20 max-w-xs">
            <p class="text-white/90 font-semibold text-sm">{{ lightboxProject?.title }}</p>
          </div>

          <div v-if="lightboxImages.length > 1" class="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            <button
              v-for="(_, idx) in lightboxImages"
              :key="idx"
              class="rounded-full transition-all duration-300"
              :class="lightbox.slide === idx ? 'w-5 h-2 bg-accent-blue' : 'w-2 h-2 bg-white/30 hover:bg-white/50'"
              @click="lightbox.slide = idx"
            />
          </div>

          <div class="relative w-full h-full flex items-center justify-center px-20 py-20">
            <Transition :name="slideDirection === 'next' ? 'lb-slide-left' : 'lb-slide-right'" mode="out-in">
              <img
                :key="lightbox.slide"
                :src="lightboxImages[lightbox.slide]"
                :alt="`${lightboxProject?.title} - Image ${lightbox.slide + 1}`"
                class="max-w-full max-h-full object-contain rounded-xl shadow-2xl select-none"
                style="max-height: calc(100vh - 180px); max-width: calc(100vw - 160px);"
                draggable="false"
              />
            </Transition>
          </div>

          <button
            v-if="lightboxImages.length > 1"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 border border-white/20 z-20 hover:scale-110"
            @click="lightboxPrev"
          >
            <ChevronLeft :size="22" />
          </button>

          <button
            v-if="lightboxImages.length > 1"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 border border-white/20 z-20 hover:scale-110"
            @click="lightboxNext"
          >
            <ChevronRight :size="22" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Github, ExternalLink, ArrowRight,
  Smartphone, ChevronLeft, ChevronRight,
  Shield, Clock, Map, Activity, Brain,
  X, Maximize2
} from 'lucide-vue-next'

const activeSlide = ref<Record<number, number>>({})

function nextSlide(idx: number, total: number) {
  activeSlide.value[idx] = ((activeSlide.value[idx] || 0) + 1) % total
}

function prevSlide(idx: number, total: number) {
  activeSlide.value[idx] = ((activeSlide.value[idx] || 0) - 1 + total) % total
}

function setSlide(idx: number, slide: number) {
  activeSlide.value[idx] = slide
}

const lightbox = ref({ open: false, projectIdx: -1, slide: 0 })
const slideDirection = ref<'next' | 'prev'>('next')

const lightboxImages = computed(() =>
  lightbox.value.projectIdx >= 0 ? projects.value[lightbox.value.projectIdx]?.images ?? [] : []
)

const lightboxProject = computed(() =>
  lightbox.value.projectIdx >= 0 ? projects.value[lightbox.value.projectIdx] : null
)

function openLightbox(projectIdx: number, slideIdx: number) {
  lightbox.value = { open: true, projectIdx, slide: slideIdx }
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.value.open = false
  document.body.style.overflow = ''
}

function lightboxNext() {
  slideDirection.value = 'next'
  const total = lightboxImages.value.length
  lightbox.value.slide = (lightbox.value.slide + 1) % total
}

function lightboxPrev() {
  slideDirection.value = 'prev'
  const total = lightboxImages.value.length
  lightbox.value.slide = (lightbox.value.slide - 1 + total) % total
}

function handleKeydown(e: KeyboardEvent) {
  if (!lightbox.value.open) return
  if (e.key === 'Escape')      closeLightbox()
  if (e.key === 'ArrowRight')  lightboxNext()
  if (e.key === 'ArrowLeft')   lightboxPrev()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

const { t, locale } = useI18n()

const turviaImages = computed(() => {
  if (locale.value === 'ar') {
    return [
      useAsset('projects/Turvia/3.png'),
      useAsset('projects/Turvia/5.png'),
      useAsset('projects/Turvia/9.png'),
      useAsset('projects/Turvia/12.png'),
      useAsset('projects/Turvia/15.png'),
      useAsset('projects/Turvia/18.png'),
      useAsset('projects/Turvia/21.png'),
      useAsset('projects/Turvia/24.png'),
    ]
  } else if (locale.value === 'tr') {
    return [
      useAsset('projects/Turvia/1.png'),
      useAsset('projects/Turvia/4.png'),
      useAsset('projects/Turvia/7.png'),
      useAsset('projects/Turvia/10.png'),
      useAsset('projects/Turvia/13.png'),
      useAsset('projects/Turvia/16.png'),
      useAsset('projects/Turvia/19.png'),
      useAsset('projects/Turvia/22.png'),
      useAsset('projects/Turvia/26.png'),
      useAsset('projects/Turvia/27.png'),
      useAsset('projects/Turvia/28.png'),
      useAsset('projects/Turvia/29.png'),
    ]
  } else {
    return [
      useAsset('projects/Turvia/2.png'),
      useAsset('projects/Turvia/6.png'),
      useAsset('projects/Turvia/8.png'),
      useAsset('projects/Turvia/11.png'),
      useAsset('projects/Turvia/14.png'),
      useAsset('projects/Turvia/17.png'),
      useAsset('projects/Turvia/20.png'),
      useAsset('projects/Turvia/23.png'),
      useAsset('projects/Turvia/25.png'),
    ]
  }
})

const projects = computed(() => [
  {
    title: t('projects.p1.title'),
    description: t('projects.p1.description'),
    category: t('projects.p1.category'),
    icon: Map,
    iconBg: 'bg-accent-cyan/10',
    iconColor: 'text-accent-cyan',
    gradient: 'bg-gradient-to-br from-cyan-600/50 via-blue-600/30 to-teal-700/50',
    tags: ['Flutter', 'Clean Architecture', 'Bloc/Cubit', 'FastAPI', 'Mapbox', 'Dio', 'iyzico'],
    github: null,
    live: 'https://apps.apple.com/tr/app/turvia/id6758253095',
    images: turviaImages.value,
  },
  {
    title: t('projects.p2.title'),
    description: t('projects.p2.description'),
    category: t('projects.p2.category'),
    icon: Smartphone,
    iconBg: 'bg-accent-blue/10',
    iconColor: 'text-accent-blue',
    gradient: 'bg-gradient-to-br from-blue-700/50 via-purple-600/30 to-blue-900/50',
    tags: ['Flutter', 'Provider', 'Clean Architecture', 'Google Maps', 'IoT', 'BLE', 'SQLite'],
    github: null,
    live: 'https://kurtarplatform.github.io/',
    images: [
      useAsset('projects/Kurtar/grup_takibi.png'),
      useAsset('projects/Kurtar/anlik-konum.png'),
      useAsset('projects/Kurtar/durum_guncelleme.png'),
      useAsset('projects/Kurtar/grup_takibi2.png'),
      useAsset('projects/Kurtar/grup_takibi3.png'),
      useAsset('projects/Kurtar/offline_blue.png'),
      useAsset('projects/Kurtar/veri_mekanizmasi.png'),
      useAsset('projects/Kurtar/yerel_veri_saklama.png'),
      useAsset('projects/Kurtar/ble_mesagges.jpg'),
    ],
  },
  {
    title: t('projects.p3.title'),
    description: t('projects.p3.description'),
    category: t('projects.p3.category'),
    icon: Activity,
    iconBg: 'bg-accent-green/10',
    iconColor: 'text-accent-green',
    gradient: 'bg-gradient-to-br from-green-700/50 via-emerald-600/30 to-teal-700/50',
    tags: ['Flutter', 'Sensor Framework', 'Multi-threading', 'WebSockets', 'SQLite', 'AI Inference'],
    github: null,
    live: null,
    images: [
      useAsset('projects/KurtarSaha/Screenshot_1779105689.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488288.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488294.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488329.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488338.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488348.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488362.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488594.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488603.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488616.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488628.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488637.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488641.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488664.png'),
      useAsset('projects/KurtarSaha/Screenshot_1782488669.png'),
    ],
  },
  {
    title: t('projects.p4.title'),
    description: t('projects.p4.description'),
    category: t('projects.p4.category'),
    icon: Shield,
    iconBg: 'bg-accent-purple/10',
    iconColor: 'text-accent-purple',
    gradient: 'bg-gradient-to-br from-purple-700/50 via-violet-600/30 to-purple-900/50',
    tags: ['Flutter', 'FastAPI', 'PostgreSQL', 'BLoC', 'NFC', 'MRZ', 'OpenCV', 'ML Kit'],
    github: null,
    live: null,
    images: [
      useAsset('projects/DigiVis/onboarding_main.png'),
      useAsset('projects/DigiVis/kyc_verification.png'),
      useAsset('projects/DigiVis/face_match.png'),
    ],
  },
  {
  title: t('projects.pharma.title'),
  description: t('projects.pharma.description'),
  category: t('projects.pharma.category'),
  icon: Smartphone,
  iconBg: 'bg-accent-blue/10',
  iconColor: 'text-accent-blue',
  gradient: 'bg-gradient-to-br from-blue-700/50 via-indigo-600/30 to-blue-900/50',
tags: [
  'Flutter',
  'Riverpod',
  'Clean Architecture',
  'Firebase',
  'Firestore',
  'GoRouter',
  'Dartz',        
  'Equatable',   
],  github: 'https://github.com/an90ass/Pharma',
  live: null,
  images: [
        useAsset('projects/Pharma/1 (8).png'),

    useAsset('projects/Pharma/1 (1).png'),
    useAsset('projects/Pharma/1 (2).png'),
    useAsset('projects/Pharma/1 (3).png'),
       useAsset('projects/Pharma/1 (4).png'),
    useAsset('projects/Pharma/1 (5).png'),
    useAsset('projects/Pharma/1 (6).png'),
       useAsset('projects/Pharma/1 (7).png'),
    useAsset('projects/Pharma/1 (9).png'), 
    useAsset('projects/Pharma/1 (10).png'),
    useAsset('projects/Pharma/1 (11).png'),   
    useAsset('projects/Pharma/1 (12).png'),
    useAsset('projects/Pharma/1 (13).png'),
       useAsset('projects/Pharma/1 (14).png'),
    useAsset('projects/Pharma/1 (15).png'), 
    useAsset('projects/Pharma/1 (16).png'),
    useAsset('projects/Pharma/1 (17).png'),   
    useAsset('projects/Pharma/1 (18).png'),
    useAsset('projects/Pharma/1 (19).png'),
     useAsset('projects/Pharma/1 (20).png'),
          useAsset('projects/Pharma/1 (21).png'),
               useAsset('projects/Pharma/1 (22).png'),
                    useAsset('projects/Pharma/1 (23).png'),
                         useAsset('projects/Pharma/1 (24).png'),
                              useAsset('projects/Pharma/1 (25).png'),
  ],
},
 
  {
  title: t('projects.syncledger.title'),
  description: t('projects.syncledger.description'),
  category: t('projects.syncledger.category'),
  icon: Smartphone,
  iconBg: 'bg-accent-blue/10',
  iconColor: 'text-accent-blue',
  gradient: 'bg-gradient-to-br from-blue-700/50 via-indigo-600/30 to-blue-900/50',
  tags: ['Flutter', 'BLoC', 'GoRouter', 'Hive', 'Bluetooth Thermal', 'QR Code', 'get_it'],
  github: 'https://github.com/an90ass/SyncLedger', 
  live: null,
  images: [
    useAsset('projects/SyncLedger/1 (1).png'),
    useAsset('projects/SyncLedger/1 (2).png'),
       useAsset('projects/SyncLedger/1 (3).png'),
  useAsset('projects/SyncLedger/1 (4).png'),
    useAsset('projects/SyncLedger/1 (5).png'),
       useAsset('projects/SyncLedger/1 (6).png'),
        useAsset('projects/SyncLedger/1 (7).png'),
       useAsset('projects/SyncLedger/1 (8).png'),
  ],
},
 {
    title: t('projects.p5.title'),
    description: t('projects.p5.description'),
    category: t('projects.p5.category'),
    icon: Shield,
    iconBg: 'bg-accent-cyan/10',
    iconColor: 'text-accent-cyan',
    gradient: 'bg-gradient-to-br from-cyan-700/50 via-blue-600/30 to-cyan-900/50',
    tags: ['Flutter', 'Provider', 'QR Code', 'AES Encryption', 'Localization', 'RTL'],
    github: 'https://github.com/an90ass/IbanValut',
    live: null,
    images: [
      useAsset('projects/IbanValut/1.png'),
      useAsset('projects/IbanValut/2.png'),
      useAsset('projects/IbanValut/3.png'),
      useAsset('projects/IbanValut/4.png'),
      useAsset('projects/IbanValut/5.png'),
      useAsset('projects/IbanValut/6.png'),
      useAsset('projects/IbanValut/7.png'),
      useAsset('projects/IbanValut/8.png'),
      useAsset('projects/IbanValut/9.png'),
      useAsset('projects/IbanValut/10.png'),
      useAsset('projects/IbanValut/11.png'),
      useAsset('projects/IbanValut/12.png'),
      useAsset('projects/IbanValut/13.png'),
      useAsset('projects/IbanValut/14.png'),
      useAsset('projects/IbanValut/15.jpg'),
      useAsset('projects/IbanValut/16.png'),
    ],
  },
  {
    title: t('projects.p6.title'),
    description: t('projects.p6.description'),
    category: t('projects.p6.category'),
    icon: Clock,
    iconBg: 'bg-accent-purple/10',
    iconColor: 'text-accent-purple',
    gradient: 'bg-gradient-to-br from-purple-700/50 via-indigo-600/30 to-purple-900/50',
    tags: ['Flutter', 'BLoC', 'GPS', 'Hive', 'Localization', 'RTL', 'Notifications'],
    github: 'https://github.com/an90ass/vakit',
    live: null,
    images: [
      useAsset('projects/Vakit/1.png'),
      useAsset('projects/Vakit/2.png'),
      useAsset('projects/Vakit/3.png'),
      useAsset('projects/Vakit/4.png'),
      useAsset('projects/Vakit/5.png'),
      useAsset('projects/Vakit/6.png'),
      useAsset('projects/Vakit/7.png'),
      useAsset('projects/Vakit/8.png'),
      useAsset('projects/Vakit/9.png'),
      useAsset('projects/Vakit/10.png'),
      useAsset('projects/Vakit/11.png'),
      useAsset('projects/Vakit/12.png'),
      useAsset('projects/Vakit/13.png'),
      useAsset('projects/Vakit/14.png'),
    ],
  },
  {
    title: t('projects.p9.title'),
    description: t('projects.p9.description'),
    category: t('projects.p9.category'),
    icon: Shield,
    iconBg: 'bg-accent-green/10',
    iconColor: 'text-accent-green',
    gradient: 'bg-gradient-to-br from-emerald-700/50 via-green-600/30 to-teal-800/50',
    tags: ['Flutter', 'Clean Architecture', 'MVVM', 'Provider', 'Dart Isolates', 'Network Security'],
    github: null,
    live: null,
    images: [
      useAsset('projects/NetGuard/netGuard.png'),
    ],
  },
  {
    title: t('projects.p7.title'),
    description: t('projects.p7.description'),
    category: t('projects.p7.category'),
    icon: Smartphone,
    iconBg: 'bg-accent-green/10',
    iconColor: 'text-accent-green',
    gradient: 'bg-gradient-to-br from-green-700/50 via-emerald-600/30 to-teal-700/50',
    tags: ['Flutter', 'UI/UX Design', 'Custom Animations', 'Responsive Dashboard', 'Interactive Charts'],
    github: null,
    live: null,
    images: [
      useAsset('projects/LenDeX/1.jpg'),
      useAsset('projects/LenDeX/2.jpg'),
      useAsset('projects/LenDeX/3.jpg'),
      useAsset('projects/LenDeX/4.jpg'),
      useAsset('projects/LenDeX/5.jpg'),
      useAsset('projects/LenDeX/6.jpg'),
      useAsset('projects/LenDeX/7.jpg'),
      useAsset('projects/LenDeX/8.jpg'),
    ],
  },
  {
    title: t('projects.p8.title'),
    description: t('projects.p8.description'),
    category: t('projects.p8.category'),
    icon: Brain,
    iconBg: 'bg-accent-blue/10',
    iconColor: 'text-accent-blue',
    gradient: 'bg-gradient-to-br from-blue-700/50 via-indigo-600/30 to-blue-900/50',
    tags: ['Flutter', 'Firebase', 'Provider', 'YOLOv5', 'AI/ML', 'Accessibility'],
    github: null,
    live: null,
    images: [] as string[],
  },
])
</script>

<style scoped>
.lb-fade-enter-active,
.lb-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.lb-slide-left-enter-active,
.lb-slide-left-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.lb-slide-left-enter-from {
  opacity: 0;
  transform: translateX(60px) scale(0.97);
}
.lb-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-60px) scale(0.97);
}

.lb-slide-right-enter-active,
.lb-slide-right-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.lb-slide-right-enter-from {
  opacity: 0;
  transform: translateX(-60px) scale(0.97);
}
.lb-slide-right-leave-to {
  opacity: 0;
  transform: translateX(60px) scale(0.97);
}
</style>