import sinon from "sinon"
import chai from "chai"
import { Microtuner, Parameters } from "scriptex.plugin.microtuner"
import { PitchBend, VirtualScripter } from "@objectkit/scriptex.mock"

describe(`Microtuner`, () => {

  const sandbox= sinon.createSandbox()
  const{assert}= chai

  before(() => {
    sinon.assert.expose(chai.assert, { prefix: "" });
  })

  beforeEach(() => {
    global.PitchBend= PitchBend
  })

  afterEach(() => {
    delete global.PitchBend
    sandbox.restore()
  })

  context(`.unitsForCents(number):number`, () => {
    describe(`Given .unitsForCents is passed a cent value between -100 and 100 inclusive`, () => {
      specify(`Then the correct pitch bend integer is returned`, () => {
        /* specification */
        const CENTS_PER_SEMITONE= 100
        const TOTAL_UNIT_RANGE= 16384
        /* normative: 2 up, 2 down */
        const GENERIC_SEMITONE_RANGE= 4
        const UNITS_PER_SEMITONE= ( TOTAL_UNIT_RANGE / GENERIC_SEMITONE_RANGE )
        /* deduction */
        const UNITS_PER_CENT= ( UNITS_PER_SEMITONE / CENTS_PER_SEMITONE )

        /* pretest: formal checks */
        assert.strictEqual(UNITS_PER_CENT, 40.96)

        const { minValue, maxValue }= Parameters.MICROTUNING

        let cents= minValue

        while(++cents <= maxValue) {
          const expected= ~~(UNITS_PER_CENT * cents)
          assert.strictEqual(Microtuner.unitsForCents(cents), expected)
        }
      })
    })
  })

  context(`#microtuning:number`, () => {
    describe(`When #microtuning is set to a cent value`, () => {
      specify(`Then #microtuning passes a unit value to #applyPitchBend`, () => {
        const CENTS= 7
        const UNITS= Microtuner.unitsForCents(CENTS)
        const spy= sandbox.spy(Microtuner.prototype, `applyPitchBend`)

        {
          new Microtuner()
            .microtuning= CENTS
        }

        assert.calledWith(spy, UNITS)
      })
    })
  })

  context(`#applyPitchBend(val:number)`, () => {
    describe(`When val is passed to #applyPitchBend`, () => {
      specify(`Then new PitchBend{#value=val} is sent`, () => {
        const VALUE= 5
        const spy= sandbox.spy(PitchBend.prototype, `value`, [`set`]).set

        {
          new Microtuner()
            .applyPitchBend(VALUE)
        }

        assert.calledWith(spy, VALUE)
      })
    })
  })
})
