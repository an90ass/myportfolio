<template>
  <div class="links-page" :dir="t.dir">
    <!-- Background stars -->
    <div class="stars-layer" ref="starsRef"></div>

    <!-- Ambient orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <main class="page" role="main">

      <!-- Language Switcher Bar -->
      <div class="lang-switcher" role="navigation" aria-label="Language Selection">
        <button
          class="lang-btn"
          :class="{ active: currentLang === 'ar' }"
          @click="setLang('ar')"
        >
          🇸🇦 العربية
        </button>
        <button
          class="lang-btn"
          :class="{ active: currentLang === 'en' }"
          @click="setLang('en')"
        >
          🇬🇧 English
        </button>
        <button
          class="lang-btn"
          :class="{ active: currentLang === 'tr' }"
          @click="setLang('tr')"
        >
          🇹🇷 Türkçe
        </button>
      </div>

      <div class="profile-col">
        <!-- Avatar -->
        <div class="avatar-wrap">
          <div class="avatar-ring"></div>
          <img
            class="avatar-photo"
            :src="avatarSrc"
            alt="أنس اسكندر"
            @error="onAvatarError"
          />
          <div class="avatar-fallback" ref="fallbackRef">A</div>
        </div>

        <!-- Name & tagline -->
        <h1 class="name" v-html="t.name"></h1>
        <p class="tagline" v-html="t.tagline"></p>

        <!-- Badge -->
        <div class="badge">
          <span class="heart">🤍</span>
          <span>{{ t.badge }}</span>
        </div>
      </div>

      <!-- 2×3 Links Grid -->
      <nav class="links-grid" aria-label="روابط التواصل الاجتماعي">

        <!-- GitHub -->
        <a id="btn-github" class="link-btn btn-github"
           href="https://github.com/an90ass" target="_blank" rel="noopener noreferrer">
          <span class="btn-icon-wrap">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.58 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.623-5.48 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.699.825.58C20.565 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </span>
          </span>
          <span class="btn-label">
            <span class="btn-title">GitHub</span>
            <span class="btn-subtitle">{{ t.githubSub }}</span>
          </span>
        </a>

        <!-- LinkedIn -->
        <a id="btn-linkedin" class="link-btn btn-linkedin"
           href="https://www.linkedin.com/in/anas-al-maqtari-12815124b/?locale=en" target="_blank" rel="noopener noreferrer">
          <span class="btn-icon-wrap">
            <span class="btn-icon linkedin-icon">
              <svg viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </span>
          </span>
          <span class="btn-label">
            <span class="btn-title">LinkedIn</span>
            <span class="btn-subtitle">{{ t.linkedinSub }}</span>
          </span>
        </a>

        <!-- Dual Phone (KSA & TR) -->
        <div id="btn-phone" class="link-btn btn-phone btn-dual-phone">
          <span class="btn-icon-wrap">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/>
              </svg>
            </span>
          </span>
          <span class="btn-label">
            <span class="btn-title">{{ t.phoneTitle }}</span>
            <div class="phone-chips">
              <a href="tel:+966592682004" class="phone-chip" title="Saudi Arabia">
                <span>🇸🇦</span> <span>+966 592 682 004</span>
              </a>
              <a href="tel:+905397924923" class="phone-chip" title="Turkey">
                <span>🇹🇷</span> <span>+90 539 792 4923</span>
              </a>
            </div>
          </span>
        </div>

        <!-- WhatsApp -->
        <a id="btn-whatsapp" class="link-btn btn-whatsapp"
           href="https://wa.me/905397924923" target="_blank" rel="noopener noreferrer">
          <span class="btn-icon-wrap">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </span>
          </span>
          <span class="btn-label">
            <span class="btn-title">WhatsApp</span>
            <span class="btn-subtitle">+90 539 792 4923</span>
          </span>
        </a>

        <!-- Portfolio -->
        <a id="btn-portfolio" class="link-btn btn-portfolio"
           href="https://an90ass.github.io/myportfolio/" target="_blank" rel="noopener noreferrer">
          <span class="btn-icon-wrap">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </span>
          </span>
          <span class="btn-label">
            <span class="btn-title">{{ t.portfolioTitle }}</span>
            <span class="btn-subtitle">{{ t.portfolioSub }}</span>
          </span>
        </a>

        <!-- Email -->
        <a id="btn-email" class="link-btn btn-email" href="mailto:anass12976@gmail.com">
          <span class="btn-icon-wrap">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
          </span>
          <span class="btn-label">
            <span class="btn-title">{{ t.emailTitle }}</span>
            <span class="btn-subtitle">anass12976@gmail.com</span>
          </span>
        </a>

      </nav>

      <!-- Footer -->
      <p class="footer-line" v-html="t.footer"></p>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// ── SEO / head ──
