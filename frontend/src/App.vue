<template>
  <div class="min-h-screen flex items-center justify-center p-6 w-full">
    <div class="w-full max-w-5xl grid md:grid-cols-2 gap-6">
      <aside class="flex flex-col gap-4">
        <section class="bg-[rgba(255,255,255,0.03)] rounded-2xl p-4 text-white/90">
          <h2 class="text-lg font-semibold">ChessEnergy</h2>
          <p class="text-sm text-white/60 mt-2">
            Wave-infused chess variant prototype. 3D board mockup.
          </p>
        </section>

        <section class="bg-[rgba(255,255,255,0.03)] rounded-2xl p-4 text-white/90">
          <h3 class="text-sm font-medium">Tide</h3>
          <div class="mt-4 h-4 rounded-full bg-gray-800 overflow-hidden">
            <div
              class="h-full bg-wave transition-all duration-300"
              :style="{ width: tidePercent + '%' }"
            ></div>
          </div>
          <p class="text-xs text-white/60 mt-2">Turn: {{ turn }}</p>
        </section>
      </aside>
      <!-- Board takes natural size -->
      <div class="md:col-span-2 flex items-center justify-center">
        <Board />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import Board from '@/components/Board.vue'

const game = useGameStore()
const tidePercent = computed(() => Math.round(((game.tide + 1) / 2) * 100))
const turn = computed(() => game.turn)
</script>

<style scoped>
.bg-wave {
  background: linear-gradient(90deg, #00e6ff, #00b3cc);
}
</style>
