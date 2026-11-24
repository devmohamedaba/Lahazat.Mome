module.exports = {
  root: true,
  parserOptions: {ecmaVersion: '2022'},
  extends: ['eslint:recommended'],
  env: {es2022: true, browser: true},
  overrides: [
    {files: ['*.cjs', '*.js'], env: {node: true}},
    {files: ['*.js'], parserOptions: {sourceType: 'module'}},
    {files: ['*.mjs'], env: {node: true}, parserOptions: {sourceType: 'module'}},
  ],
}
