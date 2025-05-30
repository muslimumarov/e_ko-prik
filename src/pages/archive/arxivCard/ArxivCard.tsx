// src/components/BridgeCard.tsx
import React from "react";
import { Bridge } from "../interfaces/arxiv.interfaces.tsx";

const BridgeCard: React.FC<{ bridge: Bridge }> = ({ bridge }) => {
  return (
    <div className="border  p-4 shadow">
      <h2 className="mb-2 text-lg font-semibold">{bridge.name}</h2>
      <p>Region: {bridge.region.name}</p>
      <p>District: {bridge.district.name}</p>
      <p>Holat: {bridge.holat}</p>
    </div>
  );
};

export default BridgeCard;
