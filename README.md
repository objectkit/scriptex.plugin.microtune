# About
The MicrotunePlugin is a proof of concept constructed to demonstrate how a bespoke midi processor can be implemented and tested in an IDE environment.

As the plugin is intrinsically simple, the functonal simplicity of its implementation can be easliy expressed within terms of the native Scripter API:

```js
const PluginParameters= [
  {
    name: `< M i c r o t u n e >`
  , type: `lin`
  , minValue: -8192
  , maxValue: 8191
  , defaultValue: 0
  , numberOfSteps: 16384
  }
]
function ParameterChanged (key, val) {
  const bend= new PitchBend()
  bend.value= val
  SendMIDIEventNow(bend)
}
```
That said, the benefit of using the Scriptex library to achieve the same functionality does appear overly instrumented, but it does provide the means for `Pure Land` development cycles before committing to robust test and release cycles. It brings the fun back to the development process.

```js
class MicrotuneView extends Array {

  static get SLIDER () {
    return {
      ID: `microtune`
    , name: `< M i c r o t u n e >`
    , type: `lin`
    , minValue: -8192
    , maxValue: 8191
    , defaultValue: 0
    , numberOfSteps: 16384
    }
  }

  constructor () {
    super(new.target.SLIDER)
  }
}

export { MicrotuneView }
```

```js
import { MicrotuneView } from "path/tp/MicrotuneView"
class MicrotunePlugin extends DefaultPlugin {
  /** @lends Scripter.PluginParameters */
  get params () {new MicrotuneView() }

  set microtune (val) {
    this.applyPitchBend(val)
  }

  applyPitchBend (val) {
    const bend= new PitchBend()
    bend.value= val
    bend.send()
  }
}
export { MicrotunePlugin }
```

The benefit is that the class implementation can easily be extended with additional benefits that may not suit a static implementation, and that the view can be developer indenpendently of the plugin.

```js
class MicrotuneView extends Array {

  static get BANNER () {
    return {
    , name: `< M i c r o t u n e >`
    , type: `text`
    , index: 0
    }
  }

  static get SLIDER () {
    return {
      ID: `microtune`
    , name: ` `
    , type: `lin`
    , minValue: -8192
    , maxValue: 8191
    , defaultValue: 0
    , numberOfSteps: 16384
    , index: 1
    }
  }

  static get BUTTON () {
    return {
      ID: `reset`
    , name: `Reset`
    , type: `momentary`
    , index: 2
    }
  }

  constructor () {
    super(
      new.target.BANNER
    , new.target.SLIDER
    , new.target.BUTTON
    )
  }
}

export { MicrotuneView }
```

```js
import { MicrotuneView } from "path/tp/MicrotuneView"
class MicrotunePlugin extends DefaultPlugin {

  /** @lends Scripter.PluginParameters */
  get params () {new MicrotuneView() }

  set reset (val) {
    this.resetView()
  }

  set microtune (val) {
    this.applyPitchBend(val)
  }

  applyPitchBend (val) {
    const bend= new PitchBend()
    bend.value= val
    bend.send()
  }

  /**
   * This invocation begets the following chain of events:
   *
   *  1. SetParameter effectively calls ParameterChanged
   *  2. ParameterChanged calls #onParam
   *  3. #onParam sets #microtune to defaultValue
   *  4. #microtine calls #applyPitchBend
   *  5. #applyPitchBend sends new PitchBend
   *
   * @return {void}
   */    
  resetView () {
    this.writeParameter( 1 , 0 )
  }

  writeParam (key, val) {
    this.system.SetParameter(key, val)
  }
}
export { MicrotunePlugin }
```
