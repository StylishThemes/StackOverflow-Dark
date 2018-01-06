module.exports = function(grunt) {
  "use strict";

  let config, file;
  const defaults = require("./defaults.json");
  const pkg = require("./package.json");

  try {
    config = Object.assign({}, defaults, grunt.file.readJSON("build.json"));
  } catch (err) {
    console.info("build.json not found - using defaults");
    config = defaults;
  }

  file = (config.theme || "").toLowerCase().replace(/\s+/g, "-");

  function getVersion(level) {
    const semver = require("semver");
    const version = pkg.version;
    return semver.inc(version, level);
  }

  function getDate() {
    return (new Date()).toISOString().substring(0, 10);
  }

  function loadTheme() {
    let data;
    config.themeFile = "themes/" + file + ".min.css";
    if (grunt.file.exists(config.themeFile)) {
      data = grunt.file.read(config.themeFile);
    } else {
      grunt.log.writeln(`\n**** Syntax theme: "${file}" not found; falling back to a basic dark syntax file ****`["yellow"].bold);
      config.themeFile = "";
      file = "";
      // fallback to a basic dark syntax if no theme chosen
      data = ".pln,code,pre{background:#333!important;color:#ccc!important}.str{color:#0a0!important}" +
        ".lit{color:#d65!important}.pun{color:#999!important}.kwd{color:#08f!important}.tag{color:#999!important}" +
        ".atn{color:#088!important}.atv{color:#0a0!important}.dec{color:#90a!important}";
    }
    config.newTheme = data;
  }

  // updates file variable if theme not found
  loadTheme();

  // ** set up build options **
  config.sourceFile = "stackoverflow-dark.css";
  // build file name
  config.buildFile = "stackoverflow-dark-" + (file ? file : "default") + "-" + config.color.replace(/[^\d\w]/g, "") + ".build.min.css";
  // background options
  config.bgOptions = config.tiled ?
    "background-repeat: repeat !important; background-size: auto !important; background-position: left top !important;" :
    "background-repeat: no-repeat !important; background-size: cover !important; background-position: center top !important;";
  config.bgAttachment = config.attach.toLowerCase() === "scroll" ? "scroll" : "fixed";
  // custom build
  config.replacements = [{
    pattern: /\/\*\[\[bg-choice\]\]\*\/ url\(.*\)/,
    replacement: config.image
  }, {
    pattern: "/*[[bg-options]]*/",
    replacement: config.bgOptions
  }, {
    pattern: "/*[[bg-attachment]]*/ fixed",
    replacement: config.bgAttachment
  }, {
    pattern: /\/\*\[\[base-color\]\]\*\/ #\w{3,6}/g,
    replacement: config.color
  }, {
    pattern: /\/\*\[\[visited-color\]\]\*\/ #\w{3,6}/g,
    replacement: config.visited
  }, {
    pattern: "/*[[font-choice]]*/",
    replacement: config.font
  }, {
    // remove default syntax theme
    pattern: /\s+\/\* grunt-remove-block-below (.*(\n|\r))+\s+\/\* grunt-remove-block-above \*\//gm,
    replacement: ""
  }, {
    pattern: "/*[[syntax-theme]]*/",
    // add selected theme
    replacement: config.newTheme
  }];

  // userstyles.org - remove defaults & leave placeholders
  config.replacements_user = [{
    pattern: /\/\*\[\[bg-choice\]\]\*\/ url\(.*\)/,
    replacement: "/*[[bg-choice]]*/"
  }, {
    pattern: "/*[[bg-attachment]]*/ fixed",
    replacement: "/*[[bg-attachment]]*/"
  }, {
    pattern: /\/\*\[\[base-color\]\]\*\/ #\w{3,6}/g,
    replacement: "/*[[base-color]]*/"
  }, {
    pattern: /\/\*\[\[visited-color\]\]\*\/ #\w{3,6}/g,
    replacement: "/*[[visited-color]]*/"
  }, {
    // remove default syntax theme
    pattern: /\s+\/\* grunt-remove-block-below (.*(\n|\r))+\s+\/\* grunt-remove-block-above \*\//m,
    replacement: ""
  }];

  grunt.initConfig({
    pkg: pkg,
    config: config,

    "string-replace": {
      inline: {
        files: {"<%= config.buildFile %>" : "<%= config.sourceFile %>"},
        options: {replacements: "<%= config.replacements %>"}
      },
      mark: {
        files: {"<%= config.buildFile %>" : "<%= config.buildFile %>"},
        options: {
          replacements: [{
            pattern: /\/\*\[\[/gm,
            replacement: "/*![["
          }]
        }
      },
      unmark: {
        files: {"<%= config.buildFile %>" : "<%= config.buildFile %>"},
        options: {
          replacements: [{
            pattern: /\/\*!\[\[/gm,
            replacement: "/*[["
          }]
        }
      },
      fix: {
        files: {"<%= config.buildFile %>" : "<%= config.buildFile %>"},
        options: {
          replacements: [{
            pattern: /;:\/\*\[\[/gm,
            replacement: ";/*[["
          }]
        }
      },
      // Webkit browser, unwrap main @-moz-document
      webkit : {
        files: {"<%= config.buildFile %>" : "<%= config.buildFile %>"},
        options: {
          replacements: [{
            pattern: /(@-moz-document(.*)\{(\n|\r)+)/m,
            replacement: ""
          }, {
            pattern: /\/\* grunt-webkit-remove-to-end-of-file(.*(\n|\r))+\}$/gm,
            replacement: ""
          }]
        }
      },
      // remove webkit placeholder
      webkitplaceholder: {
        files: {"<%= config.buildFile %>" : "<%= config.buildFile %>"},
        options: {
          replacements: [{
            pattern: " /* grunt-webkit-remove-to-end-of-file */",
            replacement: ""
          }]
        }
      },
      newVersion: {
        files: {"stackoverflow-dark.css": "stackoverflow-dark.css"},
        options: {replacements: [{
          pattern: /v[0-9.]+ \(.+\)/,
          replacement: "v<%= config.version %> (" + getDate() + ")"
        }]}
      }
    },
    clean: {
      themes: {
        src: ["themes/*.min.css"]
      }
    },
    cssmin: {
      minify: {
        files: {"<%= config.buildFile %>" : "<%= config.buildFile %>"},
        options: {
          keepSpecialComments: "*",
          advanced: false
        }
      },
      themes: {
        files: [{
          expand : true,
          cwd : "themes/src/",
          src : "*.css",
          dest : "themes/",
          ext : ".min.css"
        }],
        options: {
          keepSpecialComments: "*",
          advanced: false
        }
      }
    },
    exec: {
      add: "git add stackoverflow-dark.css stackoverflow-dark.user.css",
      authors: "bash tools/authors.sh",
      eslint: "npm -s run eslint",
      major: "npm version -f major",
      minor: "npm version -f minor",
      patch: "npm version -f patch",
      stylelint: "npm -s run stylelint",
      update: "npm -s run update",
      usercss: "node tools/build-usercss",
    },
    watch: {
      files: ["<%= config.sourceFile %>"],
      tasks: ["default"]
    }
  });

  grunt.loadNpmTasks("grunt-string-replace");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-exec");

  // build custom stackoverflow-Dark style using build.json settings
  grunt.registerTask("default", "Building custom style", function() {
    config.buildFile = config.buildFile.replace(".min.css", ".css");
    grunt.task.run(["string-replace:inline"]);
    if (config.webkit) {
      grunt.task.run(["string-replace:webkit"]);
    } else {
      grunt.task.run(["string-replace:webkitplaceholder"]);
    }
  });
  // build custom minified stackoverflow-Dark style
  grunt.registerTask("minify", "Building custom minified style", function() {
    grunt.task.run(["string-replace:inline"]);
    if (config.webkit) {
      grunt.task.run(["string-replace:webkit"]);
    }
    grunt.task.run(["cssmin:minify"]);
  });

  // build userstyle for pasting into https://userstyles.org/styles/35345/stackoverflow-dark
  grunt.registerTask("user", "building userstyles.org file", function() {
    config.buildFile = "stackoverflow-dark-userstyle.build.css";
    config.replacements = config.replacements_user;
    grunt.task.run([
      "string-replace:inline",
      "string-replace:webkitplaceholder"
    ]);
  });
  grunt.registerTask("usermin", "building userstyles.org file", function() {
    config.buildFile = "stackoverflow-dark-userstyle.build.css";
    config.replacements = config.replacements_user;
    grunt.task.run([
      "string-replace:inline",
      "string-replace:mark",
      "cssmin:minify",
      "string-replace:unmark",
      "string-replace:fix"
    ]);
  });

  grunt.registerTask("usercss", "building usercss file", () => {
    grunt.task.run([
      "user",
      "exec:usercss"
    ]);
  });

  // build custom minified stackoverflow-Dark style
  grunt.registerTask("themes", "Rebuild minified theme files", function() {
    grunt.task.run([
      "clean",
      "cssmin:themes"
    ]);
  });

  // JS and CSS lint
  grunt.registerTask("lint", "Lint CSS and JS scripts for errors", () => {
    grunt.task.run([
      "exec:eslint",
      "exec:stylelint"
    ]);
  });

  // version bump tasks
  grunt.registerTask("patch", "Bump patch version", () => {
    config.version = getVersion("patch");
    grunt.task.run([
      "lint",
      "string-replace:newVersion",
      "user",
      "exec:usercss",
      "exec:add",
      "exec:patch"
    ]);
  });
  grunt.registerTask("minor", "Bump minor version", () => {
    config.version = getVersion("minor");
    grunt.task.run([
      "lint",
      "string-replace:newVersion",
      "user",
      "exec:usercss",
      "exec:add",
      "exec:minor"
    ]);
  });
  grunt.registerTask("major", "Bump major version", () => {
    config.version = getVersion("major");
    grunt.task.run([
      "lint",
      "string-replace:newVersion",
      "user",
      "exec:usercss",
      "exec:add",
      "exec:major"
    ]);
  });
};
