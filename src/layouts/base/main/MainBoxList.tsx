import React from "react";
import { LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore.ts";
import { toast } from "react-toastify";

interface Box {
  title: string;
  description: string;
  path: string;
  img: string;
  isPublic?: boolean;
  isExternal?: boolean;
}

interface Props {
  boxes: Box[];
}

const MainBoxList: React.FC<Props> = ({ boxes }) => {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  const isAuthenticated = !!accessToken;

  const handleClick = (box: Box) => {
    if (!box.isPublic && !isAuthenticated) {
      toast.warning("Sizga ruxsat yo‘q");
      navigate("/login");
      return;
    }

    if (box.isExternal) {
      window.open(box.path, "_blank");
    } else {
      navigate(box.path);
    }
  };

  return (
    <div className="mt-20 grid bg-[url('/your-bg.jpg')] bg-cover bg-center">
      <div className="grid grid-cols-1 gap-x-14 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {boxes.map((box, index) => {
          const isLocked = !isAuthenticated && !box.isPublic;

          return (
            <div
              key={index}
              onClick={() => handleClick(box)}
              className="relative flex h-64 cursor-pointer items-center justify-center rounded-xl bg-white/10
              p-6 text-center text-xl font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 dark:bg-blue-950 sm:w-[290px] md:w-[390px] lg:w-[350px] xl:w-[420px]"
            >
              {isLocked && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-black/60 text-white opacity-0 transition-opacity hover:opacity-100">
                  <LockKeyhole size={40} color="red" className="mb-2" />
                  <p className="text-sm">Sizga ruxsat yo‘q</p>
                </div>
              )}

              <img
                src={box.img}
                alt={box.title}
                className="absolute bottom-0 right-0 w-44 object-cover"
              />
              <strong className="absolute left-5 top-5 z-20 text-3xl text-amber-200">
                {box.title}
              </strong>
              <span className="absolute left-5 top-14 z-20 pr-2 text-left text-[16px] font-bold text-amber-200 dark:text-white">
                {box.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainBoxList;
