# hatter-v2

Pattern Lab version of The Hatter style-guide for MidCamp.org

## Getting Started

Prerequisite: NodeJS - https://nodejs.org/en/

Install dependencies:

`npm install` 

Run Pattern Lab in watch mode (watches for changes in patterns and scss):

`npm start`

Pattern Lab can then be viewed at http://127.0.0.1:3000

## Structure

The  bulk of the code lives in the appropriately named `source` directory. Within sourcethe `_patterns` directory 
contains the elements, components, and templates that make up this style guide.

`source/scss` contains the main scss file for the project (styles.scss) and any scss partials not directly related to 
patterns in the system. Long term, most of the remaining partials in `source/scss/components` should be moved alongside 
a related pattern in `_patterns`

Image and svg assets are contained in `source/imgs` and `source/svg` respectively.

Compiled assets land in the `dist` directory. At the moment this is ignored by version control. Depending on the build 
process for the theme that uses this as a dependency, we may want to change that.

### Editing patterns

If for example we wanted to make adjustments to the news teaser component, we'd edit the source files in 
`source/_patterns/01-components/news-teaser`

`_c-news-teaser.scss` is a sass partial containing styles related to this component. The leading c- is namespacing to 
indicate that is a component.

`c-news-teaser.md` is a markdown file containing documentation for the component.

`c-news-teaser.twig` contains markup for the component.

### Creating new patterns

To create a new pattern, create a new subdirectory in the appropriate top level pattern directory (01-components for 
example.)

A pattern must at least have a `pattern-name.twig` file containing markup for the pattern.

The following optional files can also be included:
`pattern-name.md` - [Documentation for the pattern](https://patternlab.io/docs/pattern-documenting.html)
`_pattern-name.scss` - sass partial for the pattern (it should automatically be detected when compining the main sass file.)
`pattern-name.(yml/json)` - [Data for the pattern](https://patternlab.io/docs/data-pattern-specific.html)

## Tooling

* `npm start` - launch Pattern Lab and Webpack in watch mode.
* `npm run watch` - run Webpack in watch mode
* `npm run dist` - build pattern library assets in producion mode
* `npm run pl:serve` - run Pattern Lab in development mode
* `npm run pl:build` - build static version of pattern library.
* `npm run pl:deploy` - build static version of pattern library and deploys to GitHub Pages.

## Pattern Lab Documentation

https://patternlab.io/docs/index.html

## Open Questions

* Should CSS be committed to repo?
* Do we want to compile js as part of build process?
* Strategy for including this pattern library as a dependency of the midcamp theme.

## Todo

* Deploy static Pattern Library export to Github pages.
* Move more components into _patterns
* Configure JS bundling so that it exists if we want to use it.

## Patches

* Patched the now abandoned Singularity GS to prevent warnings from node sass 
as outlined here: https://github.com/at-import/Singularity/issues/248
