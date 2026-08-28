<template>
  <!-- Outer ring -->
  <div
    ref="ringEl"
    class="cursor-ring"
    :class="{ 'cursor-ring--hover': isHovering, 'cursor-ring--click': isClicking }"
    :style="{ transform: `translate(${ringPos.x}px, ${ringPos.y}px)` }"
  />
  <!-- Dot -->
  <div
    ref="dotEl"
    class="cursor-dot"
    :style="{ transform: `translate(${dotPos.x}px, ${dotPos.y}px)` }"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const ringEl = ref<HTMLElement>()
const dotEl  = ref<HTMLElement>()

const dotPos  = reactive({ x: -100, y: -100 })
const ringPos = reactive({ x: -100, y: -100 })

const isHovering = ref(false)
const isClicking = ref(false)

let animId = 0
let rawX = -100, rawY = -100
let ringX = -100, ringY = -100

// Lerp for smooth trailing
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function tick() {
  // Dot follows instantly
  dotPos.x  = rawX - 4
  dotPos.y  = rawY - 4
  // Ring lags behind (lerp)
  ringX = lerp(ringX, rawX - 20, 0.12)
  ringY = lerp(ringY, rawY - 20, 0.12)
  ringPos.x = ringX
  ringPos.y = ringY
  animId = requestAnimationFrame(tick)
}

function onMove(e: MouseEvent) {
  rawX = e.clientX
  rawY = e.clientY
}

function onOver(e: MouseEvent) {
  const target = e.target as HTMLElement
  isHovering.value = !!(
    target.closest('a, button, [data-cursor-hover], input, textarea, select, label')
  )
}

function onDown() { isClicking.value = true }
function onUp()   { isClicking.value = false }

onMounted(() => {
  window.addEventListener('mousemove', onMove,  { passive: true })
  window.addEventListener('mouseover', onOver,  { passive: true })
  window.addEventListener('mousedown', onDown,  { passive: true })
  window.addEventListener('mouseup',   onUp,    { passive: true })
  animId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
  window.removeEventListener('mousedown', onDown)
  window.removeEventListener('mouseup',   onUp)
  cancelAnimationFrame(animId)
})
</script>

<style scoped>
.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  border-radius: 9999px;
  will-change: transform;
}

/* Small inner dot */
.cursor-dot {
  width: 8px;
  height: 8px;
  background: #f59e0b;
  box-shadow: 0 0 10px #f59e0b, 0 0 20px rgba(245, 158, 11, 0.4);
  transition: width 0.2s, height 0.2s, background 0.2s;
}

/* Trailing ring */
.cursor-ring {
  width: 40px;
  height: 40px;
  border: 1.5px solid rgba(245, 158, 11, 0.5);
  background: transparent;
  transition: width 0.25s cubic-bezier(.25,.46,.45,.94),
              height 0.25s cubic-bezier(.25,.46,.45,.94),
              border-color 0.25s,
              background 0.25s;
}

/* On hover: ring expands, fills slightly */
.cursor-ring--hover {
  width: 56px;
  height: 56px;
  border-color: rgba(251, 191, 36, 0.7);
  background: rgba(251, 191, 36, 0.06);
}

/* On click: ring shrinks */
.cursor-ring--click {
  width: 28px;
  height: 28px;
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.9);
}
</style>
