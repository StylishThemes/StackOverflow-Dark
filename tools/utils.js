#!/usr/bin/env node
"use strict";

// Replace placeholders in template
function replaceHolders(pkg, css) {
  const placeholders = css.match(/\{\{\S+?\}\}/g);
  const domain = "https://github.com/";
  if (placeholders) {
    new Set(placeholders).forEach((name) => {
      let val = (pkg[name.replace(/[{}]/g, "")] || name);
      if (val.indexOf(domain) > -1) {
        val = val.substring(domain.length, val.length);
      }
      css = css.replace(new RegExp(escapeRegex(name), "gi"), val);
    });
  }
  return css;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function maxSize(array) {
  return array.reduce((acc, item) => Math.max(acc, item.length), 0);
}

function pad(len, str) {
  return (str || "").padEnd(len);
}

function exit(err) {
  if (err) {
    console.error(err);
  }
  process.exit(err ? 1 : 0);
}

module.exports = {
  replaceHolders,
  escapeRegex,
  maxSize,
  pad,
  exit,
};
