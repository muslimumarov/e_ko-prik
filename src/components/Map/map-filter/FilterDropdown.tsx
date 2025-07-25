import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface FilterDropdownProps {
  onChange: (holat: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [importance, setImportance] = useState<string>("");
  const { t } = useTranslation();

  const handleSelect = async (value: string) => {
    setImportance(value);
    onChange(value);
    setOpen(false);

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

  const options = ["all", "Jarayonda", "Rejalashtirilgan", "Tugallangan"];

  return (
    <div className="fixed left-14 top-[90px] z-[999] text-sm sm:left-auto sm:right-[150px] sm:top-[90px]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-lg transition-all duration-200 hover:shadow-xl dark:bg-blue-950"
      >
        <FiFilter className={"dark:text-white"} />
        <span className="font-medium dark:text-white sm:inline">
          {t("filter")}
        </span>
        {open ? (
          <IoIosArrowUp className={"dark:text-white"} />
        ) : (
          <IoIosArrowDown className={"dark:text-white"} />
        )}
      </button>

      <div
        className={`absolute ${
          open
            ? "mt-3 scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        } w-[260px] transform space-y-5 rounded-xl bg-white p-5 shadow-2xl transition-all duration-300 dark:bg-blue-950 sm:w-[280px] ${
          open ? "left-0 sm:right-0" : "left-0 sm:right-0"
        }`}
      >
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-white sm:text-base">
            {t("selectByStatus")}
          </p>
          <div className="space-y-2">
            {options.map((value) => (
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
                <span className="text-sm text-gray-700 dark:text-white sm:text-base">
                  {t(`statuss.${value}`)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
