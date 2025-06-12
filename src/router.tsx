import { useRoutes } from "react-router-dom";
import Main from "./layouts/base/main/Main.tsx";
import { Login } from "./layouts/auth/login/Login.tsx";
import InteractiveMap from "./pages/map/InteractiveMap.tsx";
import MyMapPage from "./components/Map/map.tsx";
import Monitoring from "./pages/monitoring/Monitoring.tsx";
import Archive from "./pages/archive/Archive.tsx";
import ArchiveDetail from "./pages/archive/archive-detail/ArchiveDetail.tsx";
import Exodim from "./pages/employee/Employee.tsx";
import Eombor from "./pages/warehouse/Warehouse.tsx";
import Camera from "./pages/camera/Camera.tsx"; // ✅ to‘g‘rilangan import

function Route() {
  const routes = [
    { path: "/login", element: <Login /> },
    { path: "/map", element: <InteractiveMap /> },
    { path: "/map/myMap", element: <MyMapPage /> },
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/monitoring",
      element: <Monitoring />,
    },
    {
      path: "/archive",
      element: <Archive />,
    },
    {
      path: "/archivedetails/:id",
      element: <ArchiveDetail />,
    },
    {
      path: "/employee",
      element: <Exodim />,
    },
    {
      path: "/warehouse",
      element: <Eombor />,
    },
    {
      path: "/camera",
      element: <Camera />,
    },
  ];

  return useRoutes(routes);
}

export default Route;
