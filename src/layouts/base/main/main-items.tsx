import { useTranslation } from "react-i18next";

export const useBoxes = () => {
  const { t } = useTranslation();

  return [
    {
      title: t("interactiveMap"),
      description: t("xarita"),
      path: "/map/interactiveMap",
      img: "images/xaritaUzb.png",
      isPublic: true,
    },
    {
      title: t("monitoring"),
      description: t("monitor"),
      path: "http://90.156.199.181:8088/",
      img: "/images/monitoring.4eab7f5f.png",
      isPublic: false,
      isExternal: true,
    },
    {
      title: t("E-Xodim"),
      description: t("xodim"),
      path: "https://hrm.kuprikqurilish.uz/",
      img: "images/recruitment.png",
      isExternal: true,
    },
    {
      title: t("archive"),
      description: t("arxiv"),
      path: "/archive",
      img: "/images/arxiv2.png",
      isPublic: true,
    },
    {
      title: t("E-Ombor"),
      description: t("ombor"),
      path: "/warehouse",
      img: "/images/ombor.png",
      isPublic: false,
    },
    {
      title: t("surveillanceCameras"),
      description: t("camera"),
      path: "/camera",
      img: "/images/camera2.png",
      isPublic: false,
    },
  ];
};
