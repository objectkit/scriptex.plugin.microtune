import chai from "chai"
import sinon from "sinon"
import { Plugin } from "@objectkit/scriptex"
import { VirtualScripterEnvironment, ProgramChange } from "@objectkit/scriptex.mock"

import { NewPlugin } from "scriptex.plugin.project.template"

const{assert}= chai
const virtual= new VirtualScripterEnvironment(global)
const sandbox= sinon.createSandbox()

describe(`NewPlugin`, () => {

  before(() => {
    sinon.assert.expose(chai.assert, { prefix: "" });
  })

  beforeEach(() =>{
    virtual.applyEnvironment()
  })

  afterEach(() => {
    virtual.unapplyEnvironment()
    sandbox.restore()
  })

  specify(`OK`, () => {

    const PARAM_INDEX= 0
    const PARAM_VALUE= 1
    const PROGRAM_CHANGE= new ProgramChange()

    NewPlugin.CONFIGURABLE= true

    const { plugin, system, api }= virtual.deployPlugin(NewPlugin)
    const { onMIDI, onProcess, onIdle, onReset, onParameter }= sandbox.spy(plugin)

    assert.instanceOf(plugin.parameters, Array)
    assert.strictEqual(PluginParameters, plugin.parameters)

    assert.isTrue(plugin.needsTiming)
    assert.strictEqual(NeedsTimingInfo, plugin.needsTiming)

    assert.isTrue(plugin.needsDefaults)
    assert.strictEqual(ResetParameterDefaults, plugin.needsDefaults)

    HandleMIDI(PROGRAM_CHANGE)
    assert.calledWith(onMIDI, PROGRAM_CHANGE)

    ParameterChanged(PARAM_INDEX, PARAM_VALUE)
    assert.calledWith(onParameter, PARAM_INDEX, PARAM_VALUE)

    ProcessMIDI()
    assert.calledOnce(onProcess)

    Idle()
    assert.calledOnce(onIdle)

    Reset()
    assert.calledOnce(onReset)
  })
})
