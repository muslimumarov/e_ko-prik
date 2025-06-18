import gpsImg from "../../../../public/images/location-sign-svgrepo-com.svg";
import { motion } from "framer-motion";
import { t } from "i18next";
import useAuthStore from "../../../store/useAuthStore.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LockKeyhole } from "lucide-react";

const GpsPromo = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const box = {
    isPublic: false, // bu yerda ruxsat kerakmi-yo‘qmi belgilaysan
  };

  const handleClick = () => {
    if (!box.isPublic && !isAuthenticated) {
      toast.warning("Sizga ruxsat yo‘q");
      navigate("/login");
      return;
    }
    window.location.href = "https://gps.kuprikqurilish.uz";
  };

  const isLocked = !isAuthenticated && !box.isPublic;

  return (
    <motion.div
      onClick={handleClick}
      className="relative block h-full w-full max-w-[400px] overflow-hidden rounded-2xl p-6 shadow-lg sm:h-[308px]"
    >
      {isLocked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-black/60 text-white opacity-0 transition-opacity hover:opacity-100">
          <LockKeyhole size={40} color="red" className="mb-2" />
          <p className="text-sm">Sizga ruxsat yo‘q</p>
        </div>
      )}
      {/* Qolgan animatsion qismlar o‘zgarishsiz */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-900/50"
        initial={{ opacity: 0.8 }}
        whileHover={{
          opacity: 1,
          background: [
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.2) 100%)",
            "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.3) 100%)",
          ],
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        whileHover={{
          borderColor: "rgba(99, 102, 241, 0.3)",
          boxShadow: "0 0 20px rgba(99, 102, 241, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.img
        src={gpsImg}
        alt="GPS"
        className="absolute left-6 top-6 z-10 h-[110px] w-[120px] rounded-full"
        initial={{ y: 0 }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.1,
          rotate: [0, 10, -10, 0],
          transition: { duration: 0.8 },
        }}
      />
      <motion.div
        className="absolute left-5 top-5 h-[90px] w-[90px] rounded-full bg-indigo-400/20 blur-md"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="relative z-10 mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="bg-gradient-to-r from-black to-blue-700 bg-clip-text text-2xl font-bold text-transparent dark:text-white">
          {t("title")}
        </h3>
        <motion.p
          className="mt-4 text-sm dark:text-white"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
        >
          {t("description")}
        </motion.p>
        <motion.div
          className="mt-8 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm"
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            scale: 1.05,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-medium text-black dark:text-white">
            {t("button")}
          </span>
          <motion.span
            className="ml-2 inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: Math.random() * 10 + 5 + "px",
            height: Math.random() * 10 + 5 + "px",
            top: Math.random() * 250 + "px",
            left: Math.random() * 350 + "px",
          }}
          animate={{
            y: [0, Math.random() * 20 - 10],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </motion.div>
  );
};

export default GpsPromo;
