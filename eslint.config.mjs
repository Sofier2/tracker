import globals from "globals";

const recommendedRules = {
  "no-unused-vars": "warn",
  "no-undef": "error",
  "no-console": "off",
  "no-extra-semi": "warn",
  "eqeqeq": "warn",
};

export default [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,  // для браузерного коду (window, document)
        ...globals.node,     // для Node.js (module, require, process)
      },
    },
    rules: {
      ...recommendedRules,
    },
  },
];