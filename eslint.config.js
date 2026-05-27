const tailwindRtl = require("./src/index.js");

module.exports = [
  {
    ignores: ["node_modules/**", "src/maps/**", "tests/**"],
  },
  tailwindRtl.configs.recommended,
];
