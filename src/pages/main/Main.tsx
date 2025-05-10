import React from "react";
import {useTranslation} from "react-i18next";
import SearchInput from "../../components/searchInput/SearchInput.tsx";

const Main: React.FC = () => {
    const {t} = useTranslation();
    return (
        <main className="container relative z-50 mx-auto mt-40 px-4">
            <div className="flex flex-wrap  items-center justify-between gap-2">
                <div className=" max-w-2xl">
                    <h1 className="font-bold text-white dark:text-gray-300 mobil330:mb-3 mobil330:text-3xl sm:text-4xl lg:text-5xl">{t("E-Bridge")}</h1>
                </div>
                <div className="max-w-2xl">
                    <SearchInput/>
                </div>
            </div>

        </main>
    )
}
export default Main