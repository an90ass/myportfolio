<template>
  <!-- Floating Button -->
  <div class="chatbot-container">
    <Transition name="chat-window">
      <div v-if="isOpen" class="chat-window" :class="{ 'is-dark': isDark, 'is-light': !isDark }" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar">
              <img :src="avatarSrc" alt="Anas" @error="onAvatarError" />
              <span class="avatar-fallback" ref="fallbackRef">A</span>
              <span class="status-dot"></span>
            </div>
            <div>
              <p class="chat-name">{{ $t('chatbot.name') }}</p>
              <p class="chat-role">{{ $t('chatbot.role') }}</p>
            </div>
          </div>
          <button @click="isOpen = false" class="close-btn" aria-label="Close chat">
            <X :size="18" />
          </button>
        </div>

        <!-- Messages -->
        <div class="messages-area" ref="messagesRef">
          <!-- Welcome message -->
          <div class="message bot-message">
            <div class="message-bubble bot-bubble">
              <span v-html="$t('chatbot.welcome')"></span>
            </div>
          </div>

          <!-- Conversation -->
          <div v-for="(msg, i) in messages" :key="i"
               :class="['message', msg.role === 'user' ? 'user-message' : 'bot-message']">
            <div :class="['message-bubble', msg.role === 'user' ? 'user-bubble' : 'bot-bubble']">
              <span v-html="formatMessage(msg.content)"></span>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isLoading" class="message bot-message">
            <div class="message-bubble bot-bubble typing-bubble">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>

        <!-- Suggested questions -->
        <div v-if="messages.length === 0" class="suggestions">
          <button
            v-for="q in currentSuggestions"
            :key="q"
            @click="sendSuggestion(q)"
            class="suggestion-btn"
          >
            {{ q }}
          </button>
        </div>

        <!-- Input -->
        <div class="chat-input-area">
          <input
            v-model="inputText"
            @keydown.enter="sendMessage"
            :placeholder="$t('chatbot.placeholder')"
            :disabled="isLoading"
            class="chat-input"
            maxlength="300"
          />
          <button
            @click="sendMessage"
            :disabled="isLoading || !inputText.trim()"
            class="send-btn"
            aria-label="Send"
          >
            <Send :size="16" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- Action Buttons Stack (WhatsApp + AI Bot) -->
    <div class="floating-actions-stack">
      <!-- WhatsApp Quick Button -->
      <a
        href="https://wa.me/905397924923"
        target="_blank"
        rel="noopener noreferrer"
        class="whatsapp-btn"
        :title="locale === 'ar' ? 'تواصل عبر واتساب (+90 539 792 4923)' : locale === 'tr' ? 'WhatsApp ile iletişime geç (+90 539 792 4923)' : 'Chat on WhatsApp (+90 539 792 4923)'"
        aria-label="WhatsApp"
      >
        <svg class="wa-icon" viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span class="wa-pulse"></span>
      </a>

      <!-- Floating Toggle Button -->
      <button
        @click="toggleChat"
        class="chat-toggle-btn"
        :aria-label="isOpen ? 'Close chat' : 'Chat with Anas AI'"
      >
        <Transition name="icon-swap" mode="out-in">
          <!-- Close icon when open -->
          <X v-if="isOpen" :size="22" key="close" />
          <!-- AI Brain animated icon when closed -->
          <div v-else key="ai" class="ai-icon-wrapper">
            <!-- Orbiting dots -->
            <span class="orbit-dot orbit-dot-1"></span>
            <span class="orbit-dot orbit-dot-2"></span>
            <span class="orbit-dot orbit-dot-3"></span>
            <!-- AI Text -->
            <span class="ai-text">AI</span>
          </div>
        </Transition>
        <!-- Animated rings -->
        <span v-if="!isOpen" class="chat-pulse"></span>
        <span v-if="!isOpen" class="chat-pulse-2"></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { X, Send } from 'lucide-vue-next'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const { locale } = useI18n()
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()

const isOpen = ref(false)
const isLoading = ref(false)
const inputText = ref('')
const messages = ref<Array<{ role: 'user' | 'assistant'; content: string }>>([])
const messagesRef = ref<HTMLElement | null>(null)
const fallbackRef = ref<HTMLElement | null>(null)
const showBadge = ref(true)

