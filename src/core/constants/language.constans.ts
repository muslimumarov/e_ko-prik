import { SelectInterface } from "../interfaces/select.interfaces.ts";
import { Language } from "../components/enums/Language.ts";

export const LANGUAGES: SelectInterface[] = [
  {
    value: Language.UZ,
    label: "O'zbekcha",
  },
  {
    value: Language.RU,
    label: "Русский",
  },
  {
    value: Language.EN,
    label: "English",
  },
];
