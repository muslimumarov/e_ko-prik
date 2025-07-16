// SearchInput.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Sahifa yangilanmasin
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="size-4 text-amber-200 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-md block w-80 rounded-lg border border-gray-300 bg-white/10 p-4 ps-10 text-sm text-black
            placeholder:text-black focus:border-blue-500 focus:ring-amber-200 dark:border-gray-600 dark:bg-blue-950 dark:text-white dark:placeholder:text-white
            dark:focus:ring-blue-50 md:w-96"
          placeholder={t("search")}
          required
        />
        <button
          type="submit"
          className="absolute bottom-2.5 end-2.5 rounded-lg bg-cyan-700 px-4 py-2
            text-sm font-medium text-white hover:scale-105 hover:bg-cyan-800 focus:outline-none focus:ring-0
            dark:bg-cyan-600 dark:hover:bg-cyan-700"
        >
          {t("search")}
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
