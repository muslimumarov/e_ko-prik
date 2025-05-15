import { Outlet } from "react-router-dom";

const InteractiveMap: React.FC = () => {
  return (
    <div className="pt-20">
      {" "}
      {/* Navbar joyi uchun bo‘sh joy */}
      <Outlet /> {/* Bu yerda child sahifa (`/map/mymap`) ko‘rinadi */}
    </div>
  );
};

export default InteractiveMap;
