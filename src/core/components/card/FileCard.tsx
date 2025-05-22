import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FileCardProps {
  src: string;
}

const FileCard = ({ src }: FileCardProps) => {
  const { t } = useTranslation();

  return (
    <a
      href={`/${src}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center  justify-center rounded-lg border border-gray-300/50 p-2 shadow-sm dark:text-white"
    >
      <Download />
      <span>{t("uploadDocument")}</span>
    </a>
  );
};

export default FileCard;