const avatarSrc = computed(() => {
  const base = (runtimeConfig.app.baseURL || '/').replace(/\/$/, '')
  return `${base}/media/avatar.JPG`
})

function onAvatarError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
  if (fallbackRef.value) fallbackRef.value.style.display = 'flex'
}

const suggestions = {
  en: [
    'What are your main skills?',
    'Where have you worked?',
    'What apps have you built?',
    'What is your education?',
    'How can I contact you?',
  ],
  ar: [
    'ما هي مهاراتك الرئيسية؟',
    'أين عملت من قبل؟',
    'ما هي التطبيقات التي طورتها؟',
    'ما هو تعليمك ومؤهلاتك؟',
    'كيف يمكنني التواصل معك؟',
  ],
  tr: [
    'Ana becerileriniz nelerdir?',
    'Nerede çalıştınız?',
    'Hangi uygulamaları geliştirdiniz?',
    'Eğitiminiz nedir?',
    'Nasıl iletişime geçebilirim?',
  ],
}

const currentSuggestions = computed(() => {
  const lang = locale.value as 'en' | 'ar' | 'tr'
  return suggestions[lang] || suggestions.en
})

function toggleChat() {
  isOpen.value = !isOpen.value
  showBadge.value = false
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbynKNKN38wzNpZ9TBtL5A-pPpuJtIwNUfx6ovLvVyUnY22l3WfCuhc1vXW4W1zZeQPIIA/exec'
    let replyText = ''
    
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ question: text, lang: locale.value }),
      })
      const data = await response.json()
      replyText = data.reply || ''
    } catch (errGAS) {
      console.warn('Google Script fetch fallback to local API:', errGAS)
      const apiPath = `${(runtimeConfig.app.baseURL || '/').replace(/\/$/, '')}/api/chat`
      const res = await $fetch<{ reply: string }>(apiPath, {
        method: 'POST',
        body: { messages: messages.value, lang: locale.value },
      })
      replyText = res.reply
    }

    if (!replyText) throw new Error('No reply received')
    messages.value.push({ role: 'assistant', content: replyText })
  } catch (err: any) {
    console.error('Chat error details (internal):', err)
    messages.value.push({
      role: 'assistant',
      content: locale.value === 'ar'
        ? 'عذراً، حدث خطأ غير متوقع وأنس يعمل على إصلاحه حالياً 🛠️. يمكنك أيضاً مراسلته مباشرة عبر البريد anass12976@gmail.com أو قسم "تواصل معي"!'
        : locale.value === 'tr'
          ? 'Beklenmeyen bir hata oluştu ve Anas bunu düzeltmek için çalışıyor 🛠️. Kendisine anass12976@gmail.com adresinden veya İletişim bölümünden de ulaşabilirsiniz!'
          : 'An unexpected error occurred, and Anas is working on fixing it 🛠️. You can also reach him directly at anass12976@gmail.com or via the Contact section!',
    })
  } finally {
    isLoading.value = false
    await nextTick()
    scrollToBottom()
  }
}

function sendSuggestion(q: string) {
  inputText.value = q
  sendMessage()
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

function formatMessage(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
}

watch(isOpen, (val) => {
  if (val) nextTick(() => scrollToBottom())
})
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

/* Floating Action Stack (WhatsApp + AI Bot) */
.floating-actions-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

/* WhatsApp Floating Button */
.whatsapp-btn {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 18px rgba(37, 211, 102, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-decoration: none;
  cursor: pointer;
}
.whatsapp-btn:hover {
  transform: scale(1.12);
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.65), 0 3px 10px rgba(0, 0, 0, 0.25);
}
.whatsapp-btn:active {
  transform: scale(0.95);
}
.wa-icon {
  fill: #ffffff;
  transition: transform 0.25s ease;
}
.whatsapp-btn:hover .wa-icon {
  transform: scale(1.05);
}
.wa-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid rgba(37, 211, 102, 0.45);
  animation: wa-pulse-anim 2.6s ease-in-out infinite;
  pointer-events: none;
}
@keyframes wa-pulse-anim {
  0% { transform: scale(1); opacity: 0.6; }
  60% { transform: scale(1.2); opacity: 0; }
  100% { transform: scale(1.2); opacity: 0; }
}

