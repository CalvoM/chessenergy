import { defineStore } from 'pinia'
import type { WavePiece } from '@/types'

export const useGameStore = defineStore('game', {
  state: () => ({
    turn: 0,
    tide: 0, // -1 .. 1
    pieces: [] as WavePiece[],
    selected: null as null | string,
  }),
  actions: {
    initBoard() {
      // place a minimal set of pieces for demo
      this.pieces = []
      const backRank = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
      for (let i = 0; i < 8; i++) {
        this.pieces.push({
          id: `w-p-${i}`,
          type: backRank[i],
          pos: [i, 7],
          owner: 0,
          amplitude: 0,
          frequency: 1 + (i % 3) * 0.2,
          phase: i * 0.3,
        })
        this.pieces.push({
          id: `b-p-${i}`,
          type: backRank[i],
          pos: [i, 0],
          owner: 1,
          amplitude: 0,
          frequency: 1 + (i % 3) * 0.2,
          phase: i * 0.3,
        })
      }
      // pawns
      for (let i = 0; i < 8; i++) {
        this.pieces.push({
          id: `w-pawn-${i}`,
          type: 'pawn',
          pos: [i, 6],
          owner: 0,
          amplitude: 0,
          frequency: 0.8,
          phase: i * 0.1,
        })
        this.pieces.push({
          id: `b-pawn-${i}`,
          type: 'pawn',
          pos: [i, 1],
          owner: 1,
          amplitude: 0,
          frequency: 0.8,
          phase: i * 0.1,
        })
      }
    },
    nextTurn() {
      // this.turn += 1
      // simple tide calc
      this.tide = Math.sin((this.turn / 4) * Math.PI)
      // update piece amplitudes naively (frontend demo)
      this.pieces.forEach((p) => {
        p.amplitude = Math.sin((this.turn + (p.phase || 0)) * (p.frequency || 1))
      })
    },
  },
})
