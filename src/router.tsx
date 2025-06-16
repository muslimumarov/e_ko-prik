import { useRoutes } from "react-router-dom";
import InteractiveMap from "./pages/map/InteractiveMap";
import MyMapPage from "./components/Map/map";
import Monitoring from "./pages/monitoring/Monitoring";
import Archive from "./pages/archive/Archive";
import ArchiveDetail from "./pages/archive/archive-detail/ArchiveDetail";
import Exodim from "./pages/employee/Employee";
import Eombor from "./pages/warehouse/Warehouse";
import Camera from "./pages/camera/Camera";
import PartnersAndBenefits from "./layouts/base/article/PartnersAndBenefits";
import Main from "./layouts/base/main/Main";
import Layout from "./layouts/base/Layaut.tsx";
import PrivateRoute from "./layouts/base/Private/PrivateRoute.tsx";

function Route() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Main /> },
        { path: "map", element: <InteractiveMap /> },
        { path: "map/myMap", element: <MyMapPage /> },

        {
          path: "monitoring",
          element: (
            <PrivateRoute>
              <Monitoring />
            </PrivateRoute>
          ),
        },
        {
          path: "archive",
          element: <Archive />,
        },
        {
          path: "archive/:id",
          element: <ArchiveDetail />,
        },

        {
          path: "employee",
          element: (
            <PrivateRoute>
              <Exodim />
            </PrivateRoute>
          ),
        },
        {
          path: "warehouse",
          element: (
            <PrivateRoute>
              <Eombor />
            </PrivateRoute>
          ),
        },
        {
          path: "camera",
          element: (
            <PrivateRoute>
              <Camera />
            </PrivateRoute>
          ),
        },
        { path: "partners", element: <PartnersAndBenefits /> },
      ],
    },
  ];
  return useRoutes(routes);
}

export default Route;
