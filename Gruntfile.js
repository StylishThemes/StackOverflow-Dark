module.exports = function(grunt) {
  "use strict";

  let config, file;

  try {
    config = grunt.file.readJSON("build.json");
  } catch (err) {
    console.info("build.json not found - using defaults");
    config = {
      "theme"    : "desert",
      "color"    : "#4183C4",
      "visited"  : "#4183C4",
      "font"     : "Menlo",
      "image"    : 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAAAAABURb1YAAAFnklEQVR4AWWXCY4cwXbE6h4JMhCvMPc/ov+3Ox9QsLCGpKlFHILd+UQ559AGDkBSFXWmomonqkL/XuUcIPUcONjHCJyE36KaqNiaRnVCG9TGpgIU9hIfohCBVGj24ammo04lU3Fy0NZDAyZi5AElHjgEGlRbG1WjraIt7TmADQkAaoEHsOXAAaeqat9RVTqjosyEH5W+DQCQt8BzIJMfXJI3e5tGRefSlRn3NrO3scnvNl26FN5RITGNfjm3GM/+FhQgnlQeImC+dEm8rzHVTNGL9EADVsTAIfGJBziRy7RlmcZU1IYpHIj+4JrWym8/XSwzompmFNVOFdTOAAfs61KZ6eXcp57fykQUOxNBmTesz2HpCnCg3UV/bA7VRpWGNqKtrYLTs0ilCjgxiZxjeLC5dDPBFn4Pn2ja6BRUL10DTgET4Focq8rn8casxV4E5tIlZvytqtfivCOKZrqc38G7egnkXecyPZdzubc57VtUnbfL+a0u3b1N3d9Mci7cKocHoh3xihLQ6fXUlgTOOfVkXSUFINoWHhqxE23RTmCqtoEJaITkIrUCkU9fnqpqm+40VSXS3CLaSzfGBb4rPuOSfN0ylLve6/jpcrbL2dTlnOdv5AamKjLvLN1XruMNS/cul/hx8twKpKYRaE2DOp8+c+lW7uVXVQ7Vx0x1G3HXjNocsHCac7NbWc6egwJVHu2kRTVNC2pqv2U4XNsv5/yWJlV9+NJ1C7xluInlcr7rK+Kg+qy7onQqgnbi7UHcS3qXjdw3bO5tumycYlVssMI5EXXpRnatPK362KodtVU60cm+eQT10sVLFwJYlVaf7UGSoi5dQF3DvnTX3UvXTPO8quKH7jsXhm/PxfKWZXqBM5sS33kmKtC31Q05fI095i5IPpyzRXqSy1Sr17p1F7NE8vMtnNbLpVVtk8c0OrfF0sKxHnIpYgHW4puMomTz8mgmrSjpvrxhX97l7LqLpl7bW9BH9/MNzF8XwRqL8/m7c30eFYV5VX3QTquK06XbLt16F4ks+8Z9m6gPtpcuk3OvibCekng4lzMHi9MoqZmKj9tdbQCbc7bcEA+oEJduRNNL1waf1tuI9MDBUK8t3k9uFz3rrqadO9Ln9TL/ezlwDvky3TW7ZmXfpc77TN0yhOXnP939LvVDV9s+tgLTm0TqYd1lea3PRFuVjLa562HdPbCfascGrvO3DMeIATVqVRO8vfHrbupdfo1dzlXUdkVLZsS1mLPG3rWcl+4B1l1537h0VXzU1tyLG7cCu+LSrSqo06hocy3WCcil65qHDbuEYzQN2HpT3jFt9LEFvHTP1nxbXOEkbhkKmd+6BTfVZ/I143z/Fyz6Za92o0I7I6gzfeYAHPwy/Rb43L9TLtMt8CtwW1xvQvbR1g9n7qJRNN1kdxcdH7cM58Szxq679MdLOhE72t6VNEpHHkzwRyjBcGth+dE99pIkVbWaEWmvnQ8Yl7Mp59zpRWXdNo6odrO754Zzvxf/010nP7onb1TR+bgbVPB9PcADJvH/043Kvk0UzLRxQ6UiaeTAcyxYl2lyrrvZv8v2wE7U1uVcST0821jJeIDKWuyxiqnuko7q3+zJYXJ46nV3D67EyL+lQ9F2qkr+3kUafQpwYE8T329p6y7OX1TF97fQv/c+l87zj7Hsgpig4qRLd9fMPs74rLGyCzRbhmVqpy7nqvPmTD1gvKe7b2U8u1QzmtuDuEtbgT3c8QBJveo6cueFkUwv59nVmfFw1jl4/unuOT9qERV76ers8n23z/c8/Xy7a4lwwLplmGusbRp33Up13+ZDN3KPxNVMhY62vUQyRTse6+cKHtZYjIfDh260Cjbb3Vy6R8H8SMBzqSwrsB1UTacoknlnOb8V4JD9Njfpwz/fHjpBUeevcAtcl65sqXPX9D87RUTLc/dfOgAAAABJRU5ErkJggg==")',
      "tiled"    : true,
      "attach"   : "scroll",
      "webkit"   : false
    };
  }

  file = (config.theme || "").toLowerCase().replace(/\s+/g, "-");

  function getVersion(level) {
    const semver = require("semver");
    const version = require("./package.json").version;
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
    pkg: grunt.file.readJSON("package.json"),
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
      patch: {
        files: {"stackoverflow-dark.css": "stackoverflow-dark.css"},
        options: {replacements: [{
          pattern: /v[0-9.]+ \(.+\)/,
          replacement: "v" + getVersion("patch") + " (" + getDate() + ")"
        }]}
      },
      minor: {
        files: {"stackoverflow-dark.css": "stackoverflow-dark.css"},
        options: {replacements: [{
          pattern: /v[0-9.]+ \(.+\)/,
          replacement: "v" + getVersion("minor") + " (" + getDate() + ")"
        }]}
      },
      major: {
        files: {"stackoverflow-dark.css": "stackoverflow-dark.css"},
        options: {replacements: [{
          pattern: /v[0-9.]+ \(.+\)/,
          replacement: "v" + getVersion("major") + " (" + getDate() + ")"
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
      stylelint: "npm -s run stylelint",
      eslint: "npm -s run eslint",
      authors: "bash tools/authors.sh",
      add: "git add stackoverflow-dark.css",
      patch: "npm version -f patch",
      minor: "npm version -f minor",
      major: "npm version -f major",
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
    grunt.task.run([
      "lint",
      "string-replace:patch",
      "exec:add",
      "exec:patch",
      "user"
    ]);
  });
  grunt.registerTask("minor", "Bump minor version", () => {
    grunt.task.run([
      "lint",
      "string-replace:minor",
      "exec:add",
      "exec:minor",
      "user"
    ]);
  });
  grunt.registerTask("major", "Bump major version", () => {
    grunt.task.run([
      "lint",
      "string-replace:major",
      "exec:add",
      "exec:major",
      "user"
    ]);
  });
};
