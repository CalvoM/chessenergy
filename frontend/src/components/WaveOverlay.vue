<template>
  <canvas ref="c" class="absolute inset-0 w-full h-full pointer-events-none" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGameStore } from '@/stores/game'
const canvas = ref<HTMLCanvasElement | null>(null)
const game = useGameStore()
onMounted(() => {
  const c = canvas.value!
  const ctx = c.getContext('2d')!
  function resize() {
    c.width = c.clientWidth
    c.height = c.clientHeight
  }
  resize()
  requestAnimationFrame(function loop() {
    ctx.clearRect(0, 0, c.width, c.height)
    // placeholder: draw simple radial pulses per piece
    game.pieces.forEach((p) => {
      const size = 40 + Math.abs(p.amplitude) * 60
      ctx.beginPath()
      const x = (p.pos[0] + 0.5) * (c.width / 8)
      const y = (7 - p.pos[1] + 0.5) * (c.height / 8)
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size)
      const col = p.owner === 0 ? 'rgba(0,230,255,0.12)' : 'rgba(255,122,102,0.12)'
      grad.addColorStop(0, col)
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(x - size, y - size, size * 2, size * 2)
    })
    requestAnimationFrame(loop)
  })
})
</script>
