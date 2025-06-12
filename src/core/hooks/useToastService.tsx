import { toast } from "react-toastify";

const useToast = () => {
  const success = (message: string) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
    });

  const error = (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
    });

  const info = (message: string) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
    });

  const warning = (message: string) =>
    toast.warn(message, {
      position: "top-right",
      autoClose: 3000,
    });

  return { success, error, info, warning };
};

export default useToast;
