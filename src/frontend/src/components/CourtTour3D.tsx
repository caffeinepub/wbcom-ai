import { Html, Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const COURT_DATA = [
  {
    id: "supreme",
    name: "Supreme Court of India",
    short: "Supreme Court",
    y: 5.5,
    color: "#c9a84c",
    glowColor: "#f5d87a",
    size: 0.55,
    jurisdiction:
      "Whole of India — Final court of appeal under Article 136 of the Constitution",
    powers:
      "Original, appellate, advisory jurisdiction; power to transfer cases between courts; Article 32 writ jurisdiction for enforcement of fundamental rights",
    cases:
      "Constitutional matters, inter-state disputes, death row appeals, Special Leave Petitions (SLPs) from all High Courts, Presidential References",
    facts:
      "Established January 28, 1950; 34 judges including CJI; located at Tilak Marg, New Delhi; decides ~70,000+ cases annually",
  },
  {
    id: "high",
    name: "High Courts (25)",
    short: "High Courts",
    y: 3.2,
    color: "#f59e0b",
    glowColor: "#fbbf24",
    size: 0.48,
    jurisdiction:
      "State/UT jurisdiction; appellate authority over all district and subordinate courts within the state",
    powers:
      "Article 226 writ jurisdiction; supervisory powers over subordinate courts; appellate jurisdiction; original jurisdiction in certain matters",
    cases:
      "Civil/criminal appeals from district courts, writ petitions, company cases, election matters, first appeals in high value civil disputes",
    facts:
      "Calcutta HC is the oldest (1862); each state has at least one HC; 25 HCs across India; some HCs have benches in multiple cities",
  },
  {
    id: "district",
    name: "District Courts",
    short: "District Courts",
    y: 1.2,
    color: "#3b82f6",
    glowColor: "#60a5fa",
    size: 0.42,
    jurisdiction:
      "District-level jurisdiction; principal civil and criminal court at district level",
    powers:
      "Original civil jurisdiction (suits of higher pecuniary value); appellate over subordinate civil courts; Sessions Court exercises criminal appellate powers",
    cases:
      "Major civil disputes (property, matrimonial), serious criminal cases (sessions cases), appeals from magistrate courts",
    facts:
      "Headed by District Judge; also functions as Sessions Court for criminal matters; around 700+ district courts in India",
  },
  {
    id: "sessions",
    name: "Sessions Courts",
    short: "Sessions Courts",
    y: -0.5,
    color: "#6366f1",
    glowColor: "#818cf8",
    size: 0.38,
    jurisdiction:
      "Criminal jurisdiction at district level; usually co-located with District Court",
    powers:
      "Trial of all serious offences (punishable by imprisonment > 7 years, life imprisonment, or death); power to grant bail in non-bailable offences",
    cases:
      "Murder (IPC 302/BNS 101), rape (IPC 376), dacoity, kidnapping, NDPS cases, POCSO cases, arms act offences",
    facts:
      "Sessions Judge is the highest criminal court at district level; Additional Sessions Judges assist in busy districts",
  },
  {
    id: "civil",
    name: "Civil Courts",
    short: "Civil Courts",
    y: -2.2,
    color: "#0ea5e9",
    glowColor: "#38bdf8",
    size: 0.36,
    jurisdiction:
      "Civil matters within defined pecuniary limits at sub-district level",
    powers:
      "Original civil jurisdiction (property disputes, money suits, injunctions, specific performance, partition suits within pecuniary limits)",
    cases:
      "Property disputes, rent disputes, money recovery suits, succession matters, contract disputes, family court cases",
    facts:
      "Includes Civil Judge (Senior Division) and Civil Judge (Junior Division); pecuniary limits vary by state",
  },
  {
    id: "magistrate",
    name: "Magistrate Courts",
    short: "Magistrate Courts",
    y: -3.8,
    color: "#8b5cf6",
    glowColor: "#a78bfa",
    size: 0.36,
    jurisdiction:
      "Criminal jurisdiction for offences with imprisonment up to 7 years",
    powers:
      "Trial of bailable and non-bailable offences; remand authority; bail; taking cognizance; Section 156(3) CrPC directions to police",
    cases:
      "Theft, cheating, assault, cheque bounce (NI Act 138), traffic offences, CRPC Section 125 maintenance, domestic violence cases",
    facts:
      "Three tiers: Chief Judicial Magistrate (CJM), Judicial Magistrate (JM), and Executive Magistrate; Metropolitan areas have Metropolitan Magistrates",
  },
  {
    id: "lokadalat",
    name: "Lok Adalat",
    short: "Lok Adalat",
    y: -5.4,
    color: "#22c55e",
    glowColor: "#4ade80",
    size: 0.42,
    jurisdiction:
      "Alternative Dispute Resolution; voluntary settlement forum for pending and pre-litigation matters",
    powers:
      "Conciliation and compromise; award has decree status (final and binding); no court fees; decisions cannot be appealed",
    cases:
      "Motor accident claims, MACT cases, matrimonial disputes, labour disputes, compoundable criminal offences, electricity disputes, bank recovery cases",
    facts:
      "Established under Legal Services Authorities Act 1987; over 1 crore cases settled annually; free of cost; includes Permanent Lok Adalats for public utility disputes",
  },
];

const CONNECTIONS = [
  ["supreme", "high"],
  ["high", "district"],
  ["district", "sessions"],
  ["sessions", "civil"],
  ["civil", "magistrate"],
  ["magistrate", "lokadalat"],
];

function CourtNode({
  data,
  onClick,
  isSelected,
}: {
  data: (typeof COURT_DATA)[0];
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = data.y + Math.sin(t * 0.8 + data.y) * 0.06;
      const scale = isSelected ? 1.3 : hovered ? 1.15 : 1.0;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1),
      );
    }
  });

  return (
    <group position={[0, data.y, 0]}>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Three.js mesh, not DOM element */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={isSelected ? 0.9 : hovered ? 0.6 : 0.3}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.size * 1.3, data.size * 1.6, 32]} />
        <meshBasicMaterial
          color={data.glowColor}
          transparent
          opacity={isSelected ? 0.4 : hovered ? 0.25 : 0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Html
        position={[0, data.size + 0.35, 0]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            background: "rgba(7,16,31,0.85)",
            border: `1px solid ${
              isSelected ? data.color : "rgba(201,168,76,0.4)"
            }`,
            borderRadius: "6px",
            padding: "3px 10px",
            color: isSelected ? data.color : "#e8d5a3",
            fontSize: "11px",
            fontWeight: isSelected ? "700" : "500",
            whiteSpace: "nowrap",
            backdropFilter: "blur(4px)",
          }}
        >
          {data.short}
        </div>
      </Html>
    </group>
  );
}

