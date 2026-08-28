<template>
  <div
    ref="cardEl"
    class="spotlight-card"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    :style="cardStyle"
  >
    <!-- Spotlight gradient -->
    <div class="spotlight-glow" :style="glowStyle" />
    <!-- Border shimmer -->
    <div class="spotlight-border" :style="borderStyle" />
    <!-- Actual content slot -->
    <div class="relative z-10 h-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const cardEl = ref<HTMLElement>()

const mouse = reactive({ x: 0, y: 0, inside: false })
// 3D tilt
const tilt  = reactive({ x: 0, y: 0 })

function onMouseMove(e: MouseEvent) {
  const el = cardEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  mouse.x = x
  mouse.y = y
  mouse.inside = true

  // Tilt: -8 to 8 degrees
  const cx = rect.width / 2
  const cy = rect.height / 2
  tilt.x = ((y - cy) / cy) * -6   // rotateX
  tilt.y = ((x - cx) / cx) *  6   // rotateY
}

function onMouseLeave() {
  mouse.inside = false
  // Spring back
  tilt.x = 0
  tilt.y = 0
}

// Spotlight gradient follows cursor
const glowStyle = computed(() => {
  if (!mouse.inside) return { opacity: '0' }
  return {
    opacity: '1',
    background: `radial-gradient(350px circle at ${mouse.x}px ${mouse.y}px,
      rgba(245,158,11,0.09) 0%,
      rgba(251,191,36,0.03) 40%,
      transparent 70%)`,
  }
})

// Border highlight
const borderStyle = computed(() => {
  if (!mouse.inside) return { opacity: '0' }
  return {
    opacity: '1',
    background: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px,
      rgba(245,158,11,0.35),
      transparent 60%)`,
  }
})

// 3D transform on card
const cardStyle = computed(() => ({
  transform: mouse.inside
    ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01,1.01,1.01)`
    : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
  transition: mouse.inside
    ? 'transform 0.1s ease'
    : 'transform 0.5s cubic-bezier(.25,.46,.45,.94)',
}))
</script>

<style scoped>
.spotlight-card {
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
}

.spotlight-glow,
.spotlight-border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.spotlight-border {
  inset: -1px;
  padding: 1px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
</style>
