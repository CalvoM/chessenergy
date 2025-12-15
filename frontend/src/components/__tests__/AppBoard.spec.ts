import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AppBoard from "@/components/AppBoard.vue";
import { createTestingPinia } from "@pinia/testing";
import BoardPiece from "../BoardPiece.vue";
import { useGameStore } from "@/stores/game";
import { nextTick } from "vue";
import WaveOverlay from "../WaveOverlay.vue";

describe("AppBoard", () => {
  const pinia = createTestingPinia({
    createSpy: vi.fn,
  });

  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem");
    vi.spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("Renders the board container", () => {
    const wrapper = mount(AppBoard, { global: { plugins: [pinia] } });
    expect(wrapper.find(".board-wrap").exists()).toBe(true);
    expect(wrapper.find(".board-viewport").exists()).toBe(true);
    expect(wrapper.find(".board").exists()).toBe(true);
  });
  it("Renders exactly 64 tile elements", () => {
    const wrapper = mount(AppBoard, { global: { plugins: [pinia] } });
    expect(wrapper.findAll(".tile").length).toBe(64);
  });
  it("Renders tiles in the correct DOM order (1 -> 64)", () => {
    const wrapper = mount(AppBoard, { global: { plugins: [pinia] } });
    const tiles = wrapper.findAll(".tile");
    expect(tiles.length).toBe(64);
    const sentinelIdxs = [0, 7, 8, 63];
    for (const idx of sentinelIdxs) {
      const tile = tiles[idx];
      const col = (idx + 1 - 1) % 8;
      const row = 7 - Math.floor((idx + 1 - 1) / 8);
      if ((col + row) % 2 === 0) {
        expect(tile?.classes()).toContain("bg-sea");
        expect(tile?.classes()).toContain("tile-light");
      } else {
        expect(tile?.classes()).toContain("bg-[rgba(255,255,255,0.1)]");
        expect(tile?.classes()).not.toContain("tile-light");
      }
    }
  });
  it("Renders a BoardPiece for each entry in store.pieces", async () => {
    const store = useGameStore();

    const wrapper = mount(AppBoard, { global: { plugins: [pinia] } });

    store.pieces = [];
    await nextTick();
    expect(wrapper.findAllComponents(BoardPiece).length).toBe(0);

    store.pieces = [{ id: "w-pawn-0", type: "pawn", pos: [0, 6], owner: 0, amplitude: 0, frequency: 1, phase: 0 }];
    await nextTick();
    expect(wrapper.findAllComponents(BoardPiece).length).toBe(1);
  });
  it("Renders the WaveOverlay component exactly once", () => {
    const wrapper = mount(AppBoard, { global: { plugins: [pinia] } });
    expect(wrapper.findAllComponents(WaveOverlay).length).toBe(1);
  });
});
