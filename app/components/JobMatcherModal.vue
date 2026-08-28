<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isJobMatcherOpen"
        class="job-matcher-overlay"
        @click.self="closeJobMatcher"
        @keydown.esc="closeJobMatcher"
        tabindex="-1"
      >
        <div
          class="job-matcher-dialog"
          :class="isDark ? 'dialog-dark' : 'dialog-light'"
          role="dialog"
          aria-modal="true"
        >
          <!-- Clean Modal Header -->
          <div class="dialog-header">
            <div>
              <h3 class="dialog-title">{{ $t('jobMatcher.title') }}</h3>
              <p class="dialog-subtitle">{{ $t('jobMatcher.subtitle') }}</p>
            </div>
            <button
              @click="closeJobMatcher"
              class="modal-close-btn"
              aria-label="Close"
            >
              <X :size="18" />
            </button>
          </div>

          <!-- Dialog Body -->
          <div class="dialog-body">
            <!-- 1. INPUT PHASE -->
            <div v-if="!analysisResult && !isAnalyzing" class="input-phase">
              <!-- Quick Preset Roles -->
              <div class="presets-container">
                <span class="presets-label">{{ $t('jobMatcher.presetsLabel') }}</span>
                <div class="presets-chips">
                  <button
                    v-for="(preset, key) in samplePresets"
                    :key="key"
                    @click="applyPreset(preset.text)"
                    type="button"
                    class="preset-chip"
                  >
                    {{ $t(`jobMatcher.${key}`) }}
                  </button>
                </div>
              </div>

              <!-- Input Area -->
              <div class="textarea-wrapper">
                <textarea
                  v-model="jobInputText"
                  rows="6"
                  class="jd-textarea"
                  :class="{ 'textarea-error': isOverLimit }"
                  :placeholder="$t('jobMatcher.placeholder')"
                ></textarea>
                <div class="char-count" :class="{ 'char-count-error': isOverLimit }">
                  {{ wordCount }}/1000 {{ locale === 'ar' ? 'كلمة' : locale === 'tr' ? 'kelime' : 'words' }}
                </div>
              </div>

              <!-- Over-limit Warning in Red -->
              <div v-if="isOverLimit" class="error-banner">
                <span>{{ locale === 'ar' ? 'تم تجاوز الحد المسموح (الحد الأقصى 1000 كلمة). يرجى تقليص النص للمتابعة.' : locale === 'tr' ? 'Kelime sınırı aşıldı (Maksimum 1000 kelime). Lütfen devam etmek için metni kısaltın.' : 'Word limit exceeded (Max 1000 words). Please trim the text to proceed.' }}</span>
              </div>

              <!-- Error Message if AI failed -->
              <div v-else-if="errorMessage" class="error-banner">
                <span>{{ errorMessage }}</span>
              </div>

              <!-- Submit Button -->
              <button
                @click="analyzeJob"
                :disabled="!jobInputText.trim() || isOverLimit || isAnalyzing"
                type="button"
                class="analyze-submit-btn"
              >
                <span>{{ $t('jobMatcher.analyzeBtn') }}</span>
              </button>
            </div>

            <!-- 2. ANALYZING PHASE (Clean & Minimal) -->
            <div v-else-if="isAnalyzing" class="analyzing-phase">
              <div class="simple-spinner"></div>
              <p class="analyzing-step">{{ currentAnalysisStep }}</p>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" :style="{ width: `${analysisProgress}%` }"></div>
              </div>
            </div>

            <!-- 3. RESULTS PHASE (Realistic & Fact-Based) -->
            <div v-else-if="analysisResult" class="results-phase">
              <!-- Header Score Bar -->
              <div class="score-card">
                <div class="score-header-row">
                  <div class="score-pill">
                    <span class="score-value">{{ analysisResult.score }}%</span>
                    <span class="score-label">{{ $t('jobMatcher.matchScore') }}</span>
                  </div>
                  <span class="score-tier-badge">{{ scoreBadgeText }}</span>
                </div>
                <p class="score-summary">{{ analysisResult.pitch }}</p>
              </div>

              <!-- Matched Skills -->
              <div v-if="analysisResult.skills && analysisResult.skills.length" class="result-section">
                <h5 class="section-title">{{ $t('jobMatcher.matchedSkills') }}</h5>
                <div class="skills-grid">
                  <span
                    v-for="skill in analysisResult.skills"
                    :key="skill"
                    class="matched-skill-badge"
                  >
                    <Check :size="12" class="text-emerald-500" />
                    <span>{{ skill }}</span>
                  </span>
                </div>
              </div>

              <!-- Real Evidence & Project References -->
              <div v-if="analysisResult.evidence && analysisResult.evidence.length" class="result-section">
                <h5 class="section-title">{{ $t('jobMatcher.evidenceTitle') }}</h5>
                <div class="evidence-list">
                  <div
                    v-for="(item, idx) in analysisResult.evidence"
                    :key="idx"
                    class="evidence-card"
                  >
                    <div class="evidence-content">
                      <span class="evidence-project">{{ item.title }} — </span>
                      <span class="evidence-desc">{{ item.desc }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action CTAs -->
              <div class="results-actions">
                <button
                  type="button"
                  @click="openEmailDirectly"
                  class="action-btn primary-action-btn"
                >
                  <Mail :size="15" />
                  <span>{{ $t('jobMatcher.inviteEmail') }}</span>
                </button>
                <a
                  :href="whatsappUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="action-btn secondary-action-btn"
                >
                  <MessageCircle :size="15" />
                  <span>{{ $t('jobMatcher.chatWhatsApp') }}</span>
                </a>
                <button
                  @click="resetMatcher"
                  type="button"
                  class="action-btn reset-action-btn"
                >
                  <RotateCcw :size="14" />
                  <span>{{ $t('jobMatcher.tryAnother') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  X,
  Check,
  Mail,
  MessageCircle,
  RotateCcw,
} from 'lucide-vue-next'
import { useJobMatcher } from '~/composables/useJobMatcher'

const { isJobMatcherOpen, initialJobPreset, closeJobMatcher } = useJobMatcher()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const { locale } = useI18n()
const { t } = useI18n()

const jobInputText = ref('')
const isAnalyzing = ref(false)
const analysisProgress = ref(0)
const currentAnalysisStep = ref('')
const errorMessage = ref('')

const wordCount = computed(() => {
  const trimmed = jobInputText.value.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).filter(Boolean).length
})

const isOverLimit = computed(() => wordCount.value > 1000)

interface MatchResult {
  score: number
  headline: string
  pitch: string
  skills: string[]
  evidence: Array<{ title: string; desc: string }>
}

const analysisResult = ref<MatchResult | null>(null)

const samplePresets = {
  preset1: {
    text: 'Flutter Mobile Developer with 2+ years of production experience in building cross-platform apps, clean architecture (BLoC/Cubit), offline-first storage, hardware integration (BLE/Sensors), and App Store & Google Play publishing.',
  },
  preset2: {
    text: 'Python Backend Developer with FastAPI experience. Required to optimize database query performance, implement Redis caching, design RESTful APIs, and handle asynchronous scalable backend services.',
  },
  preset3: {
    text: '.NET Backend Developer with C# and Web API experience to design robust, multi-tier enterprise backend systems and relational database architectures.',
  },
}

watch(isJobMatcherOpen, (open) => {
  if (open) {
    if (initialJobPreset.value) {
      jobInputText.value = initialJobPreset.value
      analyzeJob()
    }
  } else {
    resetMatcher()
  }
})

function applyPreset(text: string) {
  jobInputText.value = text
  analyzeJob()
}

function resetMatcher() {
  analysisResult.value = null
  isAnalyzing.value = false
  analysisProgress.value = 0
  jobInputText.value = ''
  errorMessage.value = ''
}

const scoreBadgeText = computed(() => {
  if (!analysisResult.value) return ''
  const s = analysisResult.value.score
  if (s >= 88) return t('jobMatcher.exceptional')
  if (s >= 75) return t('jobMatcher.strong')
  return t('jobMatcher.moderate')
})

function openEmailDirectly() {
  const subject = encodeURIComponent('Interview Invitation: Software Engineer Role - Anas Eskander')
  const body = encodeURIComponent(
    `Hi Anas,\n\nI reviewed your portfolio for our software engineering role and would like to schedule an introductory conversation to discuss the position.\n\nBest regards,`
  )
  
  const mailtoUrl = `mailto:anass12976@gmail.com?subject=${subject}&body=${body}`
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=anass12976@gmail.com&su=${subject}&body=${body}`
  
  // Try opening Gmail web directly in a new tab, and trigger mailto for desktop apps
  window.open(gmailUrl, '_blank')
}

const whatsappUrl = computed(() => {
  const text = encodeURIComponent(
    `Hi Anas! I reviewed your profile on your portfolio and would like to connect regarding an engineering opportunity.`
  )
  return `https://wa.me/905397924923?text=${text}`
})

