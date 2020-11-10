import { DefaultPlugin } from "@objectkit/scriptex"
import { Parameters } from "./Parameters"

/**
 * Specification:
 *
 *  pitch bend unit range / generic semitone reange / cents per semiton
 *
 * Pitch bend range is defined as [ 0..16383 ], which presents 16384 total steps.
 * @type {number}
 */
const UNITS_PER_CENT= ( ( 16384 / 4 ) / 100 ) /* 40.96 */

/**
 * Microtuner is a simple demonstrator plugin that issues
 * pitch bends within a one semitone range above and below
 * standard midi pitch tuning.
 *
 * @extends DefaultPlugin
 * @see https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message
 */
class Microtuner extends DefaultPlugin {

  /**
   * Convert cents to pitch bend units within a two semitone range.
   *
   * @param  {number} cents [description]
   * @return {number} The calculated integer result.
   */
  static unitsForCents (cents) {
    return ~~( cents * UNITS_PER_CENT )
  }

  /**
   * Define the Scripter UI.
   *
   * @lends Scriptex.SYSTEM.PluginParameters
   * @type {MicrotuneParams}
   */
  get parameters () {
    return new Parameters()
  }

  /**
   * Capture changes to the microtuning slider.
   *
   * @type {number}
   * @see [applyPitchBend]{@link Microtuner#applyPitchBend}
   * @see [DefaultPlugin#onParameter]{@link https://objectkit.github.io/scriptex/GenericPlugin.html#onParameter}
   */
  set microtuning (cents) {
    const units= Microtuner.unitsForCents(cents)
    this.applyPitchBend(units)
    return
  }

  /**
   * Send a PitchBend event.
   *
   * @param  {number} val A pitch bend value between -8192 and 8192
   * @return {void}
   */
  applyPitchBend (val) {
    const bend= new PitchBend()
    bend.value= val
    bend.send()
    return
  }

  /**
   * Maintain microtuning at playback and after Scripter reactivation.
   *
   * Calling UpdatePluginParameters leads to #applyPitchBend being called with its present values.
   *
   * @lends Scripter.Reset
   * @return {void}
   */
  onReset () {
    this.system.UpdatePluginParameters()
    return
  }
}

export { Microtuner }
