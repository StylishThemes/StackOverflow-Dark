#!/usr/bin/env node
"use strict";

const fs = require("fs").promises;
const path = require("path");

const {replaceHolders, exit} = require("./utils");
const pkg = require("../package.json");

const files = {
  defaults: path.join(__dirname, "..", "defaults.json"),
  usercss: path.join(__dirname, "..", pkg.main),
  template: path.join(__dirname, "usercss-template.css"),
};

const defaults = require(files.defaults);

function addVars(template, usercss) {
  const vars = defaults.variables;
  const keys = Object.keys(vars);
  const variables = keys.map((key) => {
    const e = vars[key];
    const v = e.type !== "dropdown" ?
      e.value :
      `{\n  ${Object.keys(e.value)
        .map(o => `${o} "${o}" <<<EOT\n  ${e.value[o]} EOT;`)
        .join("\n  ")}\n}`;
    return `@advanced ${e.type} ${e.label} "${key}" ` +
      // Wrap url(...) in quotes
      `${v.includes("url(") ? '"' + v + '"' : v}`;
  }).join("\n");
  return replaceHolders(
    pkg,
    usercss
      .replace(/\/\*\s==UserStyle[\s\S]+==\/UserStyle== \*\/\s+/i, template)
      .replace("{{preprocessor}}", defaults.preprocessor || "uso")
      .replace("{{variables}}", variables)
  );
}

fs.readFile(files.template, "utf8")
  .then(template =>
    fs
      .readFile(files.usercss, "utf8")
      .then(usercss => addVars(template, usercss))
  )
  .then(css => fs.writeFile(files.usercss, css))
  .then(() => console.log("\x1b[32m%s\x1b[0m", `${pkg.title} usercss update complete`))
  .catch(exit);