async function analyzeJob() {
  const text = jobInputText.value.trim()
  if (!text) return

  errorMessage.value = ''
  isAnalyzing.value = true
  analysisProgress.value = 20
  currentAnalysisStep.value = locale.value === 'ar' ? 'فحص المتطلبات والتقنيات...' : locale.value === 'tr' ? 'Gereksinimler taranıyor...' : 'Reviewing requirements...'

  const stepsTimer = setInterval(() => {
    if (analysisProgress.value < 85) {
      analysisProgress.value += 15
      if (analysisProgress.value === 35) {
        currentAnalysisStep.value = locale.value === 'ar' ? 'مطابقة المتطلبات مع خبرات أنس الفعلية...' : locale.value === 'tr' ? 'Anas\'ın deneyimleriyle karşılaştırılıyor...' : 'Evaluating against Anas\'s production track record...'
      } else if (analysisProgress.value === 65) {
        currentAnalysisStep.value = locale.value === 'ar' ? 'صياغة التقييم الفني الموضوعي...' : locale.value === 'tr' ? 'Teknik değerlendirme hazırlanıyor...' : 'Formulating objective engineering assessment...'
      }
    }
  }, 400)

  try {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbynKNKN38wzNpZ9TBtL5A-pPpuJtIwNUfx6ovLvVyUnY22l3WfCuhc1vXW4W1zZeQPIIA/exec'
    const promptForGemini = `EVALUATE_JOB_MATCH_STRICT:
You are an expert Technical Recruiter & Engineering Evaluator.
Evaluate this Job Description objectively and rigorously against Anas Eskander (Software Engineer).

=== ANAS ESKANDER FACT SHEET ===
- Core Stack: Mobile (Flutter, Dart, BLoC, Clean Architecture, Offline-first, BLE, App Store/Play Store), Backend (Python, FastAPI, .NET, C#, RESTful APIs, Redis, PostgreSQL, MySQL, Database Indexing/Locking), Applied AI (PyTorch to TFLite, Computer Vision, Real-time WebSockets IoT).
- Proven Track Record: Slashed FastAPI latency from 5s to <1s at Visight Technology; Delivered TurVia live on App Store & Play Store; Built P2P E2EE BLE mesh and IoT data streaming at TÜBİTAK 1001; M.Sc. in Software Engineering (GPA 3.95/4.00).

=== JOB DESCRIPTION TO EVALUATE ===
${text}

=== EVALUATION & SCORING RULES ===
1. SCORE CALIBRATION (Be realistic, honest, and credible):
   - Core Match (85-94%): Roles strongly centered on Flutter, Python/FastAPI, .NET/C# backend, or Applied Edge AI.
   - Adjacent / Foundational Match (60-78%): Roles where Anas has the core programming/system skills (e.g., C#, MySQL, Sockets, multi-threading, databases) but the role requires niche industrial/hardware tools (e.g., LabVIEW, CAN bus, PLC, industrial DAQ cards).
   - Low Match (40-59%): Unrelated stacks.
2. SKILLS: Extract ONLY technologies and engineering skills found in BOTH Anas's background and this JD.
3. SUMMARY (pitch): Write 2 crisp, executive sentences in ${locale.value === 'ar' ? 'professional Arabic' : locale.value === 'tr' ? 'corporate Turkish' : 'clear professional English'} stating the exact technical overlap honestly.
4. EVIDENCE: Provide 2 concrete proofs from Anas's track record that directly support this evaluation.

Respond strictly in valid JSON format only (no markdown backticks, no extra text):
{
  "score": <number>,
  "skills": ["<matching_skill_1>", "<matching_skill_2>"],
  "pitch": "<2_sentences_assessment>",
  "evidence": [
    {"title": "<specific_domain>", "desc": "<factual_proof_description>"},
    {"title": "<specific_domain>", "desc": "<factual_proof_description>"}
  ]
}`

    let parsedResult: MatchResult | null = null

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ question: promptForGemini, lang: locale.value }),
      })
      const data = await response.json()
      if (data && data.reply) {
        let raw = String(data.reply).trim()
        raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
        const firstOpen = raw.indexOf('{')
        const lastClose = raw.lastIndexOf('}')
        
        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
          const jsonStr = raw.substring(firstOpen, lastClose + 1)
          try {
            const obj = JSON.parse(jsonStr)
            if (obj && (typeof obj.score === 'number' || typeof obj.score === 'string') && obj.pitch) {
              const numScore = parseInt(String(obj.score), 10) || 85
              parsedResult = {
                score: Math.min(Math.max(numScore, 30), 98),
                headline: locale.value === 'ar' ? `توافق بنسبة ${numScore}% مع المتطلبات` : locale.value === 'tr' ? `Gereksinimlerle %${numScore} uyum` : `${numScore}% Match with Requirements`,
                pitch: obj.pitch,
                skills: Array.isArray(obj.skills) ? obj.skills : [],
                evidence: Array.isArray(obj.evidence) ? obj.evidence : [],
              }
            }
          } catch (eJson) {
            // Regex Fallback in case Gemini put unescaped inner quotes inside strings
            const scoreMatch = jsonStr.match(/"score"\s*:\s*(\d+)/i)
            const pitchMatch = jsonStr.match(/"pitch"\s*:\s*"([\s\S]*?)"\s*,\s*"evidence"/i) || jsonStr.match(/"pitch"\s*:\s*"([\s\S]*?)"\s*\}/i)
            const skillsMatch = jsonStr.match(/"skills"\s*:\s*\[([\s\S]*?)\]/i)
            
            if (scoreMatch && (pitchMatch || scoreMatch[1])) {
              const numScore = parseInt(scoreMatch[1], 10) || 85
              const skills = skillsMatch
                ? skillsMatch[1].split(',').map(s => s.replace(/["'\r\n]/g, '').trim()).filter(Boolean)
                : []
              parsedResult = {
                score: Math.min(Math.max(numScore, 30), 98),
                headline: locale.value === 'ar' ? `توافق بنسبة ${numScore}% مع المتطلبات` : `${numScore}% Match with Requirements`,
                pitch: pitchMatch ? pitchMatch[1].replace(/\\"/g, '"') : (locale.value === 'ar' ? 'تتوافق متطلبات هذه الوظيفة مع خبرات أنس الهندسية والإنتاجية.' : 'This role aligns with Anas\'s production engineering track record.'),
                skills,
                evidence: [
                  {
                    title: 'Production Engineering Delivery',
                    desc: locale.value === 'ar'
                      ? 'خبرة مثبتة في تسليم تطبيقات الموبايل (TurVia / KURTAR) والأنظمة الخلفية عالية الأداء.'
                      : 'Proven track record delivering scalable mobile apps and high-performance backend systems.'
                  }
                ],
              }
            }
          }
        }
      }
    } catch (errAi) {
      console.warn('AI matching fetch error:', errAi)
    }

    clearInterval(stepsTimer)
    analysisProgress.value = 100

    if (parsedResult) {
      analysisResult.value = parsedResult
    } else {
      errorMessage.value = locale.value === 'ar'
        ? 'تعذر على الذكاء الاصطناعي معالجة هذا الوصف حالياً. يرجى المحاولة مجدداً.'
        : locale.value === 'tr'
          ? 'Yapay zeka şu anda bu iş tanımını işleyemedi. Lütfen tekrar deneyin.'
          : 'The AI could not process this job description at the moment. Please try again.'
    }
  } catch (err) {
    clearInterval(stepsTimer)
    errorMessage.value = locale.value === 'ar'
      ? 'حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. يرجى المحاولة مجدداً.'
      : 'An error occurred while communicating with the AI. Please try again.'
  } finally {
    isAnalyzing.value = false
  }
}
</script>

