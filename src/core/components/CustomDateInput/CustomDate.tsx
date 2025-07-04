import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";

interface CustomDateProps {
  value?: string; // yyyy-mm-dd
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

  const handleChange = (date: Date | null) => {
    const formatted = date ? format(date, "yyyy-MM-dd") : "";
    onSelectedDateChanged(date, formatted);
  };

  return (
    <div className="flex flex-col">
      {title && <label className="mb-1 text-sm font-medium">{title}</label>}
      <DatePicker
        selected={parsedDate}
        onChange={handleChange}
        dateFormat="dd.MM.yyyy"
        placeholderText={placeholder || "Sanani tanlang"}
        className="rounded-lg border border-gray-300 bg-white/60 p-2 text-sm shadow-sm backdrop-blur-md transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    </div>
  );
};
