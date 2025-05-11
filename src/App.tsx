import React from "react";
import Navbar from "./layouts/base/navbar/Navbar.tsx";
import Main from "./layouts/base/main/Main.tsx";
import { BrowserRouter } from "react-router-dom";
const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <div className="relative min-h-screen overflow-hidden ">
                    <img
                        src="/images/IMG_2016.JPG"
                        alt="img"
                        className="home-video"
                    />
                    <Navbar />
                    <Main />
                </div>
            </BrowserRouter>
        </>
    );
};

export default App;
