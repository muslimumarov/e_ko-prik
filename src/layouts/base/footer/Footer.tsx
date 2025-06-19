import { FaFacebook, FaTelegram, FaInstagram } from "react-icons/fa";
import { Trans, useTranslation } from "react-i18next";
import { PhoneIcon, MapPinIcon } from "lucide-react";
import logo from "../../../../public/images/Logo-Gold.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className=" relative mx-auto w-full  overflow-hidden rounded bg-gradient-to-b from-[#003366] to-[#002952] pb-8 pt-16 text-white dark:from-[#111827] dark:to-[#0f172a] dark:text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container mx-auto w-full max-w-[94%] ">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Logo and Address */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6 flex flex-col items-center gap-3 md:flex-row md:items-center">
              <a href={"/"} className="flex gap-3">
                <div className="shrink-0 transition-transform hover:scale-105">
                  <img
                    src={logo || "/placeholder.svg"}
                    alt="logo"
                    className="w-[125px] object-cover"
                  />
                </div>
                <div className="flex w-[2px] flex-col overflow-hidden rounded-full shadow">
                  <div className="w-full flex-1 bg-blue-500" />
                  <div className="w-full flex-1 border-y-4 border-red-600 bg-white" />
                  <div className="w-full flex-1 bg-green-600" />
                </div>
                <div className="font-montserrat flex flex-col justify-center font-semibold uppercase text-white sm:font-bold">
                  <Trans>
                    <h2
                      className="animate-shimmer bg-clip-text text-[0.875rem] text-transparent sm:text-[1.125rem] lg:text-[1.5rem]"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #3b82f6 0%, rgb(31,81,143) 25%, rgb(16,82,158) 50%, #60a5fa 75%, rgb(5,52,128) 100%)",
                        backgroundSize: "200% auto",
                      }}
                    >
                      KO'PRIKQURILISH
                    </h2>
                    <h3 className="text-[0.875rem] dark:text-white lg:text-[1.25rem]">
                      {t("Aksiyadorlik")}
                    </h3>
                  </Trans>
                </div>
              </a>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-blue-900/30 px-3 py-2">
              <MapPinIcon size={16} className="mt-0.5 shrink-0 text-blue-300" />
              <a
                href={"https://maps.app.goo.gl/H4NjgzvFfJoxDh8x6"}
                target="_blank"
              >
                {t("Manzilimiz")}
              </a>
            </div>
          </div>

          {/* Action Button and Contact + Socials */}
          <div className="mt-8 flex flex-col items-center md:mt-0 md:flex-row md:items-center md:gap-8">
            <div className="mt-6 text-center md:mt-0 md:text-right">
              {/* Phone */}
              <div className="mb-5 flex items-center gap-3 py-2">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-700/50 text-white shadow-inner">
                  <PhoneIcon strokeWidth={1.5} size={20} />
                </div>
                <div>
                  <span className="block text-sm font-bold uppercase text-blue-300">
                    {t("Ishonch telefoni")}
                  </span>
                  <a
                    href="tel:+99871-203-26-26"
                    className="text-lg font-semibold transition-colors hover:text-blue-300"
                  >
                    71-203-26-26
                  </a>
                </div>
              </div>

              {/* Social Media Icons */}
              <div>
                <p className="mb-3 text-center text-sm font-medium uppercase tracking-wider text-blue-300">
                  {t("Ijtimoiy tarmoqlar")}
                </p>
                <div className="flex justify-center gap-5">
                  <a
                    href="https://t.me/kuprikqurilish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-blue-700/50 text-white transition-transform hover:scale-110 hover:shadow-md"
                  >
                    <FaTelegram className="text-xl" />
                  </a>
                  <a
                    href="https://www.facebook.com/csec.uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-blue-700/50 text-white transition-transform hover:scale-110 hover:shadow-md"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a
                    href="https://www.instagram.com/kuprikqurilish/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-blue-700/50 text-white transition-transform hover:scale-110 hover:shadow-md"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
