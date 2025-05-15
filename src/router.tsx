import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import Main from "./layouts/base/main/Main.tsx";

const Monitoring = lazy(() => import("./pages/monitoring/Monitoring.tsx"));
const InteractiveMap = lazy(() => import("./pages/map/InteractiveMap.tsx"));
const MyMapPage = lazy(() => import("./components/Map/map.tsx"));
const Camera = lazy(() => import("./pages/camera/Camera.tsx"));
const Archive = lazy(() => import("./pages/archive/Archive.tsx"));
const Exodim = lazy(() => import("./pages/employee/Employee.tsx"));
const Eombor = lazy(() => import("./pages/warehouse/Warehouse.tsx"));

function Route() {
  const routes = [
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "map",
      element: <InteractiveMap />,
      children: [
        {
          path: "myMap",
          element: <MyMapPage />,
        },
      ],
    },
    {
      path: "employee",
      element: <Exodim />,
    },
    {
      path: "monitoring",
      element: <Monitoring />,
    },

    {
      path: "archive",
      element: <Archive />,
    },
    {
      path: "warehouse",
      element: <Eombor />,
    },
    {
      path: "project",
      element: <Camera />,
    },
  ];
  return useRoutes(routes);
}

export default Route;
