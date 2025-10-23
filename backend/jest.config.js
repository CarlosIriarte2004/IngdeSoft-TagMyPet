module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["js", "json"],
};
