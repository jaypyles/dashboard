module.exports = {
  env: {
    node: true, // Add this line to specify the Node.js environment
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended', // Use the recommended rules from ESLint
    'plugin:@typescript-eslint/recommended', // Use the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Ensure ESLint checks TypeScript files
      rules: {
        // Add TypeScript-specific rules here if needed
      },
    },
  ],
};
