import { Plugin } from "@objectkit/scriptex"

/**
 * This placeholder plugin exists to safguard the project configuration only.
 * Delete these files to correctly initialise the project,
 *
 *  src/main/js/example/main.js
 *  src/main/js/example/NewPlugin.js
 *  src/test/js/example/NewPluginSpec.js
 *
 * @extends Plugin
 */
class NewPlugin extends Plugin {
  /** @lends Scripter.NeedsTimingInfo */
  get needsTiming () { return true }
  /** @lends Scripter.ResetParameterDefaults */
  get needsDefaults () { return true }
  /** @lends Scripter.PluginParameters */
  get parameters () { return [] }
  /** @lends Scripter.HandleMIDI */
  onMIDI () {}
  /** @lends Scripter.ParameterChanged */
  onParameter () {}
  /** @lends Scripter.ProcessMIDI */
  onProcess () {}
  /** @lends Scripter.Idle */
  onIdle () {}
  /** @lends Scripter.Reset */
  onReset () {}
}

export { NewPlugin }
