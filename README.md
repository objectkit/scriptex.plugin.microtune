# scriptex.plugin.project.template
###### 1.0.0-rc THIS README IS PRE-RELEASE GUIDANCE ONLY AND IS SUBJECT TO CHANGE
> Develop and test MIDI processors for the Scripter MIDI FX Plugin in your IDE

This project uses [@objectkit/scriptex](https://github.com/objectkit/scriptex) and [@objectkit/scriptex.mock](https://github.com/objectkit/scriptex.mock) in conjunction with a build tool specialisation that can copy build file contents to system pasteboard, providing the means for a quick smoke test workflow between your code editor and the Scripter MIDI-FX Plugin Code Editor.

## Commands

### Automatic build and test
```bash
$ npm run watch
```
This script watches for file changes in `src/main/js` and `src/test/js`. Changes to src/main will invoke the build process, and changes to src/test will invoke the test process. Both processes should work in harmony. Watch can be cancelled by exiting the command with the BREAK shortcut [control+C or command+.](https://support.apple.com/en-gb/guide/terminal/trmlshtcts/mac)

###### Documenting your plugin
This project uses JSDoc for code documentation.
```bash
$ npm run doc
```

###### Project hygeine
This sanitising command deletes the `out` and `doc` directories.
```bash
$ npm run clean
```
###### npm run clean

## Customising the project
- change the package name, author, repo,

The package name is the import path for source.js

If the package name was "acme-plugin" and the version was "2.3.4-beta"

```json
{
  "name": "acme-plugin",
  "version": "2.3.4-beta",
}
```
Then you would import files from that module in test code like so

```js
import { AcmePlugin } from "acme-plugin"
```

When you build it and REPORT=1, you will see

```bash
       ✓ acme-plugin v2.3.4-beta

  file : out/preset.js
  size : 1.18 kB
  meta : MINIFY=1
       : PBCOPY=1
       : HEADER=0
       : FORMAT=0

```
## Getting Started
- clone this project:
```bash
$ # cloning advice
```
- install dependencies
```bash
$ npm install
```
- inspect the existing template source code to see how the project works
  - ./src/main/js/example/main.js
  - ./src/main/js/example/NewPlugin.js
  - ./src/test/js/example/NewPluginSpec.js

Please delete these files once you understand how the relationship between them and the test and build processes is understood.

When there are no files in `src/main/js` and the build script is invoked, then this warning will be printed to console:

```bash
$ npm run build
$ Generated an empty chunk: "_virtual:multi-entry"
```

When there are no specs in `src/main/test` to test, then this error will be printed to console.
```bash
$ npm run test
$ Error: No test files found: "src/test/js/**/[A-Z]*Spec.js"
```

## Understanding the build process
There are two build files: an ES6 library module containing all of your source code named `source.js` distributable file named `preset.js` for deployment to the Scripter plugin itself.

###### source.js
This build process produces an ES6 library module that includes all source files except for entry files named "main.js".
- scan `src/main/js` for entry files that are not named `main.js`
- build and minify `./out/source.js`
The `source.js` file can be used to expose individual classes and exported objects to test code, but it can also be used to develop a standalone repetoire library that you may want to use in other projects. The decision is left wide open and only the test process uses this file in the default configuration.

###### preset.js
This produces a file for insertion directly into the Scripter Code Editor. You should treat this as a finished file that can be saved as a Scripter plugin preset in its own right.

- scan `src/main/js` for entry files named `main.js`
- build and minify `./out/preset.js` on the basis of that file

The default build configuration minifies both builds and puts them into the `out` directory.

### Customising the build process
Add a new `.env` file with the following content to the project root
```shell
# toggle minification (default: on)
;MINIFY=1
# toggle the copy to pasteboard feature (default: off)
;PBCOPY=0
# toggle reporting (default: off)
;REPORT=0
# toggle header comment (default: off)
;HEADER=0
# toggle pretty print (default: off)
;FORMAT=0
```

A feature is activated when it is uncommented and assigned the number 1.
A feature by deactivated when it is commented or has been assigned the number 0.

###### REPORT
Activate or deactivate build reports. This is deactivated by default.
The REPORT is active, then a report is printed to console each time the preset file is built.

```
✓ scriptex.plugin.project.template v0.1.0

file : out/preset.js
size : 1.25 kB
meta : MINIFY=1
     : BANNER=1
     : PRETTY=0
     : PBCOPY=0
```

The checkbox is green when `PBCOPY` is active, and grey when `PBCOPY` is inactive.
The name and version fields are read directly from `package.json`.

`file` points to the location of the build file.
`size` points out the kilobytes size of the build file.
`meta` points out the build configuration used

###### PBCOPY
Make the build tool copy the contents of preset.js to the system pasteboard. This enables a quick "save and paste" worklow - save the file in your IDE, build it, then select Code Editor and simply paste into it.

###### MINIFY
Turn minification of `./out/preset.js` ON (1) or OFF (0).
This is useful for debugging in the Scripter Code Editor. You may also use the `FORMAT` option to beautify the minified code which can also be useful for debugging in the Scripter Code Editor

###### HEADER
Add a comment of the following form to the header of `preset.js`.
```js
/* ${NAME} v${VERSION} license: ${LICENSE} */
```
The property fields `${NAME}` `${VERSION}` and `${LICENSE}` are read from the corresponding property fields of `package.json` which you should change when developing your own plugins.

When this projects package has not been altered, the default comment is this:
```js
/* scriptex.plugin.project.template v0.1.0 license: Apache-2.0 */
```

###### FORMAT
This option will beautify _minified code only_. This is useful for debugging runtime code in the Scripter Code Editor.