function AppealLines() {
  const courtMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of COURT_DATA) m[c.id] = c.y;
    return m;
  }, []);

  return (
    <>
      {CONNECTIONS.map(([from, to]) => {
        const y1 = courtMap[from];
        const y2 = courtMap[to];
        const mid = (y1 + y2) / 2;
        const points = [
          new THREE.Vector3(0, y1 - 0.55, 0),
          new THREE.Vector3(0.3, mid, 0),
          new THREE.Vector3(0, y2 + 0.55, 0),
        ];
        return (
          <Line
            key={`${from}-${to}`}
            points={points}
            color="#c9a84c"
            lineWidth={1.5}
            opacity={0.5}
            transparent
            dashed
            dashSize={0.15}
            gapSize={0.1}
          />
        );
      })}
    </>
  );
}

function FlowingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#c9a84c"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

export function CourtTour3D() {
  const [selectedCourt, setSelectedCourt] = useState<
    (typeof COURT_DATA)[0] | null
  >(null);

  return (
    <div
      style={{
        background: "#050d1a",
        borderRadius: "12px",
        border: "1px solid rgba(201,168,76,0.3)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div>
          <h2
            style={{
              color: "#c9a84c",
              fontSize: "16px",
              fontWeight: "700",
              margin: 0,
            }}
          >
            ⚖ India's Court Hierarchy — 3D Visual Tour
          </h2>
          <p style={{ color: "#a89060", fontSize: "12px", margin: "4px 0 0" }}>
            Click any court node to learn more. Drag to rotate, scroll to zoom.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { color: "#c9a84c", label: "Supreme Court" },
            { color: "#f59e0b", label: "High Courts" },
            { color: "#3b82f6", label: "District/Sessions" },
            { color: "#22c55e", label: "Lok Adalat" },
          ].map((l) => (
            <span
              key={l.label}
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: l.color,
                  display: "inline-block",
                }}
              />
              <span style={{ color: "#a89060", fontSize: "10px" }}>
                {l.label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* 3D Canvas */}
        <div style={{ height: "500px", position: "relative" }}>
          <Canvas
            camera={{ position: [4, 0, 4], fov: 55 }}
            style={{ background: "transparent" }}
            dpr={[1, 1.5]}
          >
            <color attach="background" args={["#050d1a"]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 10, 5]} intensity={1.2} color="#f5d87a" />
            <pointLight
              position={[-5, -10, -5]}
              intensity={0.5}
              color="#3b82f6"
            />

            <FlowingParticles />
            <AppealLines />

            {COURT_DATA.map((court) => (
              <CourtNode
                key={court.id}
                data={court}
                isSelected={selectedCourt?.id === court.id}
                onClick={() =>
                  setSelectedCourt((prev) =>
                    prev?.id === court.id ? null : court,
                  )
                }
              />
            ))}

            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={12}
              autoRotate
              autoRotateSpeed={0.6}
            />
          </Canvas>
        </div>

        {/* Info Panel */}
        {selectedCourt ? (
          <div
            style={{
              padding: "20px",
              background: "rgba(12,24,48,0.95)",
              borderTop: "1px solid rgba(201,168,76,0.3)",
            }}
            data-ocid="law.court_tour.panel"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{
                  color: selectedCourt.color,
                  fontSize: "18px",
                  fontWeight: "800",
                  margin: 0,
                }}
              >
                {selectedCourt.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedCourt(null)}
                data-ocid="law.court_tour.close_button"
                style={{
                  background: "none",
                  border: "1px solid rgba(201,168,76,0.3)",
                  color: "#a89060",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                ✕ Close
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "12px",
              }}
            >
              {[
                {
                  icon: "🗺",
                  title: "Jurisdiction",
                  text: selectedCourt.jurisdiction,
                },
                { icon: "⚡", title: "Powers", text: selectedCourt.powers },
                {
                  icon: "📋",
                  title: "Types of Cases",
                  text: selectedCourt.cases,
                },
                {
                  icon: "📌",
                  title: "Notable Facts",
                  text: selectedCourt.facts,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "rgba(201,168,76,0.06)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                >
                  <p
                    style={{
                      color: "#c9a84c",
                      fontSize: "12px",
                      fontWeight: "700",
                      margin: "0 0 6px",
                    }}
                  >
                    {item.icon} {item.title}
                  </p>
                  <p
                    style={{
                      color: "#d4c8a8",
                      fontSize: "13px",
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "16px 20px",
              borderTop: "1px solid rgba(201,168,76,0.1)",
              textAlign: "center",
              color: "#a89060",
              fontSize: "13px",
            }}
          >
            👆 Click any glowing sphere to see details about that court
          </div>
        )}
      </div>
    </div>
  );
}
