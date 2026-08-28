<template>
  <section id="contact" class="scroll-mt-20 pt-16 border-t border-bg-border/60">
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
    >
      <!-- Left Column: Direct Inquiries -->
      <div class="lg:col-span-5 space-y-8">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-text-primary mb-3">{{ $t('contact.title') }}</h2>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ $t('contact.description') }}
          </p>
        </div>

        <ul class="space-y-4">
          <li
            v-for="item in contactItems"
            :key="item.label"
            class="flex items-center gap-3.5 p-3 rounded-xl bg-bg-secondary/50 border border-bg-border/50 hover:border-accent-amber/40 transition-all"
          >
            <div class="w-10 h-10 rounded-lg bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center text-accent-amber flex-shrink-0">
              <component :is="item.icon" :size="16" />
            </div>
            <div>
              <p class="text-[11px] text-text-muted font-mono uppercase">{{ item.label }}</p>
              <a :href="item.href" class="text-sm font-semibold text-text-primary hover:text-accent-amber transition-colors">
                {{ item.value }}
              </a>
            </div>
          </li>
        </ul>

        <!-- Social grid -->
        <div class="pt-4 border-t border-bg-border/50">
          <p class="text-xs text-text-muted mb-3 font-mono uppercase tracking-wider">{{ $t('contact.findMe') }}</p>
          <div class="flex gap-2.5">
            <a
              v-for="social in socials"
              :key="social.href"
              :href="social.href"
              target="_blank"
              class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-bg-secondary/70 border border-bg-border/60 hover:border-accent-amber/40 hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-all text-xs font-medium"
            >
              <component :is="social.icon" :size="14" />
              {{ social.label }}
            </a>
          </div>
        </div>
      </div>

      <!-- Right Column: Minimalist Contact Form -->
      <div class="lg:col-span-7 rounded-2xl p-7 sm:p-8 bg-bg-secondary/40 border border-bg-border/60 backdrop-blur-sm">
        <h3 class="text-lg font-bold text-text-primary mb-6">{{ $t('contact.formTitle') }}</h3>

        <form @submit.prevent="sendMessage" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-text-muted mb-1.5 font-mono">{{ $t('contact.nameLabel') }}</label>
              <input
                v-model="form.name"
                type="text"
                :placeholder="t('contact.namePlaceholder')"
                required
                class="w-full px-4 py-2.5 rounded-xl bg-bg-card border border-bg-border/70 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-amber/60 focus:ring-1 focus:ring-accent-amber/30 transition-all duration-200"
              />
            </div>
            <div>
              <label class="block text-xs text-text-muted mb-1.5 font-mono">{{ $t('contact.emailFormLabel') }}</label>
              <input
                v-model="form.email"
                type="email"
                :placeholder="t('contact.emailPlaceholder')"
                required
                class="w-full px-4 py-2.5 rounded-xl bg-bg-card border border-bg-border/70 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-amber/60 focus:ring-1 focus:ring-accent-amber/30 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs text-text-muted mb-1.5 font-mono">{{ $t('contact.subjectLabel') }}</label>
            <input
              v-model="form.subject"
              type="text"
              :placeholder="t('contact.subjectPlaceholder')"
              class="w-full px-4 py-2.5 rounded-xl bg-bg-card border border-bg-border/70 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-amber/60 focus:ring-1 focus:ring-accent-amber/30 transition-all duration-200"
            />
          </div>

          <div>
            <label class="block text-xs text-text-muted mb-1.5 font-mono">{{ $t('contact.messageLabel') }}</label>
            <textarea
              v-model="form.message"
              rows="5"
              :placeholder="t('contact.messagePlaceholder')"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-bg-card border border-bg-border/70 text-text-primary placeholder-text-muted text-sm resize-none focus:outline-none focus:border-accent-amber/60 focus:ring-1 focus:ring-accent-amber/30 transition-all duration-200"
            />
          </div>

          <!-- Status messages -->
          <div v-if="status === 'success'"
               class="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent-green/10 border border-accent-green/30 text-accent-green text-sm">
            <CheckCircle :size="16" />
            {{ $t('contact.success') }}
          </div>
          <div v-if="status === 'error'"
               class="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            <AlertCircle :size="16" />
            {{ $t('contact.error') }}
          </div>

          <button
            type="submit"
            :disabled="sending"
            class="w-full flex items-center justify-center gap-2 py-3 px-6 bg-accent-amber hover:bg-accent-gold disabled:opacity-60 disabled:cursor-not-allowed text-stone-950 font-bold shadow-md shadow-accent-amber/20 hover:shadow-accent-amber/35 rounded-xl transition-all duration-200 text-sm"
          >
            <Loader2 v-if="sending" :size="16" class="animate-spin" />
            <Send v-else :size="16" />
            {{ sending ? t('contact.sending') : t('contact.send') }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Mail, MapPin, Github, Linkedin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-vue-next'

const { t } = useI18n()

const form = ref({ name: '', email: '', subject: '', message: '' })
const sending = ref(false)
const status = ref<'idle' | 'success' | 'error'>('idle')

const contactItems = computed(() => [
  { icon: Mail,    label: t('contact.emailLabel'),    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=anass12976@gmail.com', value: 'anass12976@gmail.com' },
  { icon: MapPin,  label: t('contact.locationLabel'), href: '#',                            value: t('contact.locationValue') },
])

const socials = [
  { icon: Github,   href: 'https://github.com/an90ass/',                                label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/anas-al-maqtari-12815124b/?locale=en', label: 'LinkedIn' },
]

function sendMessage() {
  sending.value = true
  status.value = 'idle'
  const subject = encodeURIComponent(form.value.subject || `Portfolio Inquiry from ${form.value.name || 'Visitor'}`)
  const body = encodeURIComponent(`Name: ${form.value.name}\nEmail: ${form.value.email}\n\nMessage:\n${form.value.message}`)
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=anass12976@gmail.com&su=${subject}&body=${body}`
  
  window.open(gmailUrl, '_blank')
  status.value = 'success'
  sending.value = false
}
</script>

