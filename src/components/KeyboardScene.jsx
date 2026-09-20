import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  Environment,
  OrbitControls,
  RoundedBox,
  Text,
  useGLTF,
} from "@react-three/drei";

import SmartKey from "./SmartKey";

const MODEL_PATH =
  "/models/compact_keyboard__custom_75_gaming_keyboard.glb";

function KeyboardModel() {
  const { scene } = useGLTF(MODEL_PATH);

  return (
    <primitive
      object={scene}
      scale={1}
    />
  );
}

function SmartKeyRail({
  assignments,
  workflows,
  activeKey,
  onRun,
}) {
  return (
    <group position={[0.0, 2.3, 4]}>
        <group rotation={[0.5, 0, 1.4]}>
      {/* Smart-key housing */}
      <RoundedBox
        args={[1.0, 0.45, 4.0]}
        radius={0.12}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#171d24"
          metalness={0.75}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Smart label */}
      <Text
        position={[0, 0.27, -2.12]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.12}
        color="#67e8f9"
        anchorX="center"
      >
        SMART
      </Text>

      {assignments.map((workflowId, index) => {
        const workflow = workflows[workflowId];

        return (
          <SmartKey
            key={`${workflowId}-${index}`}
            workflow={workflow}
            active={activeKey === index}
            position={[
              0,
              0.27,
              -1.3 + index * 0.85,
            ]}
            onClick={() =>
              onRun(workflowId, index)
            }
          />
        );
      })}
    </group>
    </group>
  );
}

function Product({
  assignments,
  workflows,
  activeKey,
  onRun,
}) {
  return (
    <group rotation={[-0.5, 0, 0]}>
      <KeyboardModel />

      <SmartKeyRail
        assignments={assignments}
        workflows={workflows}
        activeKey={activeKey}
        onRun={onRun}
      />
    </group>
  );
}

export default function KeyboardScene({
  assignments,
  workflows,
  activeKey,
  onRun,
}) {
  return (
    <div className="keyboard-scene">
      <Canvas
        camera={{
          position: [0, 0, 0],
          fov: 100,
        }}
      >
        <color
          attach="background"
          args={["#0d1117"]}
        />

        <ambientLight intensity={1.8} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={3}
        />

        <directionalLight
          position={[-5, 4, -3]}
          intensity={1.5}
        />

        <Suspense fallback={null}>
          <Bounds
            fit
            clip
            observe
            margin={1.3}
          >
            <Center>
              <Product
                assignments={assignments}
                workflows={workflows}
                activeKey={activeKey}
                onRun={onRun}
              />
            </Center>
          </Bounds>

          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);