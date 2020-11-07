# scriptex.plugin.project.template

## Customising builds
There are two build cycles:

#### build/source
This build process produces an ES6 library module that includes all source files except for entry files named "main.js".
You can use it as
- scan `src/main/js` for entry files that are not named `main.js`
- build and minify `./out/source.js`


#### build/preset
- scan `src/main/js` for entry files named `main.js`
- build and minify `./out/preset.js` on the basis of that file

The default build configuration minifies both builds and puts them into the `out` directory.

Add a new `.env` file to the project root
```shell
# toggle minificatio
MINIFY=1
# toggle banner
BANNER=0
# toggle pretty print
PRETTY=0
# toggle the copy to pasteboard feature
PBCOPY=0
# toggle reporting
REPORT=0
```

Set values to 1 to activate.
Set values to 0 to deactivate.


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
This is useful for debugging in the Scripter Code Editor. You may also use the `PRETTY` option to beautify the minified code which can also be useful for debugging in the Scripter Code Editor

###### BANNER
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
