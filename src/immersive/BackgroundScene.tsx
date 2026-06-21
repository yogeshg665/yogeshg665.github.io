import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "../three/texture";
import { scrollState } from "./scrollState";
import { useIsMobile, useReducedMotion } from "../hooks/useMedia";

/** Brand accents we lerp between as the visitor scrolls. */
const PALETTE = [
  new THREE.Color("#2dd4bf"), // influx teal (hero)
  new THREE.Color("#38bdf8"), // cyan (about)
  new THREE.Color("#16c784"), // quill green
  new THREE.Color("#f5a524"), // sleuth amber
  new THREE.Color("#2dd4bf"), // influx teal
  new THREE.Color("#9fd8ff"), // pale blue (skills/contact)
];

function lerpPalette(t: number, out: THREE.Color) {
  const scaled = THREE.MathUtils.clamp(t, 0, 1) * (PALETTE.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  const a = PALETTE[i];
  const b = PALETTE[Math.min(i + 1, PALETTE.length - 1)];
  out.copy(a).lerp(b, f);
  return out;
}

/* A large drifting galaxy of points that rotates and recolors with scroll. */
function Galaxy() {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(() => makeDotTexture("#ffffff"), []);
  const COUNT = 2600;
  const tmp = useMemo(() => new THREE.Color(), []);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // disc-with-thickness distribution for a galaxy look
      const r = Math.pow(Math.random(), 0.6) * 14;
      const a = Math.random() * Math.PI * 2 + r * 0.18;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4 * (1 - r / 18);
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const boost = 1 + Math.min(Math.abs(scrollState.velocity) * 0.04, 3);
    ref.current.rotation.y += delta * 0.03 * boost;
    ref.current.rotation.x = -0.35 + scrollState.progress * 0.4;
    const mat = ref.current.material as THREE.PointsMaterial;
    lerpPalette(scrollState.progress, tmp);
    mat.color.lerp(tmp, 0.05);
  });

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial
        map={tex}
        size={0.09}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#2dd4bf"
      />
    </points>
  );
}

/* A central morphing wireframe that breathes and spins faster with scroll velocity. */
function Core() {
  const ref = useRef<THREE.Mesh>(null);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const boost = 1 + Math.min(Math.abs(scrollState.velocity) * 0.05, 4);
    ref.current.rotation.x += delta * 0.15 * boost;
    ref.current.rotation.y += delta * 0.2 * boost;
    const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    const grow = 1 + scrollState.progress * 0.6;
    ref.current.scale.setScalar(breathe * grow);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    lerpPalette(scrollState.progress, tmp);
    mat.color.lerp(tmp, 0.05);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.4, 1]} />
      <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.22} />
    </mesh>
  );
}

/* Foreground streaks that drift past for a sense of depth/motion. */
function Streaks() {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(() => makeDotTexture("#ffffff"), []);
  const COUNT = 140;

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 + 4;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      let x = pos.getX(i) - delta * (1.2 + (i % 5) * 0.3);
      if (x < -11) x = 11;
      pos.setX(i, x);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial
        map={tex}
        size={0.07}
        color="#bfe6ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    // Dolly through the scene as you scroll, with gentle pointer parallax.
    const targetZ = 9 - scrollState.progress * 3;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.2, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.8, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function BackgroundScene() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  if (isMobile || reduced) {
    return (
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(45,212,191,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(245,165,36,0.10),transparent_55%)]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 9], fov: 55 }}
      >
        <ambientLight intensity={0.6} />
        <Galaxy />
        <Core />
        <Streaks />
        <Rig />
      </Canvas>
      {/* readability vignette over the live scene */}
      <div className="pointer-events-none absolute inset-0 bg-base/30" />
    </div>
  );
}
