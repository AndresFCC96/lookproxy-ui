module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/default',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,vue}',
      '!src/main.js', 
      '!**/node_modules/**'
    ],
    coverageReporters: ['html', 'text-summary']
  };
  