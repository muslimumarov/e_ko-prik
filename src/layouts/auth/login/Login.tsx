import React, { useState, useEffect } from "react";
import MyInput from "../../../core/components/form/MyInput.tsx";
import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";
import useLogin from "../apiAuth.ts";
import logo from "../../../../public/images/Logo-Gold.png";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { t } = useTranslation();
  const { login } = useLogin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginMessage, setLoginMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isSuccess = await login(formData.username, formData.password);

    if (isSuccess) {
      setLoginMessage({
        type: "success",
        text: "Tizimga muvaffaqiyatli kirdingiz",
      });

      const redirectId = localStorage.getItem("redirectBridgeId");

      setTimeout(() => {
        if (redirectId) {
          localStorage.removeItem("redirectBridgeId");
          navigate(`/archive?id=${redirectId}`);
        } else {
          navigate("/");
        }
      }, 1000);
    } else {
      setLoginMessage({ type: "error", text: "Login yoki parol noto‘g‘ri" });
    }
  };

  useEffect(() => {
    if (loginMessage) {
      const timeout = setTimeout(() => setLoginMessage(null), 1000);
      return () => clearTimeout(timeout);
    }
  }, [loginMessage]);

  const handleLogoutClick = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center  px-4 dark:bg-blue-950">
      {loginMessage && (
        <div
          className={`fixed right-4 top-20 z-50 rounded-md px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 sm:top-24 ${
            loginMessage.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {loginMessage.text}
        </div>
      )}

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
        <form onSubmit={handleSubmit}>
          <MyInput
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Enter username"
          />
          <MyInput
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Parolingizni kiriting"
          />

          <div className="mt-6 flex justify-center gap-4">
            <Button className="bg-cyan-800 text-white" type="submit">
              {t("Login")}
            </Button>
            <Button
              className="bg-cyan-800 text-white dark:bg-cyan-600"
              type="submit"
              onClick={handleLogoutClick}
            >
              {t("Back")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
