import logo from "../../../../public/images/Logo-Gold.png";
import MyInput from "../../../core/components/form/MyInput.tsx";
import { LoginInterface } from "../../../core/interfaces/login.interface.ts";
import { useTranslation } from "react-i18next";
import { Button } from "flowbite-react";

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-between px-5">
        <img
          src={logo}
          alt="Ko'prik qurilish logo"
          className="mb-11  mt-40 h-28 w-72"
        />
        <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-md">
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-sm"
            noValidate
          >
            <div className="mb-5">
              <MyInput<LoginInterface>
                required
                label={t("Username")}
                placeholder={t("Enter username")}
                // register={register}
                name={"username"}
                // error={errors.email?.message}
              />
            </div>
            <div className="mb-5">
              <MyInput<LoginInterface>
                required
                label={t("Password")}
                placeholder={t("Enter password")}
                type={"password"}
                // register={register}
                name={"password"}
                // error={errors.password?.message}
              />
            </div>
            <Button type="submit" color="blue" className={"w-full"}>
              {t("Login")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
