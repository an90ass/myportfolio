<template>
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
        v-if="isCvModalOpen"
        class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        @click.self="closeCvModal"
      >
        <div
          class="relative w-full max-w-md bg-bg-card rounded-2xl border border-bg-border/80 shadow-2xl overflow-hidden p-6 space-y-6"
        >
          <!-- Close button -->
          <button
            @click="closeCvModal"
            class="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X :size="18" />
          </button>

          <!-- Header -->
          <div class="space-y-1.5 pr-6">
            <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-accent-amber/10 border border-accent-amber/20 text-accent-amber text-xs font-mono font-medium">
              <FileDown :size="13" />
              <span>PDF FORMAT</span>
            </div>
            <h3 class="text-lg font-bold text-text-primary tracking-tight">
              {{ currentText.title }}
            </h3>
            <p class="text-xs text-text-muted leading-relaxed">
              {{ currentText.subtitle }}
            </p>
          </div>

          <!-- Options Grid -->
          <div class="space-y-3">
            <!-- English CV -->
            <button
              @click="downloadCv('en')"
              class="w-full flex items-center justify-between p-4 rounded-xl bg-bg-secondary/70 hover:bg-bg-hover border border-bg-border/70 hover:border-accent-amber/40 transition-all duration-200 group cursor-pointer text-left rtl:text-right"
            >
              <div class="flex items-center gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-bg-card border border-bg-border flex items-center justify-center text-xl flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  🇬🇧
                </div>
                <div class="text-sm font-bold text-text-primary group-hover:text-accent-amber transition-colors">
                  {{ currentText.enTitle }}
                </div>
              </div>
              <Download :size="16" class="text-text-muted group-hover:text-accent-amber group-hover:translate-y-0.5 transition-all flex-shrink-0" />
            </button>

            <!-- Turkish CV -->
            <button
              @click="downloadCv('tr')"
              class="w-full flex items-center justify-between p-4 rounded-xl bg-bg-secondary/70 hover:bg-bg-hover border border-bg-border/70 hover:border-accent-amber/40 transition-all duration-200 group cursor-pointer text-left rtl:text-right"
            >
              <div class="flex items-center gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-bg-card border border-bg-border flex items-center justify-center text-xl flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  🇹🇷
                </div>
                <div class="text-sm font-bold text-text-primary group-hover:text-accent-amber transition-colors">
                  {{ currentText.trTitle }}
                </div>
              </div>
              <Download :size="16" class="text-text-muted group-hover:text-accent-amber group-hover:translate-y-0.5 transition-all flex-shrink-0" />
            </button>
          </div>

          <!-- Footer note -->
          <div class="pt-2 border-t border-bg-border/40 text-[11px] font-mono text-text-muted flex items-center justify-between">
            <span>Anas AL-Maqtari</span>
            <span>UPDATED: OCT 2026</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X, Download, FileDown } from 'lucide-vue-next'
import { useCvModal } from '~/composables/useCvModal'

const { isCvModalOpen, closeCvModal } = useCvModal()
const { locale } = useI18n()

const dict = {
  ar: {
    title: 'تحميل السيرة الذاتية (CV)',
    subtitle: 'يرجى اختيار نسخة السيرة الذاتية:',
    enTitle: 'السيرة الذاتية باللغة الإنجليزية (PDF)',
    trTitle: 'السيرة الذاتية باللغة التركية (PDF)',
  },
  en: {
    title: 'Download Curriculum Vitae (CV)',
    subtitle: 'Please select your preferred language version:',
    enTitle: 'English CV (PDF)',
    trTitle: 'Türkçe CV (PDF)',
  },
  tr: {
    title: 'Özgeçmiş İndir (CV)',
    subtitle: 'Lütfen indirmek istediğiniz özgeçmişi seçin:',
    enTitle: 'İngilizce CV (PDF)',
    trTitle: 'Türkçe CV (PDF)',
  },
}

const currentText = computed(() => {
  const l = locale.value as 'ar' | 'en' | 'tr'
  return dict[l] || dict.en
})

function downloadCv(lang: 'en' | 'tr') {
  const config = useRuntimeConfig()
  const base = config.app.baseURL || '/'
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  const fileName = lang === 'en' ? 'Anas_ALMAQTARI_CV_EN.pdf' : 'Anas_ALMAQTARI_CV_TR.pdf'
  const fileUrl = `${cleanBase}${fileName}`

  const a = document.createElement('a')
  a.href = fileUrl
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  closeCvModal()
}
</script>
