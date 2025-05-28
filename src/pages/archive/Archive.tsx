import { Outlet } from "react-router-dom";

const Archive = () => {
  return (
    <div>
      <h1 className="z-[999999999]">Arxiv Malumotlar </h1>
      <Outlet />
    </div>
  );
};

export default Archive;
