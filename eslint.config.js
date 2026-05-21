const tailwindRtl = require("./src/index.js");

module.exports = [
  {
    ignores: ["node_modules/**", "src/maps/**", "tests/**"],
  },
  {
    plugins: {
      "tailwind-rtl": tailwindRtl,
    },
    rules: {
      "tailwind-rtl/tailwind/no-physical-classes": "error",
    },
  },
];
