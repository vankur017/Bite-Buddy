/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTest.js"],
  moduleNameMapper: {
    "^app/(.*)$": "<rootDir>/src/$1",
    "^features/(.*)$": "<rootDir>/src/features/$1",
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^services/(.*)$": "<rootDir>/src/services/$1",
    "^store/(.*)$": "<rootDir>/src/store/$1",
    "^context/(.*)$": "<rootDir>/src/context/$1",
  },
};
