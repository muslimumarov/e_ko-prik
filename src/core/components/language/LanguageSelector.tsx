import { useTranslation } from "react-i18next";
import { Dropdown } from "flowbite-react";
import { LANGUAGES } from "../../constants/language.constans.ts";
import { Language } from "../enums/Language.ts";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <Dropdown
      label={" "}
      placement="bottom-end"
      inline
      renderTrigger={() => (
        <img
          src={`/images/${i18n.language}.png`}
          alt={""}
          width={20}
          height={20}
        />
      )}
    >
      {LANGUAGES.map((lang) => (
        <Dropdown.Item
          className="relative z-[999999999999] dark:bg-blue-950"
          key={lang.value}
          onClick={() => i18n.changeLanguage(lang.value as Language)}
        >
          {lang.label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default LanguageSelector;
