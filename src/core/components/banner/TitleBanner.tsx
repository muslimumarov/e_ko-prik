import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import { FaChevronRight } from "react-icons/fa";

interface BreadcrumbWithHeaderProps {
  title: string;
  basePath: string;
  activeChild?: { path: string; label: string };
}

const TitleBanner: React.FC<BreadcrumbWithHeaderProps> = ({
  title,
  basePath,
  activeChild,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative mt-[80px] overflow-hidden bg-gradient-to-b  text-white  backdrop-blur dark:bg-blue-950  dark:text-white">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent " />
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r " />

      <div className="container relative mx-auto">
        <div className="pt-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 px-5 text-sm mobil330:mb-11 sm:m-0">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center text-white transition-colors hover:text-blue-300 dark:text-blue-100 dark:hover:text-blue-200"
                >
                  <Home className="mr-1 size-4" />
                  <span>{t("Bosh sahifa")}</span>
                </button>
              </li>
              <li className="flex items-center">
                <FaChevronRight className="mx-1 size-4 text-white/60 dark:text-blue-300/70" />
                <button
                  onClick={() => navigate(basePath)}
                  className={`transition-colors ${
                    !activeChild
                      ? "font-medium text-white dark:text-blue-100"
                      : "text-white/80 hover:text-blue-300 dark:text-blue-200/90 dark:hover:text-blue-200"
                  }`}
                >
                  {title}
                </button>
              </li>
              {activeChild && (
                <li className="flex items-center">
                  <FaChevronRight className="mx-1 size-4 text-white/60 dark:text-blue-300/70" />
                  <span className="font-medium text-white dark:text-blue-100">
                    {activeChild.label}
                  </span>
                </li>
              )}
            </ol>
          </nav>
        </div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-[1.875rem] font-bold text-white dark:text-blue-50 dark:drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] md:text-[2.25rem]">
            {activeChild ? activeChild.label : title}
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default TitleBanner;
