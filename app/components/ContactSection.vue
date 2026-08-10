<template>
  <section id="contact" class="scroll-mt-20">
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="grid grid-cols-1 lg:grid-cols-5 gap-4"
    >
      <!-- Contact info -->
      <div class="lg:col-span-2 card-base p-8 flex flex-col justify-between">
        <div>
          <div class="section-label">
            <span class="font-mono text-accent-blue">~/</span> {{ $t('contact.sectionLabel') }}
          </div>
          <h2 class="text-2xl font-bold text-text-primary mb-3">{{ $t('contact.title') }}</h2>
          <p class="text-text-muted text-sm leading-relaxed mb-6">
            {{ $t('contact.description') }}
          </p>

          <ul class="space-y-4">
            <li v-for="item in contactItems" :key="item.label"
                class="flex items-center gap-3">
              <div class="p-2.5 rounded-xl bg-bg-border">
                <component :is="item.icon" :size="16" class="text-accent-blue" />
              </div>
              <div>
                <p class="text-xs text-text-muted">{{ item.label }}</p>
                <a :href="item.href" class="text-sm text-text-primary hover:text-accent-blue transition-colors">
                  {{ item.value }}
                </a>
              </div>
            </li>
          </ul>
        </div>

        <!-- Social grid -->
        <div class="mt-8 pt-6 border-t border-bg-border">
          <p class="text-xs text-text-muted mb-3 font-mono uppercase tracking-wider">{{ $t('contact.findMe') }}</p>
          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.href" :href="social.href" target="_blank"
               class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-bg-border
                      border border-bg-border hover:border-accent-blue/40 hover:bg-bg-hover
                      text-text-secondary hover:text-text-primary transition-all duration-200 text-xs font-medium">
              <component :is="social.icon" :size="14" />
              {{ social.label }}
            </a>
          </div>
        </div>
      </div>

      <!-- Contact form -->
      <div class="lg:col-span-3 card-base p-8">
        <h3 class="text-lg font-semibold text-text-primary mb-5">{{ $t('contact.formTitle') }}</h3>

        <form @submit.prevent="sendMessage" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-text-muted mb-1.5 font-mono">{{ $t('contact.nameLabel') }}</label>
              <input
                v-model="form.name"
                type="text"
                :placeholder="t('contact.namePlaceholder')"
                required
                class="w-full px-4 py-2.5 rounded-xl bg-bg-border border border-bg-border
                       text-text-primary placeholder-text-muted text-sm
                       focus:outline-none focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30
                       transition-all duration-200"
              />
            </div>
            <div>
              <label class="block text-xs text-text-muted mb-1.5 font-mono">{{ $t('contact.emailFormLabel') }}</label>
              <input
                v-model="form.email"
                type="email"
                :placeholder="t('contact.emailPlaceholder')"
                required
                class="w-full px-4 py-2.5 rounded-xl bg-bg-border border border-bg-border
                       text-text-primary placeholder-text-muted text-sm
                       focus:outline-none focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30
                       transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs text-text-muted mb-1.5 font-mono">{{ $t('contact.subjectLabel') }}</label>
            <input
              v-model="form.subject"
              type="text"
              :placeholder="t('contact.subjectPlaceholder')"
              class="w-full px-4 py-2.5 rounded-xl bg-bg-border border border-bg-border
                     text-text-primary placeholder-text-muted text-sm
                     focus:outline-none focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30
                     transition-all duration-200"
            />
          </div>

          <div>
            <label class="block text-xs text-text-muted mb-1.5 font-mono">{{ $t('contact.messageLabel') }}</label>
            <textarea
              v-model="form.message"
              rows="5"
              :placeholder="t('contact.messagePlaceholder')"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-bg-border border border-bg-border
                     text-text-primary placeholder-text-muted text-sm resize-none
                     focus:outline-none focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30
                     transition-all duration-200"
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
            class="w-full flex items-center justify-center gap-2 py-3 px-6
                   bg-accent-blue hover:bg-accent-blue/90 disabled:opacity-60 disabled:cursor-not-allowed
                   text-white font-medium rounded-xl transition-all duration-200 text-sm"
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
  { icon: Mail,    label: t('contact.emailLabel'),    href: 'mailto:anass12976@gmail.com', value: 'anass12976@gmail.com' },
  { icon: MapPin,  label: t('contact.locationLabel'), href: '#',                            value: t('contact.locationValue') },
])

const socials = [
  { icon: Github,   href: 'https://github.com/an90ass/',                                label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/anas-al-maqtari-12815124b/?locale=en', label: 'LinkedIn' },
]

async function sendMessage() {
  sending.value = true
  status.value = 'idle'
  try {
    // Replace with your actual endpoint (EmailJS, Resend, Netlify Forms, etc.)
    await new Promise(r => setTimeout(r, 1200))
    status.value = 'success'
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch {
    status.value = 'error'
  } finally {
    sending.value = false
  }
}
</script>

