import type {RouteObject} from "react-router-dom"
import {useRoutes} from "react-router-dom";
import {lazy} from "react";
import Monitoring from "./pages/monitoring/Monitoring.tsx";
import InteraktivMap from "./pages/map/Map.tsx";
import Laboratory from "./pages/labaratory/Labaratory.tsx";
import Project from "./pages/project/Project.tsx";
import Object from "./pages/obyekt/Object.tsx";

const Reyting = lazy(() => import("./pages/reyting/Reyting.tsx"));


function Route() {
    const routes: RouteObject[] = [
        {
            path: "object",
            element: <Object/>
        },
        {
            path: "monitoring",
            element: <Monitoring/>
        },
        {
            path: "map",
            element: <InteraktivMap/>
        },
        {
            path: "reyting",
            element: <Reyting/>
        },
        {
            path: "laboratory",
            element: <Laboratory/>
        },
        {
            path: "project",
            element: <Project/>
        },
    ]
    return useRoutes(routes)
}

export default Route