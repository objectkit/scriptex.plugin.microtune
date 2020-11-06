import { Scripter } from "@objectkit/scriptex"
import { NewPlugin } from "./NewPlugin"

NewPlugin.deploy().forEach(Scripter.Trace)
