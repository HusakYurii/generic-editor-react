const fs = require("fs");
const path = require("path");

const packageFile = fs.readFileSync(path.join("./package.json"), { encoding: "utf-8" });
const version = JSON.parse(packageFile).version;

fs.writeFileSync(path.join("./src", "VERSION.js"), `export const VERSION = "${version}";`);
console.log("A JS file with the current  version was created in src folder!");