<style scoped>
.job-matcher-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(10, 15, 26, 0.7);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.job-matcher-dialog {
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: 88vh;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 163, 184, 0.15);
  animation: dialog-appear 0.25s ease-out;
}

@keyframes dialog-appear {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

.dialog-dark {
  background: #111622;
  color: #f1f5f9;
  border: 1px solid rgba(51, 65, 85, 0.6);
}
.dialog-light {
  background: #ffffff;
  color: #0f172a;
  border: 1px solid rgba(226, 232, 240, 0.9);
}

/* Header */
.dialog-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.25rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}
.dialog-title {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.dialog-subtitle {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.2rem;
  line-height: 1.4;
}
.modal-close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 0.25rem;
  color: inherit;
}
.modal-close-btn:hover {
  opacity: 1;
}

/* Body */
.dialog-body {
  padding: 1.25rem 1.5rem 1.5rem;
  overflow-y: auto;
  flex: 1;
}

/* Presets */
.presets-container {
  margin-bottom: 0.75rem;
}
.presets-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
  margin-bottom: 0.4rem;
}
.presets-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.preset-chip {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: inherit;
  cursor: pointer;
  transition: all 0.2s;
}
.preset-chip:hover {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.4);
  color: #10b981;
}

/* Textarea */
.textarea-wrapper {
  position: relative;
  margin-bottom: 1rem;
}
.jd-textarea {
  width: 100%;
  padding: 0.75rem 0.9rem 1.5rem;
  border-radius: 12px;
  font-size: 0.84rem;
  line-height: 1.5;
  background: rgba(148, 163, 184, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: inherit;
  resize: vertical;
  min-height: 120px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.jd-textarea:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.12);
}
.textarea-error {
  border-color: #ef4444 !important;
}
.textarea-error:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
}
.char-count {
  position: absolute;
  bottom: 0.45rem;
  right: 0.75rem;
  font-size: 0.68rem;
  opacity: 0.55;
  transition: color 0.2s;
}
.char-count-error {
  color: #ef4444 !important;
  font-weight: 700;
  opacity: 1 !important;
}

