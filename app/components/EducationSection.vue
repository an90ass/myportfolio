<template>
  <section id="education" class="scroll-mt-20 pt-16 border-t border-bg-border/60">
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="space-y-10"
    >
      <!-- Section Header -->
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-text-primary">{{ $t('education.title') }}</h2>
      </div>

      <!-- Minimalist Editorial Academic List (Border-Free & Spacious) -->
      <div class="space-y-8 divide-y divide-bg-border/40">
        <div
          v-for="(edu, i) in educationList"
          :key="edu.degree"
          v-motion
          :initial="{ opacity: 0, y: 15 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 80 } }"
          class="pt-8 first:pt-0 group"
        >
          <div class="space-y-3">
            <!-- Top Line: Degree Title & Badges -->
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div class="flex flex-wrap items-center gap-2.5">
                <h3 class="text-lg sm:text-xl font-bold text-text-primary group-hover:text-accent-amber transition-colors">
                  {{ edu.degree }}
                </h3>
                <span class="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-accent-amber/10 text-accent-amber">
                  {{ edu.badge }}
                </span>
              </div>

              <div class="flex items-center gap-2 text-xs font-mono text-text-muted">
                <span>{{ edu.period }}</span>
                <span>•</span>
                <span class="text-accent-amber font-semibold">{{ edu.gpa }}</span>
              </div>
            </div>

            <!-- University Link, Location & Certificate -->
            <div class="flex flex-wrap items-center gap-3 text-sm">
              <a
                :href="edu.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-text-primary hover:text-accent-amber font-medium transition-colors group/link"
              >
                <span>{{ edu.school }}</span>
                <ExternalLink :size="13" class="text-text-muted group-hover/link:text-accent-amber transition-colors" />
              </a>
              <span class="text-text-muted text-xs">•</span>
              <span class="text-xs text-text-muted">{{ edu.location }}</span>

              <!-- Certificates Preview Buttons -->
              <div v-if="edu.certificates?.length" class="flex flex-wrap items-center gap-2">
                <button
                  v-for="cert in edu.certificates"
                  :key="cert.url"
                  @click="selectedCertificate = cert"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-amber/10 hover:bg-accent-amber/20 text-accent-amber text-xs font-semibold transition-all cursor-pointer border border-accent-amber/20 hover:border-accent-amber/40"
                >
                  <Award :size="13" class="flex-shrink-0" />
                  <span>{{ cert.title }}</span>
                </button>
              </div>
            </div>

            <!-- Thesis / Note Highlight -->
            <div class="pt-1.5 flex flex-col sm:flex-row sm:items-start gap-2.5 max-w-4xl">
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-accent-amber/10 border border-accent-amber/25 text-accent-amber text-xs font-mono font-semibold shrink-0">
                <BookOpen :size="12" class="flex-shrink-0" />
                {{ edu.thesisTitle }}:
              </span>
              <p class="text-xs sm:text-sm text-text-secondary leading-relaxed pt-0.5">
                {{ edu.note }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Certificate Lightbox Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="selectedCertificate"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          @click.self="selectedCertificate = null"
        >
          <div class="relative max-w-3xl w-full max-h-[90vh] bg-bg-card rounded-2xl overflow-hidden shadow-2xl border border-bg-border/60 flex flex-col">
            <div class="flex items-center justify-between p-4 border-b border-bg-border">
              <div class="flex items-center gap-2">
                <Award :size="18" class="text-accent-amber" />
                <h4 class="text-sm font-bold text-text-primary">{{ selectedCertificate.title }}</h4>
              </div>
              <button
                @click="selectedCertificate = null"
                class="p-1.5 rounded-lg hover:bg-bg-hover text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <X :size="18" />
              </button>
            </div>
            <div class="p-2 sm:p-4 overflow-auto flex items-center justify-center bg-black/40">
              <img
                :src="selectedCertificate.url"
                :alt="selectedCertificate.title"
                class="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ExternalLink, Award, BookOpen, X } from 'lucide-vue-next'
import { ref, computed } from 'vue'

const { t } = useI18n()
const selectedCertificate = ref<{ title: string; url: string } | null>(null)

const educationList = computed(() => [
  {
    degree: t('education.edu1.degree'),
    school: t('education.edu1.school'),
    url: t('education.edu1.url'),
    location: t('education.edu1.location'),
    period: t('education.edu1.period'),
    gpa: t('education.edu1.gpa'),
    badge: t('education.edu1.badge'),
    thesisTitle: t('education.edu1.thesisTitle'),
    note: t('education.edu1.note'),
  },
  {
    degree: t('education.edu2.degree'),
    school: t('education.edu2.school'),
    url: t('education.edu2.url'),
    location: t('education.edu2.location'),
    period: t('education.edu2.period'),
    gpa: t('education.edu2.gpa'),
    badge: t('education.edu2.badge'),
    thesisTitle: t('education.edu2.thesisTitle'),
    note: t('education.edu2.note'),
    certificates: [
      { title: t('education.viewCertificate'), url: useAsset('media/honours_certificate.jpg') },
    ],
  },
  {
    degree: t('education.edu3.degree'),
    school: t('education.edu3.school'),
    url: t('education.edu3.url'),
    location: t('education.edu3.location'),
    period: t('education.edu3.period'),
    gpa: t('education.edu3.gpa'),
    badge: t('education.edu3.badge'),
    thesisTitle: t('education.edu3.thesisTitle'),
    note: t('education.edu3.note'),
    certificates: [
      { title: t('education.certBootcamp'), url: useAsset('media/1756246829920.jpg') },
      { title: t('education.certWeb'), url: useAsset('media/1756246830272.jpg') },
      { title: t('education.certEntrepreneurship'), url: useAsset('media/1756246830516.jpg') },
    ],
  },
])
</script>
