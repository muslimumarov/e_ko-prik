import { Slide, toast } from "react-toastify";
import ToastContainer from "../components/toast/ToastContainer.tsx";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ToastProps {
  message?: ReactNode;
  title?: ReactNode;
  icon?: string | null;
}

const useToast = () => {
  const { t } = useTranslation();

  const error = ({
    title = t("Xatolik mavjud"),
    message = t("Xatolik yuz berdi! Tizim administratori bilan bog'laning."),
    icon = null,
  }: ToastProps) => {
    toast.error(<ToastContainer message={message} title={title} />, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: false,
      transition: Slide,
      closeButton: false,
      bodyClassName: "w-full",
      icon,
      theme: "colored",
    });
  };

  const success = ({
    title = t("Muvaffaqiyatli bajarildi"),
    message = "",
    icon = null,
  }: ToastProps) => {
    toast.success(<ToastContainer message={message} title={title} />, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: false,
      transition: Slide,
      closeButton: false,
      bodyClassName: "w-100",
      icon,
      theme: "colored",
    });
  };

  const warning = ({
    title = t("Ogohlantirish"),
    message = "",
    icon = null,
  }: ToastProps) => {
    toast.warning(<ToastContainer message={message} title={title} />, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: false,
      transition: Slide,
      closeButton: false,
      bodyClassName: "w-100",
      icon,
      theme: "colored",
    });
  };

  const info = ({
    title = t("Xabar"),
    message = "",
    icon = null,
  }: ToastProps) => {
    toast.info(<ToastContainer message={message} title={title} />, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: false,
      transition: Slide,
      closeButton: false,
      bodyClassName: "w-100",
      icon,
      theme: "colored",
    });
  };

  return { error, success, warning, info };
};

export default useToast;
