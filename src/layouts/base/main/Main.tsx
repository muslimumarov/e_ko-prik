import React from "react";
import {useTranslation} from "react-i18next";
import SearchInput from "../../../components/searchInput/SearchInput.tsx";
import {Link} from "react-router-dom";

const Main: React.FC = () => {
    const {t} = useTranslation();
    const boxes = [
        {title: 'Obyektlar', path: '/object'},
        {title: 'Monitoring', path: '/monitoring'},
        {title: 'Interaktiv xarita', path: '/map'},
        {title: 'Elektron reyting', path: '/reyting'},
        {title: 'Labaratoriya', path: '/laboratory'},
        {title: 'Loyhalar', path: '/project'},
    ];
    return (
        <main className="container relative z-40 mx-auto mt-40 px-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="max-w-2xl">
                    <h1 className="font-bold text-white dark:text-gray-300 mobil330:mb-3 mobil330:text-3xl sm:text-4xl lg:text-5xl">
                        {t("E-Bridge")}
                    </h1>
                </div>
                <div className="max-w-2xl">
                    <SearchInput />
                </div>
            </div>

            <div className="mt-20 grid bg-[url('/your-bg.jpg')] bg-cover bg-center">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {boxes.map((box, index) => (
                        <Link
                            key={index}
                            to={box.path}
                            className="flex h-52 items-center justify-center rounded-xl bg-white/10 p-6 text-center text-xl font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 sm:w-[290px] md:w-[390px] lg:w-[350px] xl:w-[400px]"
                        >
                            {box.title}
                        </Link>
                    ))}
                </div>
            </div>

        </main>
    );
};

export default Main;