/* Toggle Button */
.chat-toggle-btn {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d1f15, #0a3d28, #10b981);
  border: 1.5px solid rgba(16, 185, 129, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow:
    0 0 0 0 rgba(16, 185, 129, 0.4),
    0 4px 24px rgba(16, 185, 129, 0.35),
    inset 0 1px 0 rgba(255,255,255,0.1);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: btn-breathe 4s ease-in-out infinite;
}
.chat-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow:
    0 0 22px rgba(16, 185, 129, 0.7),
    0 6px 30px rgba(16, 185, 129, 0.5),
    inset 0 1px 0 rgba(255,255,255,0.15);
  border-color: rgba(52, 211, 153, 0.9);
}
.chat-toggle-btn:active { transform: scale(0.95); }

@keyframes btn-breathe {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4), 0 4px 24px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.1); }
  50%       { box-shadow: 0 0 18px 4px rgba(16,185,129,0.55), 0 4px 24px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.1); }
}

/* AI icon wrapper */
.ai-icon-wrapper {
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* AI bold text inside button */
.ai-text {
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(52, 211, 153, 0.9), 0 0 20px rgba(52, 211, 153, 0.5);
  animation: ai-glow 2.5s ease-in-out infinite;
  z-index: 2;
  position: relative;
}
@keyframes ai-glow {
  0%, 100% { text-shadow: 0 0 8px rgba(52,211,153,0.8), 0 0 16px rgba(52,211,153,0.4); opacity: 1; }
  50%       { text-shadow: 0 0 18px rgba(52,211,153,1),   0 0 30px rgba(52,211,153,0.7); opacity: 0.85; }
}

/* Orbiting dots */
.orbit-dot {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 6px #34d399;
}
.orbit-dot-1 {
  animation: orbit1 2.4s linear infinite;
}
.orbit-dot-2 {
  animation: orbit1 2.4s linear infinite -0.8s;
}
.orbit-dot-3 {
  animation: orbit1 2.4s linear infinite -1.6s;
}
@keyframes orbit1 {
  0%   { transform: rotate(0deg)   translateX(17px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(17px) rotate(-360deg); }
}

/* Dual pulse rings */
.chat-pulse {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1.5px solid rgba(16, 185, 129, 0.55);
  animation: pulse-ring 2.8s ease-in-out infinite;
  pointer-events: none;
}
.chat-pulse-2 {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 1px solid rgba(16, 185, 129, 0.25);
  animation: pulse-ring 2.8s ease-in-out infinite 0.7s;
  pointer-events: none;
}
@keyframes pulse-ring {
  0%   { transform: scale(1);    opacity: 0.7; }
  70%  { transform: scale(1.18); opacity: 0;   }
  100% { transform: scale(1.18); opacity: 0;   }
}

.chat-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: linear-gradient(135deg, #34d399, #10b981);
  color: #052e16;
  font-size: 0.6rem;
  font-weight: 800;
  padding: 2px 5px;
  border-radius: 8px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 6px rgba(16,185,129,0.4);
}

/* Chat Window */
.chat-window {
  width: clamp(300px, 90vw, 380px);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(16,185,129,0.15);
  max-height: 75dvh;
}

.chat-window.is-dark {
  background: #0f1623;
  border: 1px solid rgba(37, 46, 62, 0.8);
}
.chat-window.is-light {
  background: #ffffff;
  border: 1px solid rgba(226, 224, 218, 0.9);
}

/* Header */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  flex-shrink: 0;
}
.chat-header-info { display: flex; align-items: center; gap: 0.65rem; }
.chat-name { font-weight: 700; font-size: 0.9rem; color: #ffffff; }
.chat-role { font-size: 0.72rem; color: rgba(255,255,255,0.8); margin-top: 1px; }

.chat-avatar {
  position: relative;
  width: 38px; height: 38px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.4);
  overflow: hidden;
  background: #052e16;
  flex-shrink: 0;
}
.chat-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
.avatar-fallback {
  display: none;
  position: absolute; inset: 0;
  align-items: center; justify-content: center;
  font-size: 1.1rem; font-weight: 800; color: #10b981;
}
.status-dot {
  position: absolute; bottom: 1px; right: 1px;
  width: 9px; height: 9px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #059669;
  animation: blink 2s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.5} }

