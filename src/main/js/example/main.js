/**
 * @fileOverview
 *
 * The main.js file is a build target required by this projects build process.
 *
 * Future versions of this project may support multiple build targets,
 * but for now, only one build target is supported.
 *
 * One improvised development strategy is:
 *
 * - create `main.js` in any child directory under `src/main/js`:
 *    e.g. src/main/js/vendor/plugin/main.js
 * - invoke `npm run watch`
 * - develop the plugin within main.js
 * - each time you save, you can paste the build into Scripter for on the fly testing
 * - give the plugin its own class file and import it back here when ready
 */
import { Scripter } from "@objectkit/scriptex"
import { ExamplePlugin } from "./ExamplePlugin"

/* deploy the plugin */
const bindings= ExamplePlugin.deploy()

/**
 * Trace an intro banner:
 *
 *    ExamplePlugin is fully integrated with the Scripter API:
 *
 *    NeedsTimingInfo
 *    ResetParameterDefaults
 *    PluginParameters
 *    HandleMIDI
 *    ProcessMIDI
 *    ParameterChanged
 *    Reset
 *    Idle
 */
Scripter.Trace(`
  ExamplePlugin is fully integrated with the Scripter API:

  ${bindings.join(`\n  `)}`)