useHead({
  title: 'أنس اسكندر | Software Engineer | Mobile, Backend & AI Development',
  meta: [
    { name: 'description', content: 'Software Engineer | Mobile, Backend & AI Development — تواصل مع أنس اسكندر' },
    { name: 'theme-color', content: '#0a0f1a' },
  ],
  htmlAttrs: { lang: 'ar', dir: 'rtl' },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/myportfolio/favicon.ico' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/myportfolio/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Cairo:wght@400;600;700;900&family=Inter:wght@400;500;600;700&display=swap' },
  ],
})

type Lang = 'ar' | 'en' | 'tr'
const currentLang = ref<Lang>('ar')

const dict = {
  ar: {
    dir: 'rtl',
    name: 'أنس اسكندر',
    tagline: 'Software Engineer &nbsp;·&nbsp; Mobile, Backend &amp; AI Development',
    badge: 'حيّاك الله وبيّاك، شرّفتني بزيارتك',
    githubSub: 'مشاريعي المفتوحة',
    linkedinSub: 'مسيرتي المهنية',
    phoneTitle: 'اتصل بي',
    portfolioTitle: 'Portfolio',
    portfolioSub: 'أعمالي وإنجازاتي',
    emailTitle: 'راسلني',
    footer: 'أنس اسكندر &nbsp;·&nbsp; Software Engineer &nbsp;·&nbsp; ٢٠٢٦'
  },
  en: {
    dir: 'ltr',
    name: 'Anas Iskandar',
    tagline: 'Software Engineer &nbsp;·&nbsp; Mobile, Backend &amp; AI Development',
    badge: 'Welcome! Glad to have you here',
    githubSub: 'Open Source Projects',
    linkedinSub: 'Professional Profile',
    phoneTitle: 'Call Me',
    portfolioTitle: 'Portfolio',
    portfolioSub: 'Works & Achievements',
    emailTitle: 'Email Me',
    footer: 'Anas Iskandar &nbsp;·&nbsp; Software Engineer &nbsp;·&nbsp; 2026'
  },
  tr: {
    dir: 'ltr',
    name: 'Anas Iskandar',
    tagline: 'Software Engineer &nbsp;·&nbsp; Mobile, Backend &amp; AI Development',
    badge: 'Hoş geldiniz! Ziyaretiniz için teşekkürler',
    githubSub: 'Açık Kaynak Projeler',
    linkedinSub: 'Profesyonel Profil',
    phoneTitle: 'Beni Arayın',
    portfolioTitle: 'Portfolyo',
    portfolioSub: 'Çalışmalarım ve Projelerim',
    emailTitle: 'E-posta Gönder',
    footer: 'Anas Iskandar &nbsp;·&nbsp; Software Engineer &nbsp;·&nbsp; 2026'
  }
}

const t = computed(() => dict[currentLang.value])

function setLang(lang: Lang) {
  currentLang.value = lang
  try {
    localStorage.setItem('pref_lang', lang)
  } catch (e) {}
}

const runtimeConfig = useRuntimeConfig()
const starsRef = ref<HTMLElement | null>(null)
const fallbackRef = ref<HTMLElement | null>(null)

