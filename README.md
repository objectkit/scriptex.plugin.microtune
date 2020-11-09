# scriptex.plugin.project.template
###### 1.0.0-rc DRAFT
> Develop, test and publish MIDI processors for the Scripter MIDI FX Plugin from your IDE

This is a project template with a bespoke build tool for developing midi processors with the [@objectkit/scriptex](https://github.com/objectkit/scriptex) and [@objectkit/scriptex.mock](https://github.com/objectkit/scriptex.mock) libraries.

Check the [main.js](./src/main/js/example/main.js) entry file, the [NewPlugin](./src/main/js/example/NewPlugin.js) class, and the corresponding [NewPluginSpec](./src/test/js/example/NewPluginSpec.js) to see the relationships between these example files.

<!-- The project structure is inspired by the [Maven Standard Directory Layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html). -->

    .
    ├── doc                                   #   Project documentation
    ├── env                                   #   Tooling, configuration, utilities.
    ├── out                                   #   Compiled files produced by build process
    │   ├── preset.js                         #   - suitable for running in Scripter Code Editor
    │   └── source.js                         #   - suitable for testing on Node
    └── src                                   #   Source files
        ├── main                              #   - Main files related to developing a plugin
        │   └── js                             
        │       └── example                           
        │           ├── main.js               #   - An example plugin entry file        
        │           └── NewPlugin.js          #   - An example plugin class
        └── test                              #   - Test files related to testing that plugin
            └── js                             
                └── example                    
                    └── NewPluginSpec.js      #   - An example plugin spec

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
Read the test results printed during installation.
```bash
  NewPlugin
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
Build the project to produce both the `source.js` and `preset.js` files:
```bash
#
# The build process produces two files in the 'out' directory
#   .
#   out                                   
#     ├── preset.js
#     └── source.js
#
# The source.js file is a library module suitable for testing on Node
# The preset.js file is a global script suitable for running in Scripter
#  
npm run build
```

Customise the build process with a new file named `.env` in the project root.
```bash
#
# Configure the buildPreset process
# @see env/gulp/task/build.js#buildPreset
#

# toggle minification (default: on)
MINIFY=1
# toggle the copy to pasteboard feature (default: off)
PBCOPY=1
# toggle reporting (default: off)
REPORT=1
# toggle header comment (default: off)
HEADER=0
# toggle pretty print (default: off)
FORMAT=0
```
<!-- this should ne build -->
Build the project again:
```bash
npm run build
```
The newly available build report demonstrates that the "copy to pasteboard" feature ("PBCOPY") has been activated:
```bash
       ✓ scriptex.plugin.project.template v0.1.0

  file : out/preset.js
  size : 1.21 kB
  meta : MINIFY=1
       : PBCOPY=1
       : HEADER=0
       : FORMAT=0

```
Try this by putting [Scripter Code Editor](https://support.apple.com/en-gb/guide/logicpro/lgcecc16550d/mac) into focus and pressing `cmd+v`. The contents of `out/preset.js` should be pasted directly there without need to manually locate, open, select and copy the file contents.

## Scripts
###### watch
```bash
#
# Changes to files in src/main and src/test will trigger build and test cycles.
#
# Force quit watch with control+C or command+:
#   https://support.apple.com/en-gb/guide/terminal/trmlshtcts/mac#trmla9087c1b
#   
# NB the "watch/main" and "watch/test" scripts are also available in package.json
#
npm run watch
```
###### doc
```bash
#
# Use the doc script to produce documentation from source files
# .
# └──doc                                   
#
npm run doc
```
###### clean
```bash
#
# Delete build files and directories (out and doc)
#
npm run clean
```
###### build
```bash
#
# Build the projects source.js and preset.js files
#
npm run build
```
###### test
```bash
#
# Run the project tests
#
npm run test
```
## Customisation
### Project Name and Import Paths
Change the [package name](./package.json) to define the import path to `out/source.js`.

_Before..._
```json
{
  "name": "scriptex.plugin.project.template",
  ...
}
```
```js
import { NewPlugin } from "scriptex.plugin.project.template"
```
_After..._
```json
{
  "name": "newplugin",
  ...
}
```
```js
import { NewPlugin } from "newplugin"
```
### Managing clean initialisation of the project.
All three files exist for example only and can be deleted with the following command:
```bash
rm -rf src/main/js/example src/test/js/example
```
**NOTE**:
You will recieve warnings when you build the project without a build target (i.e. `main.js`)
```bash
Generated an empty chunk: "_virtual:multi-entry"
```
**NOTE**:
When build reporting is enabled, then you will also see this warning:
```bash

       ✓ scriptex.plugin.project.template v0.1.0

  file : out/preset.js
  size : 0.00 kB
  meta : MINIFY=1
       : PBCOPY=1
       : HEADER=0
       : FORMAT=0
```
**NOTE**:
You will recieve errors when you run tests but no test files are defined:
```bash
Error: No test files found: "src/test/js/**/[A-Z]*Spec.js"
```
