const tailwindRule = require("./rules/tailwind/no-physical-classes");
const cssInJsPropertyRule = require("./rules/css-in-js/no-physical-properties");
const cssInJsValueRule = require("./rules/css-in-js/no-physical-values");

const plugin = {
  meta: {
    name: "eslint-plugin-tailwind-rtl",
    version: "1.0.0",
  },
  rules: {
    "tailwind/no-physical-classes": tailwindRule,
    "css-in-js/no-physical-properties": cssInJsPropertyRule,
    "css-in-js/no-physical-values": cssInJsValueRule,
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
        "tailwind-rtl/css-in-js/no-physical-values": "warn",
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