/* Submit Button */
.analyze-submit-btn {
  width: 100%;
  padding: 0.75rem;
  border-radius: 10px;
  background: #10b981;
  color: white;
  font-size: 0.88rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.15s;
}
.analyze-submit-btn:hover:not(:disabled) {
  background: #059669;
}
.analyze-submit-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* Analyzing Phase */
.analyzing-phase {
  text-align: center;
  padding: 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.simple-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(16, 185, 129, 0.2);
  border-top-color: #10b981;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.analyzing-step {
  font-size: 0.82rem;
  opacity: 0.75;
}
.progress-bar-bg {
  width: 100%;
  max-width: 220px;
  height: 4px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.15);
  margin-top: 1rem;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: #10b981;
  transition: width 0.3s ease-out;
}

/* Results Phase */
.score-card {
  padding: 1rem 1.15rem;
  border-radius: 12px;
  margin-bottom: 1.15rem;
  background: rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.2);
}
.score-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.45rem;
}
.score-pill {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}
.score-value {
  font-size: 1.35rem;
  font-weight: 800;
  color: #10b981;
}
.score-label {
  font-size: 0.75rem;
  opacity: 0.7;
}
.score-tier-badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}
.score-summary {
  font-size: 0.82rem;
  opacity: 0.85;
  line-height: 1.45;
}

