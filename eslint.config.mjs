import nextConfig from "eslint-config-next/core-web-vitals";
import typescriptConfig from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
  {
    ignores: ["coverage", ".next", "platform_tests"],
  },
  ...nextConfig,
  ...typescriptConfig,
  prettierConfig,
  {
    rules: {
      'no-console': ['error', { allow: ['info', 'error'] }],
      semi: ['error', 'always'],
    },
  }
];

export default eslintConfig;