// Build avatar URL from base URL
const avatarSrc = computed(() => {
  const base = (runtimeConfig.app.baseURL || '/').replace(/\/$/, '')
  return `${base}/media/avatar.JPG`
})

// Avatar fallback
function onAvatarError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
  if (fallbackRef.value) fallbackRef.value.style.display = 'flex'
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('pref_lang') as Lang
    if (saved && dict[saved]) {
      currentLang.value = saved
    }
  } catch (e) {}

  // Stars
  if (starsRef.value) {
    for (let i = 0; i < 55; i++) {
      const s = document.createElement('div')
      s.className = 'star'
      const sz = Math.random() * 2.2 + 0.5
      s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;--d:${(Math.random() * 3 + 2).toFixed(1)}s;animation-delay:${(Math.random() * 4).toFixed(1)}s;`
      starsRef.value.appendChild(s)
    }
  }

  // Ripple
  document.querySelectorAll<HTMLElement>('.link-btn').forEach(btn => {
    btn.addEventListener('click', (e: MouseEvent) => {
      const r = document.createElement('span')
      const rect = btn.getBoundingClientRect()
      const sz = Math.max(rect.width, rect.height) * 2
      r.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${e.clientX - rect.left - sz / 2}px;top:${e.clientY - rect.top - sz / 2}px;background:rgba(59,130,246,.18);border-radius:50%;transform:scale(0);animation:rippleAnim .55s ease-out forwards;pointer-events:none;z-index:0;`
      btn.appendChild(r)
      r.addEventListener('animationend', () => r.remove())
    })
  })
})
</script>

<style scoped>
.links-page {
  font-family: 'Tajawal', 'Cairo', 'Inter', sans-serif;
  background: radial-gradient(ellipse at 25% 12%, #0d1f4a 0%, #0a0f1a 45%, #040810 100%);
  min-height: 100dvh;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-y: auto;
  padding: env(safe-area-inset-top, 0)
           env(safe-area-inset-right, 0)
           env(safe-area-inset-bottom, 0)
           env(safe-area-inset-left, 0);
}

/* Language switcher */
.lang-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #1e2d45;
  border-radius: 30px;
  padding: 4px 6px;
  margin-bottom: clamp(0.8rem, 2dvh, 1.1rem);
  backdrop-filter: blur(12px);
  z-index: 10;
}
.lang-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}
.lang-btn:hover {
  color: #f1f5f9;
  background: rgba(255, 255, 255, 0.08);
}
.lang-btn.active {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 2px 10px rgba(59, 130, 246, 0.4);
}

/* Stars */
.stars-layer {
  position: fixed; inset: 0;
  pointer-events: none; overflow: hidden; z-index: 0;
}
.star {
  position: absolute; border-radius: 50%;
  background: #3b82f6;
  animation: twinkle var(--d, 3s) ease-in-out infinite alternate;
  opacity: 0;
}
@keyframes twinkle {
  0%   { opacity: 0;   transform: scale(0.8); }
  100% { opacity: 0.5; transform: scale(1.3); }
}

/* Orbs */
.orb {
  position: fixed; border-radius: 50%;
  filter: blur(90px); pointer-events: none; z-index: 0;
}
.orb-1 {
  width: clamp(200px, 55vw, 380px);
  height: clamp(200px, 55vw, 380px);
  background: radial-gradient(circle, rgba(59, 130, 246, 0.14) 0%, transparent 70%);
  top: -100px; left: -100px;
  animation: drift 11s ease-in-out infinite alternate;
}
.orb-2 {
  width: clamp(150px, 38vw, 260px);
  height: clamp(150px, 38vw, 260px);
  background: radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%);
  bottom: -60px; right: -60px;
  animation: drift 15s ease-in-out infinite alternate-reverse;
}
@keyframes drift {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(24px, 24px) scale(1.1); }
}

/* Page wrapper */
.page {
  position: relative; z-index: 1;
  width: min(460px, 96vw);
  padding: clamp(1rem, 3dvh, 2rem) clamp(1rem, 4vw, 1.6rem) clamp(0.8rem, 2dvh, 1.4rem);
  display: flex; flex-direction: column; align-items: center;
}