/* Sections */
.result-section {
  margin-bottom: 1rem;
}
.section-title {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.65;
  margin-bottom: 0.45rem;
}
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.matched-skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.74rem;
  font-weight: 500;
  padding: 0.3rem 0.55rem;
  border-radius: 6px;
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.15);
}

/* Evidence Cards */
.evidence-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.evidence-card {
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  background: rgba(148, 163, 184, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.1);
  font-size: 0.78rem;
  line-height: 1.4;
}
.evidence-project {
  color: #10b981;
  font-weight: 600;
}

/* Actions */
.results-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 1.15rem;
}
.action-btn {
  padding: 0.65rem 0.8rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
}
.primary-action-btn {
  background: #10b981;
  color: white;
}
.primary-action-btn:hover {
  background: #059669;
}
.secondary-action-btn {
  background: #25D366;
  color: white;
}
.secondary-action-btn:hover {
  background: #1eb956;
}
.reset-action-btn {
  grid-column: 1 / -1;
  background: rgba(148, 163, 184, 0.08);
  color: inherit;
  border: 1px solid rgba(148, 163, 184, 0.15);
}
.reset-action-btn:hover {
  background: rgba(148, 163, 184, 0.15);
}

.error-banner {
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  font-size: 0.78rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

/* Modal Fade Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
