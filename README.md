# Stackoverflow Dark theme for Stylish
- Install from [userstyles.org](http://userstyles.org/styles/35345) (with customization options) or [manually](https://raw.githubusercontent.com/StylishThemes/Stackoverflow-Dark/master/stackoverflow-dark.css).
- Stylish is available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe), [Opera](https://addons.opera.com/en/extensions/details/stylish/), [Safari](http://sobolev.us/stylish/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).
- In versions 2.8.0+, this style will apply to *almost all* StackExchange sites.
- Use the [grunt build process](https://github.com/StylishThemes/StackOverflow-Dark/wiki/Build) to customize your GitHub Dark theme.
- Please refer to the [installation documentation](https://github.com/StylishThemes/StackOverflow-Dark/wiki/Install) for more details.

## Preview

![Stackoverflow Dark preview](http://StylishThemes.github.com/StackOverflow-Dark/images/screenshots/after.png)

## Available Syntax Highlighting Themes

|                |                      |                       |                         |             |
|----------------|----------------------|-----------------------|-------------------------|-------------|
| Desert         | Doxy                 | Hemisu Dark           | Sons of Obsidian        | Sunburst    |
| Tomorrow Night | Tomorrow Night Blue  | Tomorrow Night Bright | Tomorrow Night Eigthies | Vibrant Ink |

## Changelog

See the [full changelog](https://github.com/StylishThemes/Stackoverflow-Dark/wiki).

#### Version 2.8.3 (8/2/2015)

* Logo tweaks:
  * Stop header logo background image repeat.
  * Add updated stackoverflow logo & remove background-size contain.

#### Version 2.8.2 (8/2/2015)

* Moved screenshots into subfolder; add wiki subfolder.
* Optimize images/svg.
* Multiple site fixes
  * Switch to using hosted images instead of base64 encoded images. GitHub serves gh-pages on a CDN, so hopefully it won't cause any issues.
  * Add logo for ja, pt & ru stackoverflow sites.
  * Cleaned up logos for dba.stackexchange & mathoverflow sites.
  * Inverted header images for academia, dba, electronics & tex stackexchange sites.
  * See [issue #14](https://github.com/StylishThemes/StackOverflow-Dark/issues/14) for an updated list.

#### Version 2.8.1 (8/1/2015)

* Fix `@-moz-document regexp` not using double escaping

#### Version 2.8.0 (8/1/2015)

* Move `selogos` & `secss` folders into a `resource` folder.
* Add modified site logos for serverfault, stackapps, stackexchange & superuser.
* Add support for StackExchange & associated sites:
  * Not all sites have been throughly tested, so please [report any issues](https://github.com/StylishThemes/StackOverflow-Dark/issues).
  * Currently the following sites are not supported:
    * Area51 (http://area51.stackexchange.com/)
    * Gaming (http://gaming.stackexchange.com/)
    * Role Playing Games ( http://rpg.stackexchange.com/ )
  * Fixes [issue #10](https://github.com/StylishThemes/StackOverflow-Dark/issues/10).
* Add grunt build process & new options:
  * Choose a syntax highlighting theme (see readme for a list). Fixes [issue #13](https://github.com/StylishThemes/StackOverflow-Dark/issues/13)
  * Choose a default code font.
