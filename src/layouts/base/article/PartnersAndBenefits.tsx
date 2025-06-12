import { useTranslation } from "react-i18next";
import GpsPromo from "./Gps.tsx";
import xarita from "../../../../public/images/xaritaUzb.png";
import file from "../../../../public/images/file.png";
import nazorat from "../../../../public/images/nazorat.png";
import statistic from "../../../../public/images/statjs.png";
import arxiv from "../../../../public/images/archive.png";
import transport from "../../../../public/images/transport.jpeg";
import qurulish from "../../../../public/images/qurulish.jpg";
import avtomobil from "../../../../public/images/avtomobily.jpg";
import gerb from "../../../../public/images/home-gerb.0379468a.svg";
const PartnersAndBenefits = () => {
  const { t } = useTranslation();

  const partners = [
    {
      name: t("O'zbekiston respublikasi transport vazirligi"),
      logo: transport,
      url: "https://www.mintrans.uz/",
    },
    {
      name: t(
        "O'zbekiston Respublikasi Qurilish va uy-joy mmunal xo'jaligi vazirligi",
      ),
      logo: qurulish,
      url: "https://mc.uz/oz",
    },
    {
      name: t("Avtomobil yo‘llari qo‘mitasi"),
      logo: avtomobil,
      url: "https://www.uzavtoyul.uz/uz/",
    },
    {
      name: t("Viloyat va Tuman hokimliklari"),
      logo: gerb,
      url: "https://www.solarteknik.com",
    },
  ];

  const advantages = [
    {
      title: t("Ma'lumotlar yig'ish"),
      description: t(
        "Obyektlar qurilishida ishtirok etayotgan barcha pudratchi va yordamchi pudratchilar haqida maʼlumotlarni yigʻish, bajarilgan ish hajmlari asosida toʻlovlarni oʻz vaqtida amalga oshirish",
      ),
      icon: file,
    },
    {
      title: t("Qurilishni nazorat qilish"),
      description: t(
        "Tizim qurilish jarayonini nazorat va monitoring qilishda ularni roʻyxatga olish, hududiy nazorat inspeksiyalari tomonidan amalga oshirilayotgan nazorat tekshiruvlarini qayd etish",
      ),
      icon: nazorat,
    },
    {
      title: t("Statistika"),
      description: t("Foydalanuvchilar uchun qulay va intuitiv interfeys"),
      icon: statistic,
    },
    {
      title: t("Arxiv malumotlari"),
      description: t("Har qanday vaqtda texnik yordam ko'rsatamiz"),
      icon: arxiv,
    },
  ];

  return (
    <section className=" bg-orange-200 px-4  py-12 dark:bg-blue-950">
      <div className={"container mx-auto"}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <GpsPromo />
          <img src={xarita} alt="" />
        </div>
        <div className="mt-16">
          <h2 className="mb-10  text-4xl font-bold text-black">
            {t("Tizim Afzalliklari")}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="flex rounded-xl  bg-white/10 p-6 text-center text-white transition hover:shadow-lg"
              >
                <div className="mr-14">
                  <h3 className="mb-3 text-left text-xl font-semibold text-red-500">
                    {advantage.title}
                  </h3>
                  <p className="text-left text-black">
                    {advantage.description}
                  </p>
                </div>
                <img src={advantage.icon} alt="icon" className="h-28 w-32" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-xl bg-gray-500 bg-gradient-to-r p-8 dark:bg-blue-950">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            {t("Statistika")}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-4 text-left">{t("Tugallangan")}</th>
                  <th className="p-4 text-left">{t("Faol  ")}</th>
                  <th className="p-4 text-left">{t("rejalashtirilgan")}</th>
                  <th className="p-4 text-left">{t("umumiy")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4">53.92 trln</td>
                  <td className="p-4">771.73 mln</td>
                  <td className="p-4">51.24 trln</td>
                  <td className="p-4">2.68 trln</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-20">
          <h2 className="my-16 text-center text-3xl font-bold text-black">
            {t("Bizning Hamkorlarimiz")}
          </h2>
          <div className="grid grid-cols-1 gap-8 rounded-xl border bg-orange-200  sm:grid-cols-2">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex  items-center justify-between rounded-lg border-black bg-white/10 p-6 transition hover:bg-white/20"
              >
                <p className="mt-4 text-center text-black dark:text-white">
                  {partner.name}
                </p>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-24  w-32 rounded object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersAndBenefits;
