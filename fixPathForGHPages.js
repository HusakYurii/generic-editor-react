const fs = require("fs");
const path = require("path");

const htmlFile = fs.readFileSync(path.join("./build/index.html"), { encoding: "utf-8" });
const updatedHTMLFile = htmlFile.replace(new RegExp("\/static\/", "g"), './static/');
fs.writeFileSync(path.join("./build/index.html"), updatedHTMLFile);

console.log("Fix paths for the index.html");