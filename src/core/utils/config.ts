const isProd = !(
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
);

const config = {
  APP_NAME: "CSEC",
  MODE: process.env.NODE_ENV,
  API_ROOT: isProd ? process.env.API_ROOT : "",
  DEFAULT_LANG_CODE: "uz",
};
export default config;
