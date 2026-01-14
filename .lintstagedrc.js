export default {
  '*.{ts,vue}': [
    'eslint --config .eslintrc.cjs --fix',
    'prettier --write',
    'jest --findRelatedTests --passWithNoTests',
  ],
  '*.{js,jsx,json,css,scss,md}': ['prettier --write'],
};
