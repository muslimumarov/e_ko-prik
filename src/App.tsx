import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./layouts/base/navbar/Navbar.tsx";
import Route from "./router.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="relative min-h-screen overflow-hidden">
                <img
                    src="/images/IMG_2016.JPG"
                    alt="img"
                    className="home-video"
                />
                <Navbar /> {/* Har doim ko‘rinadi */}
                <Route />  {/* Sahifalarni boshqaradi */}
            </div>
        </BrowserRouter>
    );
};

export default App;
