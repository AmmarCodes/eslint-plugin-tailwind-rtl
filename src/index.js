const tailwindRule = require("./rules/tailwind/no-physical-classes");

const plugin = {
  meta: {
    name: "eslint-plugin-tailwind-rtl",
    version: "1.0.0",
  },
  rules: {
    "tailwind/no-physical-classes": tailwindRule,
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
      },
    },
  },
};
