module.exports = {
  env: {
    node: true, // Add this line to specify the Node.js environment
    browser: true, // Add this line to specify the browser environment
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended', // Use the recommended rules from ESLint
    'plugin:@typescript-eslint/recommended', // Use the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended', // Use the recommended rules from eslint-plugin-react
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: [
    'react', // Add the react plugin
  ],
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  rules: {
    'react/jsx-no-useless-fragment': 'warn', // Warns about unnecessary fragments
    'react/jsx-key': 'error', // Ensures that elements in lists have keys
    // Place to specify additional ESLint rules. Can be used to overwrite rules specified from the extended configs
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
