import { HTMLAttributes } from "react";
import MyZoom from "../zoom/MyZoom.tsx";

type CardCaptionProps = HTMLAttributes<HTMLImageElement> & {
  src?: string;
  fit?: "cover" | "contain" | "fill";
};

const CardCaption = ({ src, fit = "cover", ...props }: CardCaptionProps) => {
  const isFullURL = src?.startsWith("http") || src?.startsWith("/images");

  return (
    <MyZoom>
      <img
        className={`object-${fit} no-copy h-52 w-full rounded-xl`} // katta qilish uchun height/width o‘zgartirildi
        src={isFullURL ? src : `/${src}`}
        alt=""
        onError={(evt) => (evt.currentTarget.src = "/images/fallback.png")}
        {...props}
      />
    </MyZoom>
  );
};
export default CardCaption;
