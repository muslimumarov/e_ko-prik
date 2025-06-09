import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { ReactNode } from "react";

export interface InputProps<T extends FieldValues> {
  register?: UseFormRegister<T>;
  control?: Control<T>;
  error?: string;
  name?: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
  label?: ReactNode;
}
