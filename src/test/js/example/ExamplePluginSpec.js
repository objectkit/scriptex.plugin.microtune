import chai from "chai"
import sinon from "sinon"
import { Scriptex } from "@objectkit/scriptex"
import { VirtualScripterEnvironment } from "@objectkit/scriptex.mock"
/* NB. the import path of the source.js module is defined by package.json #name */
import { ExamplePlugin } from "scriptex.plugin.project.template"

describe(`ExamplePlugin`, () => {
  const{assert}= chai
  const sandbox= sinon.createSandbox()
  const virtual= new VirtualScripterEnvironment(global)
  {
    sinon.assert.expose(assert, {prefix: ``})
  }

  /* decorate the global environment with Scripter */
  beforeEach( () => {
    virtual.applyEnvironment()
  })

  /* restore the global environment and all test entities */
  afterEach( () => {
    virtual.unapplyEnvironment()
    sandbox.restore()
  })

  /* Iterate the Scripter.API key-pairs and generate specs for each case */
  for (const [scripterKey, scriptexKey] of Scriptex.API) {
    describe(`#${scriptexKey}`, () => {
      /* When the plugin member is a method */
      if (`function` === typeof(ExamplePlugin.prototype[scriptexKey])) {
        /* Then specify the method spec */
        specify(`is called by Scripter.${scripterKey}`, () => {
          const methodArgs= [0, 1]
          /* deploy the plugin */
          const { plugin }= virtual.deployPlugin(ExamplePlugin)
          /* spy the plugin method */
          const pluginMethod= sandbox.spy(plugin, scriptexKey)
          /* a reference to the system method */
          const systemMethod= Reflect.get(global, scripterKey)
          /* confirmation */
          assert.notCalled(pluginMethod)
          assert.isFunction(systemMethod)
          /* invoke the system method */
          Reflect.apply(systemMethod, undefined, methodArgs)
          /* assert it called the plugin method */
          assert.calledOnce(pluginMethod)
          assert.calledWith(pluginMethod, ...methodArgs)
        })
      }
      /* When the plugin member is not a method */
      else {
        /* Then specify the field spec */
        specify(`is read by Scripter.${scripterKey}`, () => {
          /* deploy the plugin */
          const { plugin, system }= virtual.deployPlugin(ExamplePlugin)
          /* define the value of the plugin field */
          const pluginVal= Reflect.get(plugin, scriptexKey, plugin)
          /* define the value of the system field */
          const systemVal= Reflect.get(system, scripterKey, system)
          /* assert value parity */
          assert.strictEqual(pluginVal, systemVal)
        })
      }
    })
  }
})
