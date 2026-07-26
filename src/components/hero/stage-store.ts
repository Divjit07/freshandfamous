// A tiny module-level store the storyboard writes to (from GSAP + pointer) and
// the R3F scene reads inside useFrame. Kept outside React on purpose: the bottle
// updates every frame, and routing that through state would re-render the tree
// 60×/second. GSAP tweens these numbers directly; the scene lerps toward them.

export type StageState = {
  /** Target bottle rotation on Y, in radians. */
  rotY: number;
  /** Target bottle position, in world units. */
  posX: number;
  posY: number;
  /** Target uniform scale. */
  scale: number;
  /** Pointer parallax, normalised to roughly -1..1. */
  pointerX: number;
  pointerY: number;
  /** Bottle variant cross-fade: 0 = "For Him" (gold), 1 = "For Her" (frosted). */
  morph: number;
  /** Companion "For Her" at the landing: 1 = shown beside "For Him", 0 = hidden
      (receded behind) once the story starts scrolling. */
  duo: number;
};

export const stage: StageState = {
  rotY: -0.15,
  posX: 0.55,
  posY: 0.16,
  scale: 0.72,
  pointerX: 0,
  pointerY: 0,
  morph: 0,
  duo: 1,
};
