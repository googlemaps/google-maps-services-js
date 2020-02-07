// Cannot be `import` as it's not under TS root dir
export const version = require("../package.json").version;

export * from "./client";
