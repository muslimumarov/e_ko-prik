import React, { useState } from "react";
import MyInput from "../../../core/components/form/MyInput.tsx";
import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";
import logo from "../../../../public/images/Logo-Gold.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLogin from "./apiAuth.ts";

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useLogin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: "username" | "password", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(formData.username, formData.password);

      setLoading(false);

      if (res.success) {
        toast.success(res.message, { autoClose: 1000 });

        // Agar redirectBridgeId bo'lsa → arxivga otish
        const redirectId = localStorage.getItem("redirectBridgeId");
        setTimeout(() => {
          if (redirectId) {
            localStorage.removeItem("redirectBridgeId");
            navigate(`/archive/${redirectId}`);
          } else {
            navigate("/"); // Bosh sahifaga
          }
        }, 500);
      } else {
        toast.error(res.message, { autoClose: 2000 });
      }
    } catch (err) {
      console.error(err);
      toast.error(t("Server bilan bog'liq xatolik yuz berdi"), {
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-500 px-4 dark:bg-blue-950">
      <div className="w-full max-w-md rounded-2xl bg-blue-950/60 p-8 shadow-2xl backdrop-blur-lg dark:bg-white/10">
        <div className="mb-8 flex flex-col items-center">
          <a href="/">
            <img
              src={logo}
              alt="Ko'prik qurilish logo"
              className="h-28 w-72 object-contain"
            />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <MyInput
            name="username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            placeholder={t("Enter username")}
          />
          <MyInput
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder={t("Parolingizni kiriting")}
          />

          <div className="mt-6 flex justify-center gap-4">
            <Button
              className="bg-cyan-800 text-white"
              type="submit"
              disabled={loading}
            >
              {t("Login")}
            </Button>
            <Button
              className="bg-cyan-800 text-white dark:bg-cyan-600"
              type="button"
              onClick={handleBackClick}
            >
              {t("Back")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
