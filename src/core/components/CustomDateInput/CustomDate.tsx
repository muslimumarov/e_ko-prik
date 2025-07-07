import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";

interface CustomDateProps {
  value?: string;
  title?: string;
  placeholder?: string;
  onSelectedDateChanged: (date: Date | null, formatted: string) => void;
}

export const CustomDate: React.FC<CustomDateProps> = ({
  value,
  title,
  placeholder,
  onSelectedDateChanged,
}) => {
  const parsedDate = value ? parseISO(value) : null;
  const dateRef = useRef<any>(null);

  const handleChange = (date: Date | null) => {
    const formatted = date ? format(date, "yyyy-MM-dd") : "";
    onSelectedDateChanged(date, formatted);
  };

  return (
    <div className="flex flex-col gap-1">
      {title && (
        <label className="text-sm font-semibold text-gray-700">{title}</label>
      )}

      <DatePicker
        selected={parsedDate}
        onChange={handleChange}
        ref={dateRef}
        dateFormat="dd.MM.yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        customInput={
          <div
            onClick={() => dateRef.current.setOpen(true)}
            className="flex items-center justify-between gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-md transition hover:shadow-lg active:ring-2 active:ring-orange-500"
          >
            <span className={parsedDate ? "text-gray-900" : "text-gray-400"}>
              {parsedDate
                ? format(parsedDate, "dd.MM.yyyy")
                : placeholder || "Sanani tanlang"}
            </span>
            <FaCalendarAlt className="text-orange-500" />
          </div>
        }
      />
    </div>
  );
};
