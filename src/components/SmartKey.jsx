import { useState } from "react";
import { RoundedBox, Text } from "@react-three/drei";

export default function SmartKey({
  workflow,
  position,
  active,
  onClick,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Smart key */}
      <RoundedBox
        args={[0.82, 0.3, 0.82]}
        radius={0.1}
        smoothness={4}
        scale={active ? [0.9, 0.8, 0.9] : [1, 1, 1]}
        onPointerEnter={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
      >
        <meshStandardMaterial
          color={hovered || active ? "#202b35" : "#11171e"}
          metalness={0.7}
          roughness={0.25}
        />
      </RoundedBox>

      {/* LED */}
      <mesh position={[0, 0.17, 0]}>
        <boxGeometry args={[0.32, 0.03, 0.32]} />

        <meshStandardMaterial
          color={active ? "#67e8f9" : "#1b5965"}
          emissive={active ? "#67e8f9" : "#0b3037"}
          emissiveIntensity={active ? 5 : 1.5}
        />
      </mesh>

      {/* Icon */}
      <Text
        position={[0, 0.2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.22}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {workflow.icon}
      </Text>

      {/* Label */}
      <Text
        position={[0, -0.2, 0.42]}
        fontSize={0.1}
        color="#dbe5ec"
        anchorX="center"
        anchorY="middle"
      >
        {workflow.name}
      </Text>
    </group>
  );
}