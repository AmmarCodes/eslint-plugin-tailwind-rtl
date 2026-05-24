const tailwindRule = require("./rules/tailwind/no-physical-classes");
const cssInJsRule = require("./rules/css-in-js/no-physical-properties");

const plugin = {
  meta: {
    name: "eslint-plugin-tailwind-rtl",
    version: "1.0.0",
  },
  rules: {
    "tailwind/no-physical-classes": tailwindRule,
    "css-in-js/no-physical-properties": cssInJsRule,
  },
};

module.exports = {
  ...plugin,
  configs: {
    recommended: {
      plugins: {
        "tailwind-rtl": plugin,
      },
      rules: {
        "tailwind-rtl/tailwind/no-physical-classes": "warn",
        "tailwind-rtl/css-in-js/no-physical-properties": "warn",
      },
    },
    "recommended-tailwind": {
      plugins: {
        "tailwind-rtl": plugin,
      },
      rules: {
        "tailwind-rtl/tailwind/no-physical-classes": "warn",
      },
    },
  },
};
