export default {
  '*.{ts,vue}': ['eslint --fix', 'prettier --write', 'jest --findRelatedTests --passWithNoTests'],
  '*.{js,jsx,json,css,scss,md}': ['prettier --write'],
};
