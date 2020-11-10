# scriptex.plugin.project.template
###### 1.0.0-rc DRAFT
> Develop, test and publish MIDI processors for the Scripter MIDI FX Plugin from your IDE

```bash
.
├── doc                                     # Optional project documentation.
├── env                                     # Tooling and configuration.
├── out                                     # Compiled files produced by build process.
│   ├── preset.js                           # - suitable for running in Scripter Code Editor.
│   └── source.js                           # - suitable for testing on Node.
├── src                                     # Source files.
│   ├── main                                # Main files related soley to the plugin.
│   │   └── js                              #
│   │       └── example                     #      
│   │           ├── main.js                 # - An example plugin entry file.
│   │           └── ExamplePlugin.js        # - An example plugin class.
│   └── test                                # Test files related soley to testing the plugin.
│       └── js                              #
│           └── example                     #
│               └── ExamplePluginSpec.js    # - An example plugin spec.
└── .env                                    # - An optional build configuration override file.
```
This is a project template with a bespoke build tool for developing Scripter MIDI processors with the [@objectkit/scriptex](https://github.com/objectkit/scriptex) and [@objectkit/scriptex.mock](https://github.com/objectkit/scriptex.mock) libraries.

<!-- The project structure is inspired by the [Maven Standard Directory Layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html). -->

Check the [main.js](./src/main/js/example/main.js) entry file, the [ExamplePlugin](./src/main/js/example/ExamplePlugin.js) class, and the corresponding [ExamplePluginSpec](./src/test/js/example/ExamplePluginSpec.js) to understand the relationships between plugin files or [initialise the project](#project-customisation) for a clean start.

## Requirements
Use [Terminal](https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac) to ensure that [Git](https://github.com/git-guides/install-git#install-git-from-homebrew) and [NodeJS](https://nodejs.dev/learn/how-to-install-nodejs) are installed on your system before running [setup](#setup).
```bash
#
# If "git not found" appears, install Git:
#   https://github.com/git-guides/install-git#install-git-from-homebrew
#
# If "node not found" appears, install Node:
#   https://nodejs.dev/learn/how-to-install-nodejs
#
which git node
```

## Setup
Clone this repo and install the project to your local system.
```bash
#
# In longhand form:
#   $ git clone https://github.com/objectkit/scriptex.plugin.project.template.git newplugin
#   $ cd ./newplugin
#   $ npm install
#  
# You should change "newplugin" to the name of your own plugin.
#   
git clone https://github.com/objectkit/scriptex.plugin.project.template.git newplugin && cd $_ && npm i
```
Automatic [tests](src/test/js/example/ExamplePluginSpec.js) should pass.
```spec
ExamplePlugin
  #needsTiming
    ✓ is read by Scripter.NeedsTimingInfo
  #needsDefaults
    ✓ is read by Scripter.ResetParameterDefaults
  #parameters
    ✓ is read by Scripter.PluginParameters
  #onMIDI
    ✓ is called by Scripter.HandleMIDI
  #onProcess
    ✓ is called by Scripter.ProcessMIDI
  #onParameter
    ✓ is called by Scripter.ParameterChanged
  #onReset
    ✓ is called by Scripter.Reset
  #onIdle
    ✓ is called by Scripter.Idle

8 passing
```
## Workflow
Build the project to produce both the *`source.js`* and *`preset.js`* files.
```bash
#
# The build process produces two files in the 'out' directory.
#   .
#   out                                   
#     ├── preset.js
#     └── source.js
#     
# The preset.js file is a global script suitable for running in Scripter.
# The source.js file is a library module that excludes main.js that is suitable for testing on Node.
#  
npm run build
```
Build docs to [produce documentation](https://jsdoc.app).
```bash
#
# Use the doc script to produce documentation from source files
# .
# └──doc                                   
#
npm run doc
```
Run tests manually.
```bash
#
# Run the project tests
#
npm run test
```
Clean build files to remove clutter
```bash
#
# Delete build files and directories (out and doc)
#
npm run clean
```
Manage the build configuration.
```bash
#
# Add this content to a file named .env in the project root.
# Change settings to configure the buildPreset process.
# @see env/gulp/task/build.js#buildPreset
#
# toggle minification (default: 1)
MINIFY=1
# toggle the copy to pasteboard feature (default: 0)
PBCOPY=0
# toggle reporting (default: 0)
REPORT=0
# toggle header comment (default: 0)
HEADER=0
# toggle pretty print of minified files only (default: 0)
FORMAT=0
```

> + When REPORT is activated, build reports are printed to console.
> + When MINIFY is activated, build scripts are minified. Turn this off to investigate build file characteristics.
> + When PBCOPY is activated there is no need to manually locate, open, select and copy the file contents; the build tool does this for you automatically in the background.
> + When HEADER is activated the build file is given a header comment derived from package metadata.
> + When FORMAT is activated the minified build file is pretty printed as a debug aid

Automate build/test cycles with watch mode.
```bash
#
# Changes to files in src/main will trigger build and test cycles.
#
# Force quit watch with control+C or command+:
#   https://support.apple.com/en-gb/guide/terminal/trmlshtcts/mac#trmla9087c1b
#   
# NB the "watch/main" and "watch/test" scripts are also available in package.json
#
npm run watch
```
### Example
- Set **PBCOPY=1** and **REPORT=1** in *`.env`*
- Enter watch mode.
- Open the [ExamplePlugin](./src/main/js/example/ExamplePlugin.js) class file
- Resave it to trigger a build/test cycle
- A build report is printed to console:
```bash

     ✓ scriptex.plugin.project.template v0.1.0

file : out/preset.js
size : 1.26 kB
data : MINIFY=1,PBCOPY=1,HEADER=1,FORMAT=0
```
> + Plugin name and version are read from package.json
> + file is the path to the build file
> + size is the kB size of the build file
> + conf is the configuration of the build process

Open [Scripter Code Editor](https://support.apple.com/en-gb/guide/logicpro/lgcecc16550d/mac), press **command+v** to paste from the system pasteboard, then press `Run Script` to run your plugin.

## Project Customisation.
- Change the [package name](./package.json) to redefine the import path to `out/source.js`.
> The default package name of `scriptex.plugin.project.template` is intentionally gnarly. See how [ExamplePluginSpec](./src/test/js/example/ExamplePluginSpec.js) imports [ExamplePlugin](./src/main/js/example/ExamplePlugin.js) by this path for point of reference.
- Delete example source files and prior builds with this command.
```bash
rm -rf out doc src/main/js/example src/test/js/example
```
> Avoid avoid "Generated an empty chunk" warnings by adding a build target named `main.js` anywhere beneath `src/main/js`

> Avoid "No test files found" errors by adding specs anywhere beneath `src/test/js`!

---

- [x] [![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/paypalme/objectkit)
