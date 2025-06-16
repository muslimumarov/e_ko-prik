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
          navigate("/"); // default sahifa
        }
      }, 1000); // 1 sekunddan keyin o'tkazish
    } else {
      setLoginMessage({ type: "error", text: "Login yoki parol noto‘g‘ri" });
    }
  };

  // Xabarni 3 sekundda yo'qotish
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
    <div className=" mx-auto h-screen bg-blue-950 ">
      {loginMessage && (
        <div
          className={`fixed right-0 top-20 z-50 rounded px-4 py-2 text-sm text-white shadow-md transition-all duration-300
          ${loginMessage.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {loginMessage.text}
        </div>
      )}
      <div className="flex flex-col items-center justify-between ">
        <a href="/">
          <img
            src={logo}
            alt="Ko'prik qurilish logo"
            className="mb-11 mt-40 h-28 w-72"
          />
        </a>
        <div className="w-full max-w-md rounded-lg border-amber-100 p-0  shadow-md backdrop-blur">
          <form onSubmit={handleSubmit}>
            <MyInput
              className={"mb-5"}
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
              placeholder="Enter password"
            />
            <div className={"align-center mt-5 flex  justify-center gap-4"}>
              <Button className={""} type="submit">
                {t("Login")}
              </Button>
              <Button className={""} onClick={handleLogoutClick}>
                {t("Back")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
