import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from "axios";

interface FilterDropdownProps {
  onChange: (holat: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [importance, setImportance] = useState<string>("");

  const handleSelect = async (value: string) => {
    setImportance(value);
    onChange(value);
    setOpen(false); // tanlangandan keyin yopilsin

    try {
      const response = await axios.get(
        "http://192.168.100.230:3000/api/bridge-region-holat-statistics/",
        {
          params: { holat: value },
        },
      );
      response.data;
    } catch (error) {
      console.error("❌ Xatolik:", error);
    }
  };

  return (
    <div className="fixed left-14 top-[90px] z-[999999] text-sm sm:left-auto sm:right-[150px] sm:top-[90px]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        <FiFilter />
        <span className="font-medium  sm:inline">Филтрлаш</span>
        {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      <div
        className={`absolute ${
          open
            ? "mt-3 scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        } w-[260px] transform space-y-5 rounded-xl bg-white p-5 shadow-2xl transition-all duration-300 sm:w-[280px] ${
          // mobil chap tomonga, sm dan keyin o'ng tomonga
          open ? "left-0 sm:right-0" : "left-0 sm:right-0"
        }`}
      >
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700 sm:text-base">
            Ҳолати бўйича танланг
          </p>
          <div className="space-y-2">
            {["all", "Jarayonda", "Rejalashtirilgan", "Tugallangan"].map(
              (value) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="importance"
                    value={value}
                    checked={importance === value}
                    onChange={() => handleSelect(value)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-700 sm:text-base">
                    {value}
                  </span>
                </label>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
