import { describe, expect, it } from "vitest";
import BoardPiece from "@/components/BoardPiece.vue";
import { mount } from "@vue/test-utils";

describe("BoardPiece", () => {
  it("Correct glyph", () => {
    const wrapper = mount(BoardPiece, { props: { type: "king", owner: 0, amplitude: 1 } });
    expect(wrapper.text()).toContain("K");
    const wrapper2 = mount(BoardPiece, { props: { type: "queen", owner: 0, amplitude: 1 } });
    expect(wrapper2.text()).toContain("Q");
  });
});
