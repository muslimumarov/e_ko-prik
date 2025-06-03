import React from "react";

interface Props {
  selected: string | null;
  onSelect: (status: string | null) => void;
}

const filterOptions = [
  { label: "Jarayonda", value: "Jarayonda", color: "bg-yellow-400" },
  { label: "Tugallangan", value: "Tugallangan", color: "bg-green-500" },
  { label: "Rejalashtirilgan", value: "Rejalashtirilgan", color: "bg-red-500" },
];

const BridgeFilter: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="absolute left-4 top-4 z-50 w-60 rounded-md bg-white p-4 shadow-lg">
      <h3 className="mb-3 text-lg font-semibold">Holat bo‘yicha filter</h3>
      <button
        onClick={() => onSelect(null)}
        className={`mb-2 w-full rounded py-2 font-medium ${
          selected === null ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Barchasi
      </button>
      {filterOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`mb-2 w-full rounded py-2 font-medium ${opt.color} ${
            selected === opt.value ? "text-white opacity-100" : "opacity-70"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default BridgeFilter;
