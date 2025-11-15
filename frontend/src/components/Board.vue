<template>
  <div class="board-wrap perspective-1000" style="perspective: 1200px">
    <div class="board-viewport relative" :style="boardTransform">
      <div
        class="board grid grid-cols-8 grid-rows-8 w-[640px] h-[640px] rounded-xl shadow-lg overflow-hidden"
        ref="boardEl"
      >
        <div
          v-for="index in 64"
          :key="index"
          class="tile relative"
          :class="tileClass(col(index), row(index))"
          :style="tileStyle(col(index), row(index))"
        >
          <!-- piece slot -->
        </div>
        <div
          v-for="p in pieces"
          :key="p.id"
          class="piece absolute transition-transform duration-200"
          :style="pieceStyle(p)"
        >
          <Piece :type="p.type" :owner="p.owner" :amplitude="p.amplitude" />
        </div>
      </div>
      <!-- subtle board rim highlight -->
      <div class="absolute inset-0 pointer-events-none rounded-xl border border-white/5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import Piece from '@/components/Piece.vue'

const store = useGameStore()
onMounted(() => store.initBoard())

const pieces = computed(() => store.pieces)
const col = (i: number): number => (i - 1) % 8
const row = (i: number): number => 7 - Math.floor((i - 1) / 8)
// make the board seem 3D
const boardTransform = computed(() => ({
  transform: 'rotateX(12deg) rotateZ(-10deg) translateZ(0px)',
}))

function tileClass(x: number, y: number) {
  return (x + y) % 2 === 0 ? 'bg-sea tile-light' : 'bg-[rgba(255,255,255,0.1)]'
}
function tileStyle(x: number, y: number) {
  const offset = (x + y) % 2 === 0 ? 'box-shadow: 0 10px 20px rgba(0,0,0,0.5);' : ''
  return {
    background:
      (x + y) % 2 === 0
        ? 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06))'
        : 'transparent',
    boxShadow: (x + y) % 2 === 0 ? '0 12px 26px rgba(2,6,23,0.6)' : '',
  }
}

function boardToPx([x, y]: [number, number]) {
  const size = 640 / 8
  return {
    left: `${x * size}px`,
    top: `${y * size}px`,
    width: `${size}px`,
    height: `${size}px`,
  }
}
function pieceStyle(p: any) {
  const pos = boardToPx(p.pos)
  // lift piece by amplitude
  const z = Math.max(0, p.amplitude) * 1
  return Object.assign({}, pos, { transform: `translateZ(${z}px)` })
}
</script>

<style scoped>
.board-viewport {
  transform-style: preserve-3d;
}
.board {
  transform-style: preserve-3d;
}
.tile {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.piece {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
