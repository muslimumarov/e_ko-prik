"use strict";
const typescriptTransform = require("i18next-scanner-typescript");

module.exports = {
  input: ["src/**/*.{ts,tsx}", "!./i18n/**", "!./node_modules/**"],
  output: "./",
  options: {
    debug: true,
    sort: true,
    plural: true,
    attr: {
      list: ["data-i18n"],
      extensions: [".html", ".htm"],
    },
    func: {
      list: ["i18next.t", "i18n.t", "t"],
      extensions: [".ts", ".tsx"],
    },
    trans: false,
    lngs: ["ru", "uz", "en"],
    defaultValue: (lng, ns, key) => (lng === "uz" ? key : ""),
    resource: {
      loadPath: "public/locales/{{lng}}.json",
      savePath: "public/locales/{{lng}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
  },
  transform: typescriptTransform(
    {
      extensions: [".ts", ".tsx"],
      tsOptions: {
        target: "es2017",
      },
    },
    function (outputText, file, enc, done) {
      const parser = this.parser;
      parser.parseTransFromString(outputText);
      parser.parseFuncFromString(outputText);

      done();
    },
  ),
};
