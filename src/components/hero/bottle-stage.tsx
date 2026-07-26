"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  Lightformer,
  ContactShadows,
} from "@react-three/drei";
import { useEffect, useMemo, useRef, type Ref } from "react";
import * as THREE from "three";
import { stage } from "./stage-store";

/* -------------------------------------------------------------------------- */
/*  Labels — drawn to 2D canvases so we never ship a texture file and the type  */
/*  always matches the brand. Black lockups composited onto the faces.          */
/* -------------------------------------------------------------------------- */

/** Black ink lockups on both bottles — the branding is drawn flat black with no
    glow, so it reads as clean printed type rather than metallic foil. */
function applyFoil(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#0c0a09";
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
}

/** The FRESH ◆ FAMOUS lockup — two heavy words split by the stacked "AND" +
    diamond mark, as on the real cartons. */
function drawWordmark(ctx: CanvasRenderingContext2D, cx: number, y: number) {
  const gap = 56;
  ctx.save();
  applyFoil(ctx);
  ctx.textBaseline = "middle";

  ctx.font = '800 46px "Montserrat", sans-serif';
  ctx.textAlign = "right";
  ctx.fillText("FRESH", cx - gap / 2, y);
  ctx.textAlign = "left";
  ctx.fillText("FAMOUS", cx + gap / 2, y);

  ctx.textAlign = "center";
  ctx.font = '700 13px "Montserrat", sans-serif';
  ctx.fillText("AND", cx, y - 15);

  ctx.translate(cx, y + 7);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-5.5, -5.5, 11, 11);
  ctx.restore();
}

function drawFrontLabel(canvas: HTMLCanvasElement, forHer: boolean) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  applyFoil(ctx);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  drawWordmark(ctx, w / 2, h * 0.27);

  applyFoil(ctx);
  ctx.letterSpacing = "0px";
  ctx.font = '600 196px "Cormorant", Georgia, serif';
  ctx.fillText("6ES", w / 2, h * 0.5);

  ctx.font = '500 24px "Montserrat", sans-serif';
  ctx.letterSpacing = "4px";
  ctx.fillText(forHer ? "FOR HER · POUR ELLE" : "FOR HIM · POUR LUI", w / 2, h * 0.63);

  ctx.font = '500 24px "Montserrat", sans-serif';
  ctx.letterSpacing = "3px";
  ctx.fillText("EXTRAIT DE PARFUM", w / 2, h * 0.8);

  ctx.font = '400 18px "Montserrat", sans-serif';
  ctx.letterSpacing = "1px";
  ctx.fillText("1.7 fl. oz.   50ml", w / 2, h * 0.85);
  ctx.letterSpacing = "0px";
}

/** The back face carries the 416 signature — shared by both variants. */
function drawBackLabel(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  applyFoil(ctx);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  drawWordmark(ctx, w / 2, h * 0.2);

  applyFoil(ctx);
  ctx.letterSpacing = "0px";
  ctx.font = '500 260px "Cormorant", Georgia, serif';
  ctx.fillText("416", w / 2, h * 0.52);

  ctx.font = '500 22px "Montserrat", sans-serif';
  ctx.letterSpacing = "5px";
  ctx.fillText("BORN IN TORONTO", w / 2, h * 0.78);

  ctx.font = '400 16px "Montserrat", sans-serif';
  ctx.letterSpacing = "2px";
  ctx.fillText("6ES™ · EXTRAIT DE PARFUM", w / 2, h * 0.85);
  ctx.letterSpacing = "0px";
}

/** The narrow side face — a tall vertical "416" running up the panel. Shared
    by both variants. */
function drawSideLabel(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  applyFoil(ctx);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Each digit upright, stacked top-to-bottom: 4 / 1 / 6
  ctx.font = '500 210px "Cormorant", Georgia, serif';
  const digits = ["4", "1", "6"];
  digits.forEach((d, i) => {
    ctx.fillText(d, w / 2, (h * (i + 1)) / (digits.length + 1));
  });
}

function makeTexture(
  draw: (c: HTMLCanvasElement) => void,
  width = 620,
  height = 868, // ~ body face ratio (1 : 1.4)
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/* -------------------------------------------------------------------------- */
/*  Cross-dissolve helper.                                                      */
/* -------------------------------------------------------------------------- */

function setGroupOpacity(group: THREE.Group | null, opacity: number) {
  if (!group) return;
  group.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.material) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const mat of mats) {
      // Always keep transparent = true. Forcing it false makes the label
      // texture's see-through pixels render as opaque black, blacking out the
      // whole panel. We only vary opacity for the crossfade.
      mat.transparent = true;
      mat.opacity = opacity;
      mat.depthWrite = opacity > 0.98;
    }
  });
}

