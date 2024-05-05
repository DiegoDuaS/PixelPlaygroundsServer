module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: 'standard', 
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['**/*.js'], 
      env: {
        node: true,
      },
    },
  ],
  rules: {
    "semi": 0, 
    "import/extensions": "off", 
    "camelcase": "off", 
    "prefer-destructuring": "off" 
  },
};

