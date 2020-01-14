module.exports = {
  mode: "modules",
  target: "es6",
  out: "docs",
  exclude: ["**/node_modules/**", "**/*.spec.ts", "**/*.test.ts", "dist"],
  name: "Google Maps Services Node Client",
  ignoreCompilerErrors: false,
  module: "commonjs",
  readme: "./README.md"
};