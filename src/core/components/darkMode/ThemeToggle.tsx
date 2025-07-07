import { useThemeMode } from "flowbite-react";
import { MoonIcon, SunIcon } from "lucide-react";
import { ThemeMode } from "../enums/ThemeMode.ts";

const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <span className={"cursor-pointer "} onClick={() => toggleMode()}>
      {mode === ThemeMode.DARK ? (
        <SunIcon size={22} />
      ) : (
        <MoonIcon color={"white"} size={22} />
      )}
    </span>
  );
};

export default ThemeToggle;
