import sinon from "sinon"
import chai from "chai"
import { PitchBend, VirtualScripterEnvironment } from "@objectkit/scriptex.mock"
import { Microtuner } from "scriptex.plugin.microtuner"

describe(`Microtuner|Scripter Integration`, () => {

  const{assert}= chai
  const sandbox= sinon.createSandbox()
  const virtual= new VirtualScripterEnvironment(global)

  before(() => {
    sinon.assert.expose(chai.assert, { prefix: "" })
  })

  beforeEach(() => {
    virtual.applyEnvironment()
  })

  afterEach(() => {
    virtual.unapplyEnvironment()
    sandbox.restore()
  })

  /* global UpdatePluginParameters, Event, SetParameter, GetParameter */
  describe(`Given MicrotunePlugin is deployed to Scripter`, () => {
    describe(`When #microtuning is set to cents`, () => {
      describe(`Then #applyPitchBend is passed units (cents * 40.96)`, () => {
        specify(`And new PitchBend#value=units is sent.`, () => {

          /* permit spies to wrap the integration */
          Microtuner.CONFIGURABLE= true

          const { plugin, system } = virtual.deployPlugin(Microtuner)
          const [ { minValue, maxValue, defaultValue } ]= plugin.parameters
          const { applyPitchBend, onParameter }= sandbox.spy(plugin)
          const { SendMIDIEventNow, ParameterChanged }= sandbox.spy(system)
          const { send } = sandbox.spy(Event.prototype )

          UpdatePluginParameters()

          const runScenario = (cents) => {

            SetParameter(0, cents)

            {
              assert.callOrder(
                ParameterChanged
                , onParameter
                  , applyPitchBend
                    , send
                      , SendMIDIEventNow
              )

              const { lastCall: { firstArg: pitchBend } }= SendMIDIEventNow
              const { value: units }= pitchBend
              assert.instanceOf(pitchBend, PitchBend)
              assert.strictEqual(units, Microtuner.unitsForCents(cents) )
              assert.strictEqual(GetParameter(0), cents )
            }
          }

          runScenario(minValue)
          runScenario(maxValue)
          runScenario(defaultValue)
        })
      })
    })

    describe(`When #onReset is called by Scripter.Reset`, () => {
      describe(`Then #onReset calls Scripter.UpdatePluginParameters`, () => {
        specify(`And new PitchBend#value=[last_pitch_bend_value] is sent.`, () => {
          /* permit spies to wrap the integration */
          Microtuner.CONFIGURABLE= true

          const { plugin, system } = virtual.deployPlugin(Microtuner)
          const [ { minValue, maxValue, defaultValue } ]= plugin.parameters
          const { applyPitchBend, onParameter }= sandbox.spy(plugin)
          const { SendMIDIEventNow, ParameterChanged, UpdatePluginParameters }= sandbox.spy(system)
          const { send } = sandbox.spy(Event.prototype )

          const runScenario= (cents) => {

            const expectedUnits= Microtuner.unitsForCents(cents)

            {
              SetParameter(0, cents)
            }

            /* confirm the #value of the first pitchbend sent */
            assert.calledOnce(SendMIDIEventNow)
            assert.strictEqual(SendMIDIEventNow.lastCall.firstArg.value, expectedUnits)

            {
              system.Reset()
            }

            /* confirm the order of system events arsiing after calling Reset */
            assert.callOrder(
              UpdatePluginParameters
              , ParameterChanged
                , SendMIDIEventNow
            )

            /* confirm that the #value of the second pitchbend is the same as the first */
            assert.calledTwice(SendMIDIEventNow)
            assert.strictEqual(SendMIDIEventNow.lastCall.firstArg.value, expectedUnits )

            sandbox.resetHistory()
          }

          runScenario(minValue)
          runScenario(defaultValue)
          runScenario(maxValue)
        })
      })
    })
  })
})
