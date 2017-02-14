module.exports = function (grunt) {
	'use strict';

	var config, getTheme, file;

	try {
		config = grunt.file.readJSON('build.json');
	} catch (err) {
		console.info('build.json not found - using defaults');
		config = {
			'theme'    : 'desert',
			'color'    : '#4183C4',
			'visited'  : '#4183C4',
			'font'     : 'Menlo',
			'image'    : 'url(https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/images/backgrounds/bg-tile1.png)',
			'tiled'    : true,
			'attach'   : 'scroll',
			'webkit'   : false
		};
	}

	getTheme = function () {
		return (config.theme || '').toLowerCase().replace(/\s+/g, '-');
	};

	// ** set up build options **
	config.sourceFile = 'stackoverflow-dark.css';
	file = getTheme();
	config.themeFile = file === '' || file === 'default' ? '' : 'themes/' + file + '.min.css';
	// build file name
	config.buildFile = 'stackoverflow-dark-' + (file ? file : 'default') + '-' + config.color.replace(/[^\d\w]/g, '') + '.build.min.css';
	// background options
	config.bgOptions = config.tiled ?
		'background-repeat: repeat !important; background-size: auto !important; background-position: left top !important;' :
		'background-repeat: no-repeat !important; background-size: cover !important; background-position: center top !important;';
	config.bgAttachment = config.attach.toLowerCase() === 'scroll' ? 'scroll' : 'fixed';

	// Don't include closing bracket for a webkit build
	config.newTheme = config.themeFile ? '<%= grunt.file.read("' + config.themeFile + '") %>' :
		// basic dark syntax if no theme chosen
		'.pln,code,pre{background:#333!important;color:#ccc!important}.str{color:#0a0!important}' +
		'.lit{color:#d65!important}.pun{color:#999!important}.kwd{color:#08f!important}.tag{color:#999!important}' +
		'.atn{color:#088!important}.atv{color:#0a0!important}.dec{color:#90a!important}';

	// custom build
	config.replacements = [{
		pattern: /\/\*\[\[bg-choice\]\]\*\/ url\(.*\)/,
		replacement: config.image
	},{
		pattern: '/*[[bg-options]]*/',
		replacement: config.bgOptions
	},{
		pattern: '/*[[bg-attachment]]*/ fixed',
		replacement: config.bgAttachment
	},{
		pattern: /\/\*\[\[base-color\]\]\*\/ #\w{3,6}/g,
		replacement: config.color
	},{
		pattern: /\/\*\[\[visited-color\]\]\*\/ #\w{3,6}/g,
		replacement: config.visited
	},{
		pattern: '/*[[font-choice]]*/',
		replacement: config.font
	},{
		// remove default syntax theme
		pattern: /\s+\/\* grunt-remove-block-below (.*(\n|\r))+\s+\/\* grunt-remove-block-above \*\//gm,
		replacement: ''
	},{
		pattern: '/*[[syntax-theme]]*/',
		// add selected theme
		replacement: config.newTheme
	}];

	// userstyles.org - remove defaults & leave placeholders
	config.replacements_user = [{
		pattern: /\/\*\[\[bg-choice\]\]\*\/ url\(.*\)/,
		replacement: '/*[[bg-choice]]*/'
	},{
		pattern: '/*[[bg-attachment]]*/ fixed',
		replacement: '/*[[bg-attachment]]*/'
	},{
		pattern: /\/\*\[\[base-color\]\]\*\/ #\w{3,6}/g,
		replacement: '/*[[base-color]]*/'
	},{
		pattern: /\/\*\[\[visited-color\]\]\*\/ #\w{3,6}/g,
		replacement: '/*[[visited-color]]*/'
	},{
		// remove default syntax theme
		pattern: /\s+\/\* grunt-remove-block-below (.*(\n|\r))+\s+\/\* grunt-remove-block-above \*\//m,
		replacement: ''
	}];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: config,

		'string-replace': {
			inline: {
				files: { '<%= config.buildFile %>' : '<%= config.sourceFile %>' },
				options: { replacements: '<%= config.replacements %>' }
			},
			mark: {
				files: { '<%= config.buildFile %>' : '<%= config.buildFile %>' },
				options: {
					replacements: [{
						pattern: /\/\*\[\[/gm,
						replacement: '/*![['
					}]
				}
			},
			unmark: {
				files: { '<%= config.buildFile %>' : '<%= config.buildFile %>' },
				options: {
					replacements: [{
						pattern: /\/\*\!\[\[/gm,
						replacement: '/*[['
					}]
				}
			},
			fix: {
				files: { '<%= config.buildFile %>' : '<%= config.buildFile %>' },
				options: {
					replacements: [{
						pattern: /\;\:\/\*\[\[/gm,
						replacement: ';/*[['
					}]
				}
			},
			// Webkit browser, unwrap main @-moz-document
			webkit : {
				files: { '<%= config.buildFile %>' : '<%= config.buildFile %>' },
				options: {
					replacements: [{
						pattern: /(@-moz-document(.*)\{(\n|\r)+)/m,
						replacement: ''
					},{
						pattern: /\/\* grunt-webkit-remove-to-end-of-file(.*(\n|\r))+\}$/gm,
						replacement: ''
					}]
				}
			},
			// remove webkit placeholder
			webkitplaceholder: {
				files: { '<%= config.buildFile %>' : '<%= config.buildFile %>' },
				options: {
					replacements: [{
						pattern: ' /* grunt-webkit-remove-to-end-of-file */',
						replacement: ''
					}]
				}
			}
		},
		clean: {
			themes: {
				src: [ 'themes/*.min.css' ]
			}
		},
		cssmin: {
			minify: {
				files: { '<%= config.buildFile %>' : '<%= config.buildFile %>' },
				options: {
					keepSpecialComments: '*',
					advanced: false
				}
			},
			themes: {
				files: [{
					expand : true,
					cwd : 'themes/src/',
					src : '*.css',
					dest : 'themes/',
					ext : '.min.css'
				}],
				options: {
					keepSpecialComments: '*',
					advanced: false
				}
			}
		},
		watch: {
			css: { files: [ 'stackoverflow-dark.css' ] }
		}
	});

	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// build custom stackoverflow-Dark style using build.json settings
	grunt.registerTask('default', 'Building custom style', function() {
		config.buildFile = config.buildFile.replace('.min.css', '.css');
		grunt.task.run(['string-replace:inline']);
		if (config.webkit) {
			grunt.task.run(['string-replace:webkit']);
		} else {
			grunt.task.run(['string-replace:webkitplaceholder']);
		}
	});
	// build custom minified stackoverflow-Dark style
	grunt.registerTask('minify', 'Building custom minified style', function() {
		grunt.task.run(['string-replace:inline']);
		if (config.webkit) {
			grunt.task.run(['string-replace:webkit']);
		}
		grunt.task.run(['cssmin:minify']);
	});

	// build userstyle for pasting into https://userstyles.org/styles/35345/stackoverflow-dark
	grunt.registerTask('user', 'building userstyles.org file', function () {
		config.buildFile = 'stackoverflow-dark-userstyle.build.css';
		config.replacements = config.replacements_user;
		grunt.task.run([
			'string-replace:inline',
			'string-replace:webkitplaceholder'
		]);
	});
	grunt.registerTask('usermin', 'building userstyles.org file', function () {
		config.buildFile = 'stackoverflow-dark-userstyle.build.css';
		config.replacements = config.replacements_user;
		grunt.task.run([
			'string-replace:inline',
			'string-replace:mark',
			'cssmin:minify',
			'string-replace:unmark',
			'string-replace:fix'
		]);
	});

	// build custom minified stackoverflow-Dark style
	grunt.registerTask('themes', 'Rebuild minified theme files', function() {
		grunt.task.run([
			'clean',
			'cssmin:themes'
		]);
	});

	// watch thingy
	grunt.registerTask('dev', ['watch']);

};
