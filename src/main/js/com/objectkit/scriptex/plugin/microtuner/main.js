import { Scripter } from "@objectkit/scriptex"
import { Microtuner } from "./Microtuner"

/* trace a welcome message to console */
Scripter.Trace(`


   m i c r o t u n e r

   license: Apache-2.0 (c) ObjectKit 2020
   about: https://github.com/objectkit/scriptex.plugin.microtuner

   This plugin provides cent-interval microtuning capabilities to MIDI instruments
   that can receive pitchbends.

`)
/* deploy the plugin to Scripter */
Microtuner.deploy()//.forEach(Scripter.Trace)
