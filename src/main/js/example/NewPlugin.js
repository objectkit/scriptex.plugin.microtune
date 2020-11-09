import { Plugin } from "@objectkit/scriptex"

/**
 * This is a placeholder class file.
 *
 * It manifests the full Scriptex interface and should pass all tests.
 * 
 * @example <caption>Test Results</caption>
 *   NewPlugin
 *     #needsTiming
 *       is read by Scripter.NeedsTimingInfo
 *     #needsDefaults
 *       is read by Scripter.ResetParameterDefaults
 *     #parameters
 *       is read by Scripter.PluginParameters
 *     #onMIDI
 *       is called by Scripter.HandleMIDI
 *     #onProcess
 *       is called by Scripter.ProcessMIDI
 *     #onParameter
 *       is called by Scripter.ParameterChanged
 *     #onReset
 *       is called by Scripter.Reset
 *     #onIdle
 *       is called by Scripter.Idle
 *
 *
 * @extends Plugin
 * @see [main.js]{@link src/main/js/example/main.js}
 * @see [NewPluginSpec]{@link src/test/js/example/NewPluginSpec.js}
 */
class NewPlugin extends Plugin {
  /** @lends Scripter.NeedsTimingInfo */
  get needsTiming () { return true }
  /** @lends Scripter.ResetParameterDefaults */
  get needsDefaults () { return true }
  /** @lends Scripter.PluginParameters */
  get parameters () { return [] }
  /** @lends Scripter.HandleMIDI */
  onMIDI (event) {}
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
