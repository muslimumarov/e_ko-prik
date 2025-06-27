import { useTranslation } from "react-i18next";

const TestLoader = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed  bottom-5 right-5 z-[9999] flex animate-bounce items-center gap-2 rounded-full px-4 py-2 text-pink-500 shadow-lg backdrop-blur dark:text-white">
      <div className="size-4 animate-spin rounded-full border-2 border-red-700  border-t-transparent"></div>
      <span className="text-sm font-medium">{t("test")}</span>
    </div>
  );
};

export default TestLoader;
