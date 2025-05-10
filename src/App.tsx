import React from "react";
import Navbar from "./layouts/base/navbar/Navbar.tsx";
import Main from "./pages/main/Main.tsx";

const App: React.FC = () => {
    return (
        <>
            <div className="relative min-h-screen overflow-hidden ">
                {/* Background image */}
                <img
                    src="/images/IMG_2016.JPG"
                    alt="img"
                    className="home-video"
                />
                <Navbar />
                <Main />
            </div>
        </>
    );
};

export default App;
