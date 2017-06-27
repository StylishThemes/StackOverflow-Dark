<p align="center">
  <img alt="stackexchange-logo" src="https://rawgit.com/StylishThemes/logos/master/se.dark/sedark.svg" width="508">
  <br>
  <a href="https://github.com/StylishThemes/Stackoverflow-Dark/tags">
    <img src="https://img.shields.io/github/tag/StylishThemes/Stackoverflow-Dark.svg?label=%20tag%20" alt="Tag">
  </a>
  <a href="https://github.com/StylishThemes/Stackoverflow-Dark/stargazers">
    <img src="http://github-svg-buttons.herokuapp.com/star.svg?user=StylishThemes&repo=Stackoverflow-Dark&style=flat&background=007ec6" alt="Star">
  </a>
  <a href="http://github.com/StylishThemes/Stackoverflow-Dark/fork">
    <img src="http://github-svg-buttons.herokuapp.com/fork.svg?user=StylishThemes&repo=Stackoverflow-Dark&style=flat&background=007ec6" alt="Fork">
  </a>
  <a href="https://david-dm.org/StylishThemes/Stackoverflow-Dark?type=dev">
    <img src="https://img.shields.io/david/dev/StylishThemes/Stackoverflow-Dark.svg?label=%20devDependencies%20" alt="devDependencies">
  </a>
  <a href="https://gitter.im/StylishThemes/Lobby">
    <img src="https://img.shields.io/gitter/room/StylishThemes/Stackoverflow-Dark.js.svg?maxAge=2592000" alt="Gitter">
  </a>
</p>

- This dark theme applied to Stack Overflow and almost all Stack Exchange sites (except [Gaming](http://gaming.stackexchange.com/) and [Area 51](http://area51.stackexchange.com/)).
- Install from [userstyles.org](http://userstyles.org/styles/35345) (with customization options) or [manually](https://raw.githubusercontent.com/StylishThemes/Stackoverflow-Dark/master/stackoverflow-dark.css).
- Stylus is available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/styl-us/), [Chrome](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne) and [Opera](https://addons.opera.com/en-gb/extensions/details/stylus/).
- Stylish is available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe), [Opera](https://addons.opera.com/en/extensions/details/stylish/), [Safari](http://sobolev.us/stylish/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).
- In versions 2.8.0+, this style will apply to *almost all* Stack Exchange sites.
- Use the [grunt build process](https://github.com/StylishThemes/StackOverflow-Dark/wiki/Build) to customize your StackOverflow Dark theme.
- Please refer to the [installation documentation](https://github.com/StylishThemes/StackOverflow-Dark/wiki/Install) for more details.

## Preview

![Stack Overflow Dark preview](http://StylishThemes.github.com/StackOverflow-Dark/images/screenshots/after.png)

## Available Syntax Highlighting Themes

|                         |                          |                       |                         |
|-------------------------|--------------------------|-----------------------|-------------------------|
| Atelier-cave-dark       | Atelier-dune-dark        | Atelier-estuary-dark  | Atelier-forest-dark     |
| Atelier-heath-dark      | Atelier-lakeside-dark    | Atelier-plateau-dark  | Atelier-savanna-dark    |
| Atelier-seaside-dark    | Atelier-sulphurpool-dark | Desert                | Doxy                    |
| Hemisu Dark             | Monokai                  | Sons of Obsidian      | Sunburst                |
| Tomorrow Night          | Tomorrow Night Blue      | Tomorrow Night Bright | Tomorrow Night Eigthies |
| Tranquil Heart          | Vibrant Ink              | VSCode Monaco         |                         |

\* Reference the [Themes wiki](https://github.com/StylishThemes/StackOverflow-Dark/wiki/Themes) for more details.

## Changelog

See the [full changelog](https://github.com/StylishThemes/Stackoverflow-Dark/wiki).

### Version 2.10.4 (2017-06-27)

* SO:
  * Add `code` selector to font setting. See [issue #73](https://github.com/StylishThemes/StackOverflow-Dark/issues/73).
  * Style job recommendations panel.

### Version 2.10.3 (2017-06-14)

* Themes:
  * Add dark Atelier themes ([source](https://jmblog.github.io/color-themes-for-google-code-prettify/)).
  * Add monokai. Fixes [issue #71](https://github.com/StylishThemes/StackOverflow-Dark/issues/71) ([source](https://github.com/RaphaelDDL/google-prettify-monokai-theme)).
  * Added vscode Monaco inspired theme ([source](https://github.com/google/code-prettify/pull/447)).
* Meta:
  * Fix `@-moz-document` regexp escaping.
  * Grunt: fallback to basic syntax style if selected style doesn't exist.

### Version 2.10.2 (2017-06-07)

* SO:
  * Fix many GUI elements being underlined. Fixes [issue #63](https://github.com/StylishThemes/StackOverflow-Dark/issues/63).
  * Fix dots having a border around them in the user tab. Fixes [issue #66](https://github.com/StylishThemes/StackOverflow-Dark/issues/66).
  * Darken profile settings buttons. Fixes [issue #64](https://github.com/StylishThemes/StackOverflow-Dark/issues/64).
  * Style developer story elements. See [issue #65](https://github.com/StylishThemes/StackOverflow-Dark/issues/65).
  * Darken user card hover. Fixes [issue #67](https://github.com/StylishThemes/StackOverflow-Dark/issues/67).
* Portuguese Language:
  * Also apply the styling fixes to the main site.
* Meta:
  * Start using ISO 8601 format. Fixes [issue #68](https://github.com/StylishThemes/StackOverflow-Dark/issues/68).
  * Remove grunt watch method. Fixes [issue #69](https://github.com/StylishThemes/StackOverflow-Dark/issues/69).