.close-btn {
  background: rgba(255,255,255,0.15);
  border: none; border-radius: 8px;
  padding: 5px; cursor: pointer;
  color: white; display: flex;
  transition: background 0.2s;
}
.close-btn:hover { background: rgba(255,255,255,0.3); }

/* Messages */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  min-height: 200px;
  scrollbar-width: thin;
  scrollbar-color: rgba(16,185,129,0.3) transparent;
}
.message { display: flex; }
.user-message { justify-content: flex-end; }
.bot-message { justify-content: flex-start; }

.message-bubble {
  max-width: 82%;
  padding: 0.6rem 0.85rem;
  border-radius: 16px;
  font-size: 0.83rem;
  line-height: 1.5;
  word-break: break-word;
}
.is-dark .bot-bubble {
  background: rgba(23, 29, 40, 0.9);
  border: 1px solid rgba(37, 46, 62, 0.7);
  color: #e2e8f0;
  border-bottom-left-radius: 4px;
}
.is-light .bot-bubble {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #1e293b;
  border-bottom-left-radius: 4px;
}
.user-bubble {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-bottom-right-radius: 4px;
  box-shadow: 0 2px 8px rgba(16,185,129,0.3);
}

/* Typing dots */
.typing-bubble {
  display: flex; align-items: center; gap: 5px;
  padding: 0.75rem 1rem;
}
.dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #10b981;
  animation: bounce 1.2s ease-in-out infinite;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
  40% { transform: scale(1.1); opacity: 1; }
}

/* Suggestions */
.suggestions {
  padding: 0.5rem 1rem 0.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  flex-shrink: 0;
}
.suggestion-btn {
  padding: 0.35rem 0.65rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.is-dark .suggestion-btn {
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.3);
  color: #34d399;
}
.is-dark .suggestion-btn:hover {
  background: rgba(16,185,129,0.2);
  border-color: rgba(16,185,129,0.6);
}
.is-light .suggestion-btn {
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.25);
  color: #059669;
}
.is-light .suggestion-btn:hover {
  background: rgba(16,185,129,0.18);
  border-color: rgba(16,185,129,0.5);
}

/* Input area */
.chat-input-area {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  flex-shrink: 0;
  border-top: 1px solid;
}
.is-dark .chat-input-area { border-color: rgba(37,46,62,0.8); }
.is-light .chat-input-area { border-color: #e2e8f0; }

.chat-input {
  flex: 1;
  padding: 0.55rem 0.85rem;
  border-radius: 12px;
  font-size: 0.83rem;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}
.is-dark .chat-input {
  background: rgba(23,29,40,0.8);
  border: 1px solid rgba(37,46,62,0.8);
  color: #f3f4f6;
}
.is-dark .chat-input::placeholder { color: #6b7280; }
.is-dark .chat-input:focus { border-color: rgba(16,185,129,0.6); }
.is-light .chat-input {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #111827;
}
.is-light .chat-input::placeholder { color: #9ca3af; }
.is-light .chat-input:focus { border-color: rgba(16,185,129,0.5); }
.chat-input:disabled { opacity: 0.6; }

.send-btn {
  width: 36px; height: 36px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}
.send-btn:hover:not(:disabled) { transform: scale(1.08); background: linear-gradient(135deg, #34d399, #10b981); }
.send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* Transitions */
.chat-window-enter-active { animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.chat-window-leave-active { animation: slideDown 0.25s ease-in forwards; }
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes slideDown {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(20px) scale(0.95); }
}
.icon-swap-enter-active, .icon-swap-leave-active { transition: all 0.2s ease; }
.icon-swap-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.icon-swap-leave-to { opacity: 0; transform: rotate(90deg) scale(0.5); }

@media (max-width: 400px) {
  .chatbot-container { right: 1rem; bottom: 1rem; }
  .chat-window { width: calc(100vw - 2rem); }
}
</style>
