import { useEffect, useState } from "react";
import { Construction, ClipboardList, CheckCircle } from "lucide-react";
import { holatStatistica } from "../interfaceslar/map.interfaces.ts";
import { getBridgeHolat } from "../map.api/api.ts";
import { useTranslation } from "react-i18next"; // qo‘shildi

const StatisticPanel = () => {
  const [stats, setStats] = useState<holatStatistica | null>(null);
  const { t } = useTranslation(); // qo‘shildi

  useEffect(() => {
    getBridgeHolat()
      .then((res) => setStats(res as holatStatistica))
      .catch(console.error);
  }, []);

  if (!stats) return null;

  return (
    <div className="absolute bottom-36 right-8 z-[999] grid grid-cols-1 gap-3 rounded-2xl bg-white/80 p-4 text-gray-800 shadow-lg backdrop-blur-md dark:bg-blue-950/80 dark:text-amber-100">
      <div className="flex items-center gap-2">
        <ClipboardList className="text-red-500" />
        <span>
          {t("planned")}: {stats.Rejalashtirilgan}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Construction className="text-yellow-600" />
        <span>
          {t("in_progress")}: {stats.Jarayonda}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="text-green-600" />
        <span>
          {t("completed")}: {stats.Tugallangan}
        </span>
      </div>
    </div>
  );
};

export default StatisticPanel;
