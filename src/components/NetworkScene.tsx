"use client";

/* eslint-disable react-hooks/immutability -- three.js buffers are mutated in place every frame, by design. */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Progress = { current: number };

/** Points spread evenly on a sphere (Fibonacci lattice). */
function spherePoints(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = 0.86 + ((i * 7919) % 100) / 100 * 0.28;
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius * jitter));
  }
  return pts;
}

/** Points laid out on a flat grid, the shape the network settles into as you scroll. */
function gridPoints(count: number, spacing: number) {
  const cols = Math.ceil(Math.sqrt(count));
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    pts.push(new THREE.Vector3((c - (cols - 1) / 2) * spacing, (r - (cols - 1) / 2) * spacing, 0));
  }
  return pts;
}

function Network({ count, progress }: { count: number; progress: Progress }) {
  const group = useRef<THREE.Group>(null);
  const pointsGeo = useRef<THREE.BufferGeometry>(null);
  const linesGeo = useRef<THREE.BufferGeometry>(null);
  const packet = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { sphere, grid, edges } = useMemo(() => {
    const sphere = spherePoints(count, 2.3);
    const grid = gridPoints(count, 0.55);
    const edges: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      const dists = sphere
        .map((p, j) => ({ j, d: p.distanceTo(sphere[i]) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      for (const { j } of dists) if (i < j) edges.push([i, j]);
    }
    return { sphere, grid, edges };
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const linePositions = useMemo(() => new Float32Array(edges.length * 6), [edges]);
  const current = useMemo(() => sphere.map((p) => p.clone()), [sphere]);
  const route = useRef({ edge: 0, t: 0 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const ease = p * p * (3 - 2 * p);
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const wobble = Math.sin(time * 0.8 + i) * 0.04 * (1 - ease);
      current[i].lerpVectors(sphere[i], grid[i], ease);
      positions[i * 3] = current[i].x + wobble;
      positions[i * 3 + 1] = current[i].y + wobble;
      positions[i * 3 + 2] = current[i].z;
    }
    edges.forEach(([a, b], k) => {
      linePositions.set([positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2]], k * 6);
      linePositions.set([positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]], k * 6 + 3);
    });
    if (pointsGeo.current) pointsGeo.current.attributes.position.needsUpdate = true;
    if (linesGeo.current) linesGeo.current.attributes.position.needsUpdate = true;

    // A packet travels from node to node along the edges.
    const r = route.current;
    r.t += delta * 1.6;
    if (r.t >= 1) {
      const [, end] = edges[r.edge];
      const next = edges.findIndex(([a], idx) => a === end && idx !== r.edge);
      r.edge = next >= 0 ? next : (r.edge * 7 + 3) % edges.length;
      r.t = 0;
    }
    const [a, b] = edges[r.edge];
    packet.current?.position.set(
      THREE.MathUtils.lerp(positions[a * 3], positions[b * 3], r.t),
      THREE.MathUtils.lerp(positions[a * 3 + 1], positions[b * 3 + 1], r.t),
      THREE.MathUtils.lerp(positions[a * 3 + 2], positions[b * 3 + 2], r.t),
    );

    if (group.current) {
      const targetY = time * 0.12 * (1 - ease) + pointer.current.x * 0.35;
      const targetX = pointer.current.y * 0.25 * (1 - ease);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry ref={linesGeo}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#7cb4ff" transparent opacity={0.28} />
      </lineSegments>
      <points>
        <bufferGeometry ref={pointsGeo}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#7cb4ff" size={0.07} sizeAttenuation />
      </points>
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshBasicMaterial color="#ff8a3d" />
      </mesh>
      <mesh ref={packet}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ff8a3d" />
      </mesh>
    </group>
  );
}

export default function NetworkScene({ progress }: { progress: Progress }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // This component only renders in the browser (loaded with ssr: false).
  const [count] = useState(() => (window.innerWidth < 768 ? 36 : 64));
  const [still] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} aria-hidden="true" className="h-full w-full">
      <Canvas
        key={count}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.2], fov: 50 }}
        frameloop={visible && !still ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Network count={count} progress={progress} />
      </Canvas>
    </div>
  );
}
