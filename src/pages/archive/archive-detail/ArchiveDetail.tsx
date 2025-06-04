import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../core/hooks/apiUrl";
import { BridgeData } from "../../../core/interfaces/interfaces.ts";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";

const ArchiveDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [bridge, setBridge] = useState<BridgeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

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
    <div className="relative  min-h-screen">
      {bridge.images.length > 0 && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <img
            src={bridge.images[0].image}
            alt={t("Orqa fon")}
            className="size-full object-cover opacity-20 blur-xl"
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container  relative mx-auto h-auto px-4 py-6"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className=" relative top-24 mb-24 overflow-hidden  rounded-lg bg-white bg-opacity-90 shadow-xl backdrop-blur-sm"
        >
          <div className="border-b bg-gradient-to-r from-blue-50 to-gray-50 px-6 py-4 dark:from-blue-900 dark:to-gray-900">
            <motion.h1
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-800 dark:text-white"
            >
              {bridge.name}
            </motion.h1>
            <div className="mt-2 flex items-center  text-gray-600 dark:text-white">
              <motion.span whileHover={{ scale: 1.05 }} className="mr-4">
                <span className="font-bold">{t("Region")}:</span>{" "}
                {bridge.region?.name}
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }}>
                <span className="font-bold">{t("Tuman")}:</span>{" "}
                {bridge.district?.name}
              </motion.span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 dark:from-blue-900 dark:to-gray-900">
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {t("Asosiy Maʼlumotlar")}
                </h2>
                <div className="space-y-2 dark:text-gray-200">
                  {[
                    { label: t("Holat"), value: bridge.holat },
                    { label: t("Buyurtmachi"), value: bridge.buyrutmachi },
                    { label: t("Loyiha"), value: bridge.loyiha },
                    { label: t("Pudratchi"), value: bridge.pudratchi },
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {t("Joylashuv")}
                </h2>
                {bridge.locations.length > 0 ? (
                  bridge.locations.map((location, index) => (
                    <motion.div
                      key={location.id}
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <p className={"dark:text-gray-200"}>
                        <span className="font-medium dark:text-gray-200">
                          {t("Nomi")}:
                        </span>{" "}
                        {location.name || "N/A"}
                      </p>
                      <p className={"dark:text-gray-200"}>
                        <span className="font-medium dark:text-gray-200">
                          {t("Kоordinatalar")}:
                        </span>{" "}
                        {location.latitude}, {location.longitude}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <p>{t("Joylashuv maʼlumotlari mavjud emas")}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {t("Loyiha fayllarini yuklash")}
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
                        className="flex items-center gap-2 text-blue-600 underline dark:text-amber-200"
                      >
                        <Download size={18} /> {t("Asosiy hujjat")}
                      </a>
                    )}

                    {bridge.vaqtinchalik_yol_sxemasi && (
                      <a
                        href={bridge.vaqtinchalik_yol_sxemasi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 underline dark:text-amber-200"
                      >
                        <Download size={18} /> {t("Vaqtinchalik yo‘l sxemasi")}
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
                <h2 className="mb-3 text-lg font-semibold text-gray-700">
                  {t("Texnik parametrlar")}
                </h2>
                <p className="whitespace-pre-line">
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
                      <img
                        src={img.image}
                        alt={`${t("Ko‘prik")} ${bridge.name}`}
                        className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105 "
                      />
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
