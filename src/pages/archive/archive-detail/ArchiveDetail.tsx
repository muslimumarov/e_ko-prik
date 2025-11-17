import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../core/hooks/apiUrl";
import { BridgeData } from "../../../core/interfaces/interfaces.ts";
import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CardCaption } from "../../../core/components/card";

const ArchiveDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [bridge, setBridge] = useState<BridgeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBridgeDetails = async () => {
      try {
        const response = await api.get(`/bridges/${id}`);
        setBridge(response.data);
      } catch (err) {
        setError(t("Bridge maʼlumotlarini yuklashda xatolik yuz berdi"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBridgeDetails();
  }, [id, t]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
        />
      </div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 text-center text-red-500"
      >
        {error}
      </motion.div>
    );

  if (!bridge)
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="p-4 text-center"
      >
        {t("Ko‘prik topilmadi")}
      </motion.div>
    );

  return (
    <div className="relative min-h-screen">
      {bridge.images.length > 0 && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <img
            src={bridge.images[0].image}
            alt={t("Orqafon")}
            className="size-full object-cover opacity-20 blur-xl"
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container relative mx-auto h-auto px-4 py-6"
      >
        <motion.div className="relative top-24 mb-24 overflow-hidden rounded-lg bg-white bg-opacity-90 shadow-xl backdrop-blur-sm">
          <div className="border-b bg-amber-50 bg-gradient-to-r px-6 py-4 dark:bg-blue-950">
            <div className="flex justify-between">
              <motion.h1
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-bold text-gray-800 dark:text-white mobil330:text-[18px] sm:text-2xl"
              >
                {bridge.name}
              </motion.h1>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  onClick={() => navigate(-1)}
                  className="sm:text-md mb-6 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-600 px-4 py-2 font-semibold text-black transition-all duration-200 dark:text-white mobil330:text-[12px]"
                >
                  <ArrowLeft size={16} />
                  {t("Ortga")}
                </span>
              </motion.div>
            </div>
            <div className="mt-2 flex items-center text-gray-600 dark:text-white">
              <motion.span whileHover={{ scale: 1.05 }} className="mr-4">
                <span className="font-bold">{t("Hudud")}:</span>{" "}
                {bridge.region?.name}
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }}>
                <span className="font-bold">{t("Tuman")}:</span>{" "}
                {bridge.district?.name}
              </motion.span>
            </div>
          </div>

          <div className="bg-amber-50 bg-gradient-to-r p-6 dark:bg-blue-950">
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {t("Asosiy ma'lumotlar")}
                </h2>
                <div className="space-y-2 dark:text-gray-200">
                  {[
                    { label: t("Holati"), value: bridge.holat },
                    { label: t("Buyurtmachi"), value: bridge.buyrutmachi },
                    { label: t("Pudratchi"), value: bridge.pudratchi },
                    { label: t("Loyihachi"), value: bridge.loyihachi },
                  ].map((item, index) => (
                    <motion.p
                      key={index}
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <span className="font-medium dark:text-gray-200">
                        {item.label}:
                      </span>{" "}
                      {item.value || "N/A"}
                    </motion.p>
                  ))}
                </div>
                {bridge.boshlash_vaqti && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-6"
                  >
                    <span className="block text-lg font-medium  dark:text-gray-200">
                      {t("constructionStartDate")}
                    </span>
                    <span className="whitespace-pre-line font-bold  dark:text-gray-200">
                      {bridge.boshlash_vaqti}
                    </span>
                    <span className="block text-lg font-medium  dark:text-gray-200">
                      {t("tugallangan")}
                    </span>
                    <span className="whitespace-pre-line font-bold     dark:text-gray-200">
                      {bridge.tugash_vaqti}
                    </span>
                  </motion.div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="mb-3 text-lg font-semibold  dark:text-gray-200">
                  {t("Loyha Fayllarini Yuklash")}
                </h2>

                {bridge.asos_hujjat || bridge.vaqtinchalik_yol_sxemasi ? (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {bridge.asos_hujjat && (
                      <a
                        href={bridge.asos_hujjat}
                        className="flex items-center gap-2 text-black underline dark:text-amber-200"
                      >
                        <Download size={18} /> {t("Asosiy Hujjat")}
                      </a>
                    )}
                    {bridge.loyiha && (
                      <a
                        href={bridge.loyiha}
                        className="flex items-center gap-2 text-black underline dark:text-amber-200"
                      >
                        <Download size={18} /> {t("Loyiha")}
                      </a>
                    )}
                    {bridge.vaqtinchalik_yol_sxemasi && (
                      <a
                        href={bridge.vaqtinchalik_yol_sxemasi}
                        className="flex items-center gap-2 text-black underline dark:text-amber-200"
                      >
                        <Download size={18} /> {t("Vaqtinchalik Yo‘l Sxemasi")}
                      </a>
                    )}
                  </motion.div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t("Hujjat mavjud emas")}
                  </p>
                )}
              </motion.div>
            </div>

            {bridge.texnik_parametrlari && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              >
                <h2 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {t("Texnik parametrlar")}
                </h2>
                <p className="whitespace-pre-line font-bold text-gray-700 dark:text-gray-200">
                  {bridge.texnik_parametrlari}
                </p>
              </motion.div>
            )}

            {bridge.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {t("Rasmlar")}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {bridge.images.map((img, index) => (
                    <motion.div
                      key={img.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="overflow-hidden rounded-lg border shadow-md dark:text-gray-200"
                    >
                      <CardCaption src={img.image} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArchiveDetail;
