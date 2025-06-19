import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface MyInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "password" | "email"; // boshqa turlar qo‘shish mumkin
  label?: string;
  required?: boolean;
  error?: string;
}

const MyInput: React.FC<MyInputProps> = ({
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  label,
  required = false,
  error,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-white"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={inputType}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />

        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default MyInput;
