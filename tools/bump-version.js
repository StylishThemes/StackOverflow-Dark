#!/usr/bin/env node
"use strict";

const fs = require("fs-extra");
const path = require("path");
const semver = require("semver");

const pkg = require("../package.json");
const {exit} = require("./utils");

const file = path.join(__dirname, "..", pkg.main);

(async () => {
  // level = patch, minor or major
  const level = process.argv.pop();
  const newVersion = semver.inc(pkg.version, level);

  fs.readFile(file, "utf8")
    .then(css => css.replace(pkg.version, newVersion))
    .then((css) => {
      if (css.indexOf(newVersion) < 0) {
        throw new Error("*** VERSION MISMATCH!! ***");
      }
      return css;
    })
    .then(css => fs.writeFile(file, css))
    .then(() => console.log("\x1b[32m%s\x1b[0m", `${pkg.title} usercss updated`))
    .catch(exit);
})();
