import { useTranslation } from "react-i18next";
import GpsPromo from "./Gps.tsx";
import xarita from "../../../../public/images/xaritaUzb.png";
import file from "../../../../public/images/xaritaUzb.png";
import nazorat from "../../../../public/images/monitoring.4eab7f5f.png";
import statistic from "../../../../public/images/recruitment.png";
import arxiv from "../../../../public/images/arxiv2.png";
import transport from "../../../../public/images/transport.jpeg";
import qurulish from "../../../../public/images/qurulish.jpg";
import avtomobil from "../../../../public/images/avtomobily.jpg";
import gerb from "../../../../public/images/home-gerb.0379468a.svg";
import gps from "../../../../public/images/location-sign-svgrepo-com.svg";
import eombor from "../../../../public/images/ombor.png";

import { useEffect, useState } from "react";
import { holatStatistica } from "../../../core/interfaces/interfaces.ts";
import { getBridgeHolat } from "../../../core/hooks/api.ts";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const Article = () => {
  const { t } = useTranslation();
  const [ref] = useInView({ triggerOnce: true });

  const partners = [
    {
      name: t("vazirligi_transport"),
      logo: transport,
      url: "https://www.mintrans.uz/",
    },
    {
      name: t("vazirligi_qurilish"),
      logo: qurulish,
      url: "https://mc.uz/oz",
    },
    {
      name: t("qomita_avtoyul"),
      logo: avtomobil,
      url: "https://www.uzavtoyul.uz/uz/",
    },
    {
      name: t("hokimliklar"),
      logo: gerb,
      url: "https://www.solarteknik.com",
    },
  ];
  const advantages = [
    {
      title: t("interactiveMap"),
      description: t("tizimdesc"),
      icon: file,
    },
    {
      title: t("monitoring"),
      description: t("Monitoringdesc"),
      icon: nazorat,
    },
    {
      title: t("E-Xodim"),
      description: t("xodimDesc"),
      icon: statistic,
    },
    {
      title: t("archive"),
      description: t("archiveDesc"),
      icon: arxiv,
    },
    {
      title: t("E-Ombor"),
      description: t("omborDesc"),
      icon: eombor,
    },
    {
      title: t("title"),
      description: t("gpsDsc"),
      icon: gps,
    },
  ];
  const [stats, setStats] = useState<holatStatistica | null>(null);
  useEffect(() => {
    getBridgeHolat()
      .then((res) => setStats(res as holatStatistica))
      .catch(console.error);
  }, []);
  if (!stats) return null;
  return (
    <section className=" bg-orange-200 px-4  py-12 dark:bg-blue-950">
      <div className={"container mx-auto"}>
        <h1 className="mb-9 text-center text-3xl font-bold dark:text-white sm:text-left">
          {t("title")}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <GpsPromo />
          <img src={xarita} alt="" />
        </div>
        <div className="mt-16">
          <h2 className="mb-10  text-center text-4xl font-bold text-black dark:text-white sm:text-left">
            {t("Tizim")}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white/10 p-6 shadow-md transition duration-300 hover:shadow-xl dark:bg-white/5"
              >
                <div className="flex h-full flex-col items-start justify-between">
                  <div className="mb-4 flex items-center gap-4">
                    <img
                      src={advantage.icon}
                      alt="icon"
                      className="h-14 w-14 rounded-full bg-white/20 p-2 shadow-md transition group-hover:scale-105 sm:h-16 sm:w-16"
                    />
                    <h3 className="text-xl font-semibold text-red-500 dark:text-red-400">
                      {advantage.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-black dark:text-white">
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-xl border bg-gradient-to-br from-[#003366] to-[#002952] p-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-white dark:text-gray-100">
            {t("statistics")}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white " ref={ref}>
              <thead>
                <tr className="grid grid-cols-1 gap-2 border-b border-white/20 md:grid-cols-4">
                  <th className="p-4 text-left text-lime-300 dark:text-lime-400">
                    {t("completed")}:{" "}
                    <CountUp end={stats?.Tugallangan ?? 0} duration={4.1} />
                  </th>
                  <th className="p-4 text-left text-emerald-400 dark:text-emerald-300">
                    {t("in_progress")}:{" "}
                    <CountUp end={stats?.Jarayonda ?? 0} duration={4.1} />
                  </th>
                  <th className="p-4 text-left text-rose-400 dark:text-rose-300">
                    {t("planned")}:{" "}
                    <CountUp
                      end={stats?.Rejalashtirilgan ?? 0}
                      duration={4.1}
                    />
                  </th>
                  <th className="p-4 text-left font-semibold text-cyan-300 drop-shadow-md dark:text-cyan-400">
                    {t("total")}:{" "}
                    <CountUp
                      end={
                        (stats?.Rejalashtirilgan ?? 0) +
                        (stats?.Jarayonda ?? 0) +
                        (stats?.Tugallangan ?? 0)
                      }
                      duration={4.3}
                    />
                  </th>
                </tr>
              </thead>
            </table>

            <p className="mt-5 text-center text-gray-200 dark:text-gray-300">
              {t("bridge_statistics")}
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="my-16 text-center text-3xl font-bold text-black dark:text-white sm:text-left">
            {t("Hamkor")}
          </h2>
          <div className="grid grid-cols-1 gap-8 rounded-xl    sm:grid-cols-2">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-transparent bg-gradient-to-br from-amber-800/10 to-yellow-900/10 p-6 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-xl dark:from-yellow-300/10 dark:to-yellow-100/5"
              >
                <p className="w-1/2 text-left text-sm font-semibold tracking-wide text-slate-900 group-hover:text-amber-600 dark:text-slate-100 dark:group-hover:text-yellow-400 lg:text-lg">
                  {partner.name}
                </p>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-20 w-28 rounded-md object-contain shadow-md"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article;
