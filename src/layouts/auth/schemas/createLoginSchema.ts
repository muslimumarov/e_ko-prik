import * as yup from "yup";

const createLoginSchema = (t: (text: string) => string) =>
  yup.object().shape({
    username: yup.string().required(t("Username is required")),
    password: yup.string().required(t("Password is required")),
  });

export default createLoginSchema;