/* -------------------------------------------------------------------------- */
/*  A single flacon — gold cap + collar, a coloured body, and the four label    */
/*  faces. Reused for the gold "For Him", the pearl "For Her", and the landing   */
/*  companion. Only the body colour changes between them.                        */
/* -------------------------------------------------------------------------- */

function Flacon({
  bodyColor,
  front,
  back,
  side,
  scale = 1,
  visible = true,
  innerRef,
}: {
  bodyColor: string;
  front: THREE.Texture;
  back: THREE.Texture;
  side: THREE.Texture;
  scale?: number;
  visible?: boolean;
  innerRef?: Ref<THREE.Group>;
}) {
  return (
    <group ref={innerRef} scale={scale} visible={visible}>
      <group position={[0, -0.36, 0]}>
        {/* gold neck + cap — shared hardware on every flacon */}
        <mesh position={[0, 0.83, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 0.16, 40]} />
          <meshPhysicalMaterial
            color="#caa24a"
            metalness={1}
            roughness={0.25}
            envMapIntensity={1.6}
          />
        </mesh>
        <RoundedBox
          args={[0.44, 0.52, 0.44]}
          radius={0.04}
          smoothness={5}
          position={[0, 1.17, 0]}
        >
          <meshPhysicalMaterial
            color="#caa24a"
            metalness={1}
            roughness={0.28}
            clearcoat={1}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        {/* body — colour is the only thing that changes between variants */}
        <RoundedBox args={[1.02, 1.42, 0.5]} radius={0.05} smoothness={6}>
          <meshPhysicalMaterial
            color={bodyColor}
            metalness={1}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.14}
            envMapIntensity={1.7}
          />
        </RoundedBox>

        {/* front label */}
        <mesh position={[0, -0.02, 0.2515]}>
          <planeGeometry args={[0.92, 1.28]} />
          <meshBasicMaterial map={front} transparent toneMapped={false} />
        </mesh>
        {/* back — the 416 signature */}
        <mesh position={[0, -0.02, -0.2515]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.92, 1.28]} />
          <meshBasicMaterial map={back} transparent toneMapped={false} />
        </mesh>
        {/* 416 up both side faces */}
        <mesh position={[0.5115, -0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.4, 1.28]} />
          <meshBasicMaterial map={side} transparent toneMapped={false} />
        </mesh>
        <mesh position={[-0.5115, -0.02, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.4, 1.28]} />
          <meshBasicMaterial map={side} transparent toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/* Spacing of the landing companion relative to the hero — tight enough that
   they read as a pair on the same slab. */
const DUO_OFFSET = 0.95;
/** Bottle base sits this far below the group's origin (inner offset + half body). */
const FLOOR_Y = -1.08;

/* -------------------------------------------------------------------------- */
/*  The staged bottles — the hero "For Him" (which morphs to "For Her" mid-     */
/*  story) plus a companion "For Her" that stands to its right at the landing    */
/*  and recedes behind, rotating, as the story begins.                          */
/* -------------------------------------------------------------------------- */