.profile-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Avatar */
.avatar-wrap {
  position: relative;
  width:  clamp(76px, 20vw, 96px);
  height: clamp(76px, 20vw, 96px);
  margin-bottom: clamp(0.6rem, 2dvh, 1rem);
  flex-shrink: 0;
}
.avatar-ring {
  position: absolute; inset: -5px; border-radius: 50%;
  background: conic-gradient(
    #3b82f6 0deg,
    #06b6d4 90deg,
    #10b981 160deg,
    transparent 200deg,
    transparent 220deg,
    #10b981 260deg,
    #3b82f6 360deg
  );
  animation: spin 7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.avatar-photo {
  position: relative; z-index: 1;
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover; object-position: center top;
  border: 3px solid #0a0f1a;
  display: block;
}
.avatar-fallback {
  display: none;
  position: absolute; inset: 0; z-index: 1;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a7a, #0a0f1a);
  border: 3px solid #0a0f1a;
  align-items: center; justify-content: center;
  font-size: clamp(1.8rem, 6vw, 2.4rem);
  font-weight: 900;
  color: #3b82f6;
  text-shadow: 0 0 20px rgba(59,130,246,0.5);
}

/* Name */
.name {
  font-family: 'Cairo', sans-serif;
  font-size: clamp(1.15rem, 5vw, 1.55rem);
  font-weight: 900; color: #f1f5f9;
  background: linear-gradient(90deg, #3b82f6, #06b6d4, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.2rem; text-align: center;
  filter: drop-shadow(0 0 16px rgba(59,130,246,0.3));
}

/* Tagline */
.tagline {
  font-size: clamp(0.62rem, 2.4vw, 0.76rem);
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.5px;
  margin-bottom: clamp(0.4rem, 1.5dvh, 0.55rem);
  text-align: center; opacity: .9;
  white-space: normal; line-height: 1.4;
  padding: 0 0.5rem;
}

/* Badge */
.badge {
  display: inline-flex; align-items: center; gap: .3rem;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.28);
  border-radius: 9999px;
  padding: clamp(.18rem, .8dvh, .28rem) clamp(.6rem, 3vw, .9rem);
  font-size: clamp(.72rem, 2.8vw, .83rem);
  color: #93c5fd;
  margin-bottom: clamp(0.8rem, 2.5dvh, 1.2rem);
  backdrop-filter: blur(8px);
  animation: pulse 3s ease-in-out infinite;
  text-align: center;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.2); }
  50%       { box-shadow: 0 0 0 5px rgba(59, 130, 246, 0); }
}
.heart { animation: hb 2s ease-in-out infinite; display: inline-block; }
@keyframes hb {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.25); }
}

/* Grid */
.links-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(0.45rem, 1.5vw, 0.65rem);
}

.link-btn {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: clamp(0.3rem, 1dvh, 0.5rem);
  padding: clamp(0.7rem, 2.2dvh, 1rem) clamp(0.4rem, 2vw, 0.7rem);
  border-radius: clamp(12px, 3vw, 20px);
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid #1e2d45;
  backdrop-filter: blur(16px);
  text-decoration: none; color: #f1f5f9;
  transition: all .38s cubic-bezier(.34, 1.56, .64, 1);
  position: relative; overflow: hidden; cursor: pointer;
  text-align: center; min-height: 0;
}
.link-btn::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(59,130,246,.07) 0%, transparent 65%);
  opacity: 0; transition: opacity .3s;
}

