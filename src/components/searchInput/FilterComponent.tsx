import React, { useState, ChangeEvent } from "react";

type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: "Hammasi", value: "" },
  { label: "Variant 1", value: "option1" },
  { label: "Variant 2", value: "option2" },
  { label: "Variant 3", value: "option3" },
];

const FilterSelect: React.FC = () => {
  const [selected, setSelected] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  return (
    <div className="  p-4">
      <label htmlFor="filter" className="mb-2 block font-medium text-gray-700">
        Filter bo'yicha tanlang:
      </label>
      <select
        id="filter"
        value={selected}
        onChange={handleChange}
        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <div className="mt-4">
        <p>
          Tanlangan filter: <strong>{selected || "Hammasi"}</strong>
        </p>
      </div>
    </div>
  );
};

export default FilterSelect;
