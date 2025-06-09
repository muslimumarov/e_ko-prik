import { useMemo, useState } from "react";
import { Label, TextInput, TextInputProps } from "flowbite-react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { InputProps } from "../../interfaces/input-props.interface.ts";

export type MyInputProps<T extends FieldValues> = InputProps<T> &
  TextInputProps;

const MyInput = <T extends FieldValues>({
  register,
  error,
  name,
  rules = {},
  helperText,
  required,
  label,
  type = "text",
  ...props
}: MyInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const rightIcon = useMemo(
    () =>
      isPassword
        ? () => (
            <PasswordEyeIcon
              showPassword={showPassword}
              isPassword={isPassword}
              onChangeVisibility={setShowPassword}
            />
          )
        : props.rightIcon,
    [isPassword, showPassword, props.rightIcon],
  );

  const theme = {
    field: {
      input: {
        base: "block w-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent",
      },
    },
  };

  return (
    <Label className={"block"} color={error ? "failure" : "default"}>
      {label && (
        <div className={"mb-2"}>
          {label} {required && <span className={"text-red-600"}>*</span>}
        </div>
      )}
      {name && register ? (
        <div className="relative">
          <TextInput
            {...props}
            {...register(name, rules)}
            color={error ? "failure" : "default"}
            type={isPassword && showPassword ? "text" : type}
            helperText={error || helperText}
            rightIcon={rightIcon}
            theme={theme}
          />
        </div>
      ) : (
        <TextInput {...props} rightIcon={rightIcon} theme={theme} />
      )}
    </Label>
  );
};

export default MyInput;

interface PasswordEyeIconProps {
  isPassword?: boolean;
  showPassword?: boolean;
  onChangeVisibility?: (value: boolean) => void;
}

const PasswordEyeIcon = ({
  isPassword,
  showPassword,
  onChangeVisibility,
}: PasswordEyeIconProps) => {
  return isPassword ? (
    <div
      className={"pointer-events-auto cursor-pointer"}
      onClick={() => {
        if (onChangeVisibility) {
          onChangeVisibility(!showPassword);
        }
      }}
    >
      {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
    </div>
  ) : undefined;
};
