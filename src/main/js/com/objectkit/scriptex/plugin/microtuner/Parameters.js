/**
 * The Microtuner plugins user interface, or in other words,
 * this plugins definition of Scripter.PluginParameters
 * @extends Array
 * @see {@link Microtuner#parameters}
 */
class Parameters extends Array {

  /**
   * The microtuning slider determines the pitchbend value
   *
   * Changes to this slider influences the value of pitch bends sent by Microtuner
   * @type {Object}
   * @see {@link Microtuner#microtuning}
   */
  static get MICROTUNING () {
    return {
      ID: `microtuning`
      , name: ` m i c r o t u n e r `
      , type: `lin`
      , unit: `\u00A2` /* cent symbol */
      , minValue: -100
      , maxValue: 100
      , numberOfSteps: 200
      , defaultValue: 0
    }
  }

  constructor () {
    super(new.target.MICROTUNING)
  }
}

export { Parameters }
