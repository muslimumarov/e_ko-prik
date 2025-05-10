import { ReactNode } from "react";

interface ToastContainerProps {
  title: ReactNode;
  message: ReactNode;
}

const ToastContainer = ({ title, message }: ToastContainerProps) => {
  return (
    <div className={"w-full"}>
      <h5 className="mb-1">{title}</h5>
      <div className="text-sm">{message}</div>
    </div>
  );
};
export default ToastContainer;
