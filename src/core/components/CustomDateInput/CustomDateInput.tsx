// components/CustomDateInput.tsx
import React from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const CustomDateInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      {/* Calendar icon */}
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Date input */}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-300 bg-white/70 p-2 pl-10 text-sm text-gray-700 shadow-sm backdrop-blur-md transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-slate-800 dark:text-white"
      />
    </div>
  );
};

export default CustomDateInput;
