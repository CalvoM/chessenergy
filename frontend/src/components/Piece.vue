<template>
  <div
    class="w-14 h-14 flex items-center justify-center rounded-lg transition-shadow duration-200"
    :class="bgClass"
    :style="styleObj"
  >
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" :fill="color" />
      <text x="12" y="16" font-size="10" text-anchor="middle" fill="#021" font-weight="700">
        {{ glyph }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  type: { type: String, required: true },
  owner: { type: Number, required: true },
  amplitude: { type: Number, required: true },
})
const color = computed(() => (props.owner === 0 ? '#00e6ff' : '#ff7a66'))
const glyph = computed(() => {
  switch (props.type) {
    case 'king':
      return 'K'
    case 'queen':
      return 'Q'
    case 'rook':
      return 'R'
    case 'bishop':
      return 'B'
    case 'knight':
      return 'N'
    default:
      return 'P'
  }
})
const glow = computed(() => Math.max(0, Math.abs(props.amplitude)))
const styleObj = computed(() => ({
  boxShadow: `0 8px ${8 + glow.value * 12}px rgba(0,0,0,0.6), 0 0 ${6 + glow.value * 18}px ${props.owner === 0 ? 'rgba(0,230,255,0.12)' : 'rgba(255,122,102,0.12)'}`,
}))
const bgClass = computed(() =>
  props.owner === 0 ? 'bg-[rgba(0,230,255,0.06)]' : 'bg-[rgba(255,122,102,0.06)]',
)
</script>

<style scoped>
svg {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
}
</style>
