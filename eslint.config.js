import prettier from "eslint-config-prettier";
import vue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        projectService: true,
        extraFileExtensions: [".vue"],
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      vue,
    },
  },

  ...tseslint.configs.recommended,

  vue.configs["flat/essential"],

  {
    rules: {
      // "vue/multi-word-component-names": "off",
    },
  },

  prettier,
]);
