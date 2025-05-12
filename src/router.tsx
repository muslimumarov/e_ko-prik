import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import Monitoring from "./pages/monitoring/Monitoring.tsx";
import InteraktivMap from "./pages/map/InteraktivMap.tsx";
import Project from "./pages/project/Project.tsx";
import Object from "./pages/obyekt/Object.tsx";
import { MyMapPage } from "./components/Map/map.tsx";
import Main from "./layouts/base/main/Main.tsx";
import Labaratory from "./pages/labaratory/Labaratory.tsx"; // bu yerga qo‘shamiz

const Reyting = lazy(() => import("./pages/reyting/Reyting.tsx"));

function Route() {
    const routes = [
        {
            path: "/",
            element: <Main /> // 👈 Faqat bosh sahifada ko‘rinadi
        },
        {
            path: "object",
            element: <Object />,
        },
        {
            path: "monitoring",
            element: <Monitoring />,
        },
        {
            path: "map",
            element: <InteraktivMap />,
            children: [
                {
                    path: "mymap",
                    element: <MyMapPage />,
                },
            ],
        },
        {
            path: "reyting",
            element: <Reyting />,
        },
        {
            path: "laboratory",
            element: <Labaratory     />,
        },
        {
            path: "project",
            element: <Project />,
        },
    ];
    return useRoutes(routes);
}

export default Route;
