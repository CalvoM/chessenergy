## Tests for AppBoard

### Rendering & structure

- [x] Renders the board container and viewport elements.
- [x] Renders exactly 64 tile elements.
- [x] Renders tiles in the correct DOM order (1 → 64).
- [x] Renders the WaveOverlay component exactly once.
- [x] Renders a BoardPiece for each entry in store.pieces.

### Lifecycle & store interaction

- [ ] Calls store.initBoard() exactly once on mount.
- [ ] Does not call initBoard before mount or on re-render.
- [ ] Reacts to changes in store.pieces without remounting.

### Computed properties

- [ ] pieces computed reflects store.pieces reactively.
- [ ] boardTransform returns the expected static transform object.
- [ ] Board viewport style updates when boardTransform changes (if refactored later).

### Tile coordinate helpers

- [ ] col(index) returns correct column for indices 1–64.
- [ ] row(index) returns correct row for indices 1–64.
- [ ] Tile (0,7) corresponds to index 1 and (7,0) to index 64.

### Tile styling & classes

- [ ] Light/dark tile classes alternate correctly across rows.
- [ ] tileClass returns the light class for even parity.
- [ ] tileClass returns the dark class for odd parity.
- [ ] tileStyle applies gradient and box-shadow only to light tiles.
- [ ] Dark tiles have transparent background and no box-shadow.
- [ ] Tile inline styles match expected values for given coordinates.

### Board-to-pixel mapping

- [ ] boardToPx maps (0,0) to top-left corner.
- [ ] boardToPx maps (7,7) to bottom-right corner.
- [ ] Each square has correct width and height (80px).
- [ ] Pixel positions scale correctly if board size changes (future-proof test).

### Piece rendering & positioning

- [ ] Each piece is absolutely positioned within the board.
- [ ] pieceStyle applies correct left/top based on p.pos.
- [ ] Piece width and height match tile size.
- [ ] Pieces render above tiles in DOM order.

### 3D / transform behavior

- [ ] Piece translateZ is 0px when amplitude is 0.
- [ ] Piece translateZ increases linearly with positive amplitude.
- [ ] Negative amplitude does not produce negative Z translation.
- [ ] Board and viewport preserve 3D transform styles.

### Reactivity & updates

- [ ] Updating a piece’s pos updates its position without recreating the element.
- [ ] Updating a piece’s amplitude updates only its transform.
- [ ] Adding a piece renders a new BoardPiece.
- [ ] Removing a piece removes the corresponding DOM element.

### Keys & identity

- [ ] Tile keys are stable and unique.
- [ ] Piece keys are stable and tied to p.id.
- [ ] Reordering pieces does not cause visual teleportation.

### Edge cases & robustness

- [ ] Component handles empty store.pieces without errors.
- [ ] Handles pieces with out-of-range positions defensively (no crash).
- [ ] Handles missing or undefined amplitude gracefully.
- [ ] Does not throw if store.pieces updates rapidly.

### Integration sanity

- [ ] BoardPiece receives correct type, owner, and amplitude props.
- [ ] No unintended props are passed to child components.
- [ ] Scoped styles do not leak to parent or sibling components.
