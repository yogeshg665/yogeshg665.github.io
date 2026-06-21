import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "./texture";

/* ---------- Quill: ascending market ribbon + guardian shield ---------- */
function QuillScene({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);

  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const x = (t - 0.5) * 7;
      const y = t * 2.6 - 1.2 + Math.sin(t * 9) * 0.35;
      pts.push(new THREE.Vector3(x, y, 0));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 120, 0.06, 8, false),
    [curve]
  );

  const bars = useMemo(() => {
    const arr: { x: number; h: number }[] = [];
    for (let i = 0; i < 14; i++) {
      arr.push({ x: (i / 13 - 0.5) * 6.6, h: 0.4 + Math.random() * 1.6 });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.35;
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={tube}>
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, -1.6 + b.h / 2, -0.3]}>
          <boxGeometry args={[0.18, b.h, 0.18]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.28}
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* guardian shield ring */}
      <mesh position={[2.6, 1.1, 0.2]}>
        <torusGeometry args={[0.7, 0.04, 16, 48]} />
        <meshBasicMaterial color="#bfe6ff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ---------- Sleuth: transaction graph with a flagged node + magnifier ---------- */
function SleuthScene({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  const flagRef = useRef<THREE.Mesh>(null);
  const dot = useMemo(() => makeDotTexture("#ffffff"), []);

  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const r = 1.4 + Math.random() * 1.4;
      pts.push(
        new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.8, (Math.random() - 0.5) * 1.2)
      );
    }
    return pts;
  }, []);

  const lineGeom = useMemo(() => {
    const positions: number[] = [];
    const center = new THREE.Vector3(0, 0, 0);
    nodes.forEach((n) => {
      positions.push(center.x, center.y, center.z, n.x, n.y, n.z);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    return g;
  }, [nodes]);

  const nodeGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [nodes]);

  useFrame((state) => {
    if (group.current) group.current.rotation.z += 0.0015;
    if (flagRef.current) {
      const s = 0.18 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      flagRef.current.scale.setScalar(s / 0.18);
    }
  });

  const flagged = nodes[3];

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color={accent} transparent opacity={0.35} />
      </lineSegments>
      <points geometry={nodeGeom}>
        <pointsMaterial
          map={dot}
          color={accent}
          size={0.32}
          transparent
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      {/* flagged node */}
      <mesh ref={flagRef} position={[flagged.x, flagged.y, flagged.z]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#ff5d6c" toneMapped={false} />
      </mesh>
      {/* magnifier ring around the flagged node */}
      <mesh position={[flagged.x, flagged.y, flagged.z + 0.05]}>
        <torusGeometry args={[0.45, 0.03, 16, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/* ---------- Influx: inbound streams converging on a monitored node ---------- */
function InfluxScene({ accent }: { accent: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const dot = useMemo(() => makeDotTexture("#ffffff"), []);

  const COUNT = 260;
  const data = useMemo(() => {
    const start = new Float32Array(COUNT * 3);
    const speed = new Float32Array(COUNT);
    const angle = new Float32Array(COUNT);
    const radius = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      angle[i] = Math.random() * Math.PI * 2;
      radius[i] = 1 + Math.random() * 3.5;
      speed[i] = 0.25 + Math.random() * 0.5;
      start[i * 3] = Math.cos(angle[i]) * radius[i];
      start[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      start[i * 3 + 2] = Math.sin(angle[i]) * radius[i];
    }
    return { speed, angle, radius };
  }, []);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3)
    );
    return g;
  }, []);

  const progress = useMemo(() => {
    const p = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) p[i] = Math.random();
    return p;
  }, []);

  useFrame((_, delta) => {
    const pos = geom.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      progress[i] += delta * data.speed[i] * 0.35;
      if (progress[i] > 1) progress[i] -= 1;
      const r = data.radius[i] * (1 - progress[i]);
      const a = data.angle[i] + progress[i] * 1.2;
      pos.setXYZ(
        i,
        Math.cos(a) * r,
        (1 - progress[i]) * ((i % 2 ? 1 : -1) * 1.1),
        Math.sin(a) * r
      );
    }
    pos.needsUpdate = true;
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      <points ref={pointsRef} geometry={geom}>
        <pointsMaterial
          map={dot}
          color={accent}
          size={0.14}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export default function ProjectScene({
  id,
  accent,
}: {
  id: "quill" | "sleuth" | "influx";
  accent: string;
}) {
  return (
    <>
      <ambientLight intensity={0.7} />
      {id === "quill" && <QuillScene accent={accent} />}
      {id === "sleuth" && <SleuthScene accent={accent} />}
      {id === "influx" && <InfluxScene accent={accent} />}
    </>
  );
}
