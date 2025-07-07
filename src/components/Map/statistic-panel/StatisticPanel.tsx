import { useEffect, useState } from "react";
import { Construction, ClipboardList, CheckCircle } from "lucide-react";
import { holatStatistica } from "../../../core/interfaces/interfaces.ts";
import { getBridgeHolat } from "../../../core/hooks/api.ts";
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
    <div
      className="absolute z-[999] grid grid-cols-1 gap-3 rounded-2xl border border-amber-100 p-4
    text-gray-800 shadow-lg backdrop-blur dark:bg-blue-950/80 dark:text-amber-100 mobil330:bottom-24 mobil330:right-8  md:bottom-40 md:right-[99px]"
    >
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
