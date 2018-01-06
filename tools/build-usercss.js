#!/usr/bin/env node
"use strict";

const fs = require("fs");
const userBase = require("../defaults.json");

// make sure to run "grunt user" before grabbing this style
const cleanedCss = "./stackoverflow-dark-userstyle.build.css";
const usercssName = "stackoverflow-dark.user.css";

function processGroup(css) {
  return new Promise(resolve => {
    getThemesInFolder()
      .then(themes => {
        // Prettyprint themes
        css = css.replace("  {{Themes}}", buildThemeGroup(themes));
        resolve(css);
      })
      .catch(exit);
  });
}

function getThemesInFolder() {
  return new Promise((resolve, reject) => {
    const path = "./themes";
    fs.readdir(path, (err, files) => {
      if (err) {
        console.log("Error reading themes folder", err);
        reject(err);
      }
      files.splice(files.indexOf("src"), 1);
      return Promise.all(files.map(file => readFile(path + "/" + file)))
        .then(resolve)
        .catch(exit);
    });
  });
}

function extractThemeName(css) {
  return css
    .substring(3, css.indexOf("*/"))
    .trim();
}

function buildThemeGroup(themes) {
  const defs = [];
  themes.forEach(theme => {
    const name = extractThemeName(theme);
    defs.push(`  ${name.replace(/\s*/, "")} "${name}" <<<EOT
  ${theme.replace(/\*\//g, "*\\/").replace(/\n/, "")} EOT;`);
  });
  return defs.join("\n");
}

function replaceVars(css) {
  Object.keys(userBase).forEach(key => {
    css = css.replace(`{{${key}}}`, userBase[key]);
  });
  const version = css.match(/Stack\sOverflow\sDark\sv([\d.]+) \(/i);
  if (version) {
    css = css.replace("{{version}}", version[1]);
  }
  return css;
}

function readFile(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(name, "utf8", (err, file) => {
      if (err) {
        return reject(err);
      }
      resolve(file);
    });
  });
}

function writeFile(name, obj) {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, obj, "utf8", err => {
      if (err) {
        console.log(`Error writing ${name}`, err);
        return reject(err);
      }
      resolve();
    });
  });
}

function del(name) {
  return new Promise((resolve, reject) => {
    fs.unlink(name, err => {
      // ignore if file doesn't exist
      if (err && err.code !== "ENOENT") {
        return reject(err);
      }
      resolve();
    });
  });
}

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

del("./" + usercssName)
  .then(() => readFile("./tools/usercss-template.css"))
  .then(css => processGroup(css))
  .then(css => readFile(cleanedCss).then(style => css + style))
  .then(css => writeFile("./" + usercssName, replaceVars(css)))
  .then(() => console.log("\x1b[32m%s\x1b[0m", "Stackoverflow Dark usercss build complete"));
