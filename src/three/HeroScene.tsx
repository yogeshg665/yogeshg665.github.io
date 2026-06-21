import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { makeDotTexture } from "./texture";

const NODE_COUNT = 130;
const MAX_LINK_DIST = 1.65;

function generateNodes(count: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    // Distribute in a flattened ellipsoid cloud
    const r = Math.cbrt(Math.random()) * 4.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pts.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
        r * Math.cos(phi) * 0.7
      )
    );
  }
  return pts;
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const anomalyRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const nodes = useMemo(() => generateNodes(NODE_COUNT), []);
  const baseTex = useMemo(() => makeDotTexture("#9fd8ff"), []);
  const anomalyTex = useMemo(() => makeDotTexture("#ff5d6c"), []);

  // Node point cloud
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

  // Connecting lines between near neighbors
  const lineGeom = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < MAX_LINK_DIST) {
          positions.push(
            nodes[i].x,
            nodes[i].y,
            nodes[i].z,
            nodes[j].x,
            nodes[j].y,
            nodes[j].z
          );
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    return g;
  }, [nodes]);

  // A handful of "anomaly" nodes that pulse red
  const anomalies = useMemo(() => {
    const idxs = [4, 23, 58, 91, 110];
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(idxs.length * 3);
    idxs.forEach((idx, i) => {
      arr[i * 3] = nodes[idx].x;
      arr[i * 3 + 1] = nodes[idx].y;
      arr[i * 3 + 2] = nodes[idx].z;
    });
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [nodes]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.06;
      // Subtle parallax toward the pointer
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.25,
        0.05
      );
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        pointer.x * 0.4,
        0.05
      );
    }
    if (anomalyRef.current) {
      const mat = anomalyRef.current.material as THREE.PointsMaterial;
      mat.size = 0.5 + Math.sin(state.clock.elapsedTime * 2.2) * 0.18;
      mat.opacity = 0.7 + Math.sin(state.clock.elapsedTime * 2.2) * 0.3;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial
          color="#2dd4bf"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points geometry={nodeGeom}>
        <pointsMaterial
          map={baseTex}
          color="#bfe6ff"
          size={0.22}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={anomalyRef} geometry={anomalies}>
        <pointsMaterial
          map={anomalyTex}
          color="#ff5d6c"
          size={0.5}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <Network />
    </>
  );
}