function Bottle() {
  const group = useRef<THREE.Group>(null);
  const himRef = useRef<THREE.Group>(null);
  const herRef = useRef<THREE.Group>(null);
  const duoRef = useRef<THREE.Group>(null);
  // Avoid rewriting every material every frame — that was hitching the scroll.
  const lastMorph = useRef(-1);
  const lastDuo = useRef(-1);

  const { himFront, herFront, back, side } = useMemo(
    () => ({
      himFront: makeTexture((c) => drawFrontLabel(c, false)),
      herFront: makeTexture((c) => drawFrontLabel(c, true)),
      back: makeTexture(drawBackLabel),
      side: makeTexture(drawSideLabel, 300, 914),
    }),
    [],
  );

  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => {
      if (!alive) return;
      drawFrontLabel(himFront.image as HTMLCanvasElement, false);
      drawFrontLabel(herFront.image as HTMLCanvasElement, true);
      drawBackLabel(back.image as HTMLCanvasElement);
      drawSideLabel(side.image as HTMLCanvasElement);
      himFront.needsUpdate = true;
      herFront.needsUpdate = true;
      back.needsUpdate = true;
      side.needsUpdate = true;
    });
    return () => {
      alive = false;
      himFront.dispose();
      herFront.dispose();
      back.dispose();
      side.dispose();
    };
  }, [himFront, herFront, back, side]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;

    // Soft pointer parallax only — no idle float.
    const targetRotY = stage.rotY + stage.pointerX * 0.14;
    const targetRotX = -stage.pointerY * 0.06;

    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRotY, 0.1);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRotX, 0.1);
    g.position.x = THREE.MathUtils.lerp(g.position.x, stage.posX, 0.1);
    g.position.y = THREE.MathUtils.lerp(g.position.y, stage.posY, 0.1);
    const s = THREE.MathUtils.lerp(g.scale.x, stage.scale, 0.1);
    g.scale.setScalar(s);

    // Variant cross-dissolve — only when morph actually moves.
    const m = THREE.MathUtils.clamp(stage.morph, 0, 1);
    if (Math.abs(m - lastMorph.current) > 0.001) {
      lastMorph.current = m;
      if (himRef.current) himRef.current.visible = m < 0.996;
      if (herRef.current) herRef.current.visible = m > 0.004;
      setGroupOpacity(himRef.current, 1 - m);
      setGroupOpacity(herRef.current, m);
    }

    // Companion "For Her" — same size/rotation as the hero; hides by fading +
    // receding (never by scaling to zero — that was glitching the scroll).
    const c = duoRef.current;
    if (c) {
      const d = THREE.MathUtils.clamp(stage.duo, 0, 1);
      c.visible = d > 0.004;
      c.rotation.y = THREE.MathUtils.lerp(c.rotation.y, targetRotY, 0.1);
      c.rotation.x = THREE.MathUtils.lerp(c.rotation.x, targetRotX, 0.1);
      c.position.x = THREE.MathUtils.lerp(c.position.x, stage.posX + DUO_OFFSET, 0.1);
      c.position.y = THREE.MathUtils.lerp(c.position.y, stage.posY, 0.1);
      c.position.z = THREE.MathUtils.lerp(c.position.z, -1.4 * (1 - d), 0.1);
      const cs = THREE.MathUtils.lerp(c.scale.x, stage.scale, 0.1);
      c.scale.setScalar(cs);
      if (Math.abs(d - lastDuo.current) > 0.001) {
        lastDuo.current = d;
        setGroupOpacity(c, d);
      }
    }
  });

  return (
    <>
      {/* Hero flacon — gold "For Him", crossfading to pearl "For Her" mid-story */}
      <group ref={group}>
        <Flacon
          innerRef={himRef}
          bodyColor="#b98a2e"
          front={himFront}
          back={back}
          side={side}
        />
        <Flacon
          innerRef={herRef}
          bodyColor="#e8e5df"
          front={herFront}
          back={back}
          side={side}
          scale={1.004}
          visible={false}
        />
      </group>

      {/* Landing companion — the "For Her" standing to the right. Initial
          transform matches its resting target so it never flashes at centre. */}
      <group
        ref={duoRef}
        position={[stage.posX + DUO_OFFSET, stage.posY, 0]}
        scale={stage.scale}
      >
        <Flacon bodyColor="#e8e5df" front={herFront} back={back} side={side} />
      </group>
    </>
  );
}

/** Static wide contact shadows covering the slab travel path. Kept fixed so
    ContactShadows isn't re-projected every frame (that was hitching the scroll). */
function GroundShadows() {
  return (
    <>
      <ContactShadows
        position={[0.2, FLOOR_Y + 0.16, 0]}
        opacity={0.7}
        scale={8}
        blur={2.8}
        far={3.5}
        color="#050301"
      />
      <ContactShadows
        position={[0.2, FLOOR_Y + 0.17, 0]}
        opacity={0.55}
        scale={5}
        blur={1.3}
        far={2.4}
        color="#000000"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  The stage — transparent canvas, a near-complete warm light studio so gold   */
/*  reads gold (never black) from every angle. No external HDRI.                */
/* -------------------------------------------------------------------------- */

export default function BottleStage() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.9], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* Lighting only — the bottle's colour and mirror finish are unchanged.
          A little ambient + hemisphere fill lifts the flat faces off pure black
          into dark gold, and a warm key from the upper-right matches the photo's
          light beam so the flacon reads as part of the shot, not a CGI prop. */}
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#ffe9c8", "#140d04", 0.6]} />
      <directionalLight position={[5, 6, 3]} intensity={2.0} color="#ffe4b5" />
      <spotLight
        position={[4, 6, 2.5]}
        angle={0.45}
        penumbra={1}
        intensity={42}
        color="#fff2d8"
      />
      <Bottle />
      <GroundShadows />
      <Environment resolution={256}>
        {/* camera-side warm panel — keeps the front / flat faces reading gold
            (not black) while the darker sides preserve the glossy reflections */}
        <Lightformer
          form="rect"
          intensity={1.3}
          position={[0, 1, 6]}
          scale={[12, 10, 1]}
          color="#e9cc8e"
        />
        <Lightformer
          form="rect"
          intensity={2.6}
          position={[-3, 2, 3]}
          scale={[5, 7, 1]}
          color="#fff2d6"
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[3.5, 1, 2]}
          scale={[3, 6, 1]}
          color="#ffe9c2"
        />
        <Lightformer
          form="circle"
          intensity={2.2}
          position={[0, 3.5, -2]}
          scale={4}
          color="#a16207"
        />
        <Lightformer
          form="rect"
          intensity={0.6}
          position={[0, -2.5, 2]}
          scale={[8, 2, 1]}
          color="#ffffff"
        />
      </Environment>
    </Canvas>
  );
}
