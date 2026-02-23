module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "script",
  },
  rules: {
    "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
    "no-console": "off",
  },
};