@media (hover: hover) {
  .link-btn:hover {
    transform: translateY(-5px) scale(1.04);
    background: rgba(17, 24, 39, 0.95);
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(59, 130, 246, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  .link-btn:hover::before { opacity: 1; }
  .link-btn:hover .btn-icon { transform: scale(1.18) rotate(-6deg); }
}
.link-btn:active {
  transform: scale(0.96);
  border-color: rgba(59, 130, 246, 0.4);
}

.btn-icon-wrap {
  width:  clamp(38px, 10vw, 48px);
  height: clamp(38px, 10vw, 48px);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; position: relative; z-index: 1;
}
.btn-icon {
  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
}
.btn-icon svg {
  width:  clamp(18px, 5vw, 24px);
  height: clamp(18px, 5vw, 24px);
}

.btn-github    .btn-icon-wrap {
  background: rgba(30, 45, 69, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.btn-linkedin  .btn-icon-wrap {
  background: rgba(10, 102, 194, 0.2);
  border: 1px solid rgba(10, 102, 194, 0.45);
}
.btn-phone     .btn-icon-wrap {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.4);
}
.btn-whatsapp  .btn-icon-wrap {
  background: rgba(37, 211, 102, 0.12);
  border: 1px solid rgba(37, 211, 102, 0.4);
}
.btn-portfolio .btn-icon-wrap {
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.4);
}
.btn-email     .btn-icon-wrap {
  background: rgba(6, 182, 212, 0.12);
  border: 1px solid rgba(6, 182, 212, 0.4);
}

.btn-label {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center; gap: .06rem;
  width: 100%;
}
.btn-title {
  font-family: 'Cairo', sans-serif;
  font-size: clamp(0.72rem, 2.8vw, 0.9rem);
  font-weight: 700; color: #f1f5f9;
  white-space: nowrap;
}
.btn-subtitle {
  font-size: clamp(0.56rem, 2vw, 0.67rem);
  font-weight: 400;
  color: #94a3b8;
  white-space: nowrap; line-height: 1.2;
}

/* Dual Phone Chips */
.phone-chips {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 3px;
  width: 100%;
  align-items: center;
}
.phone-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 8px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #f1f5f9;
  font-size: clamp(0.55rem, 2vw, 0.65rem);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;
  direction: ltr;
  width: 100%;
  max-width: 175px;
}
.phone-chip:hover {
  background: rgba(16, 185, 129, 0.3);
  border-color: rgba(16, 185, 129, 0.65);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.footer-line {
  margin-top: clamp(0.6rem, 1.8dvh, 1rem);
  font-size: clamp(0.58rem, 2vw, 0.68rem);
  color: #64748b;
  text-align: center; letter-spacing: .6px;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: no-preference) {
  .lang-switcher{ animation: fadeUp .55s  .02s ease both; }
  .avatar-wrap  { animation: fadeUp .55s  .06s ease both; }
  .name         { animation: fadeUp .55s  .14s ease both; }
  .tagline      { animation: fadeUp .55s  .19s ease both; }
  .badge        { animation: fadeUp .55s  .24s ease both; }
  .link-btn:nth-child(1) { animation: fadeUp .5s .32s ease both; }
  .link-btn:nth-child(2) { animation: fadeUp .5s .38s ease both; }
  .link-btn:nth-child(3) { animation: fadeUp .5s .44s ease both; }
  .link-btn:nth-child(4) { animation: fadeUp .5s .50s ease both; }
  .link-btn:nth-child(5) { animation: fadeUp .5s .56s ease both; }
  .link-btn:nth-child(6) { animation: fadeUp .5s .62s ease both; }
  .footer-line  { animation: fadeUp .5s  .70s ease both; }
}

@keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }

@media (max-width: 359px) {
  .tagline { font-size: 0.6rem; }
  .badge   { font-size: 0.68rem; }
  .btn-subtitle { display: none; }
}

@media (max-height: 620px) and (orientation: landscape) {
  .page {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.7rem 1rem;
  }
  .profile-col {
    display: flex; flex-direction: column;
    align-items: center;
    width: clamp(130px, 28vw, 170px);
    flex-shrink: 0;
  }
  .links-grid {
    flex: 1;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4rem;
    align-self: center;
  }
  .link-btn { padding: 0.55rem 0.3rem; }
  .footer-line { display: none; }
}

@media (min-width: 600px) {
  .page { width: min(500px, 90vw); }
  .links-grid { gap: 0.75rem; }
}
</style>
