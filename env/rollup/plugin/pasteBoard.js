import childProcess from "child_process"
import chalk from "chalk" // transitive dep via Gulp

const { green, grey, white } = chalk
/**
 * A utility plugin that reads the contents of the latest buildfile
 * and copies that to the system pasteboard
 * @return {Object} The plugin implementation
 */
const pasteBoard = () => ({
  name: "scriptex-pasteboard"
, generateBundle ( assetInfo, chunkInfo ) {
    const {
      npm_package_name: NAME
    , npm_package_version: VERSION
    , npm_config_FORMAT: FORMAT=false
    , npm_config_MINIFY: MINIFY=true
    }= process.env

    const [ key ]= Object.keys(chunkInfo)
    const { code }= Reflect.get(chunkInfo, key)
    const { stdin }= childProcess.spawn('pbcopy');
    const { length:bytes }= Buffer.from(code)
    const kilobytes= (bytes/1000).toFixed(2)
    const fileState= `MINIFY=${ MINIFY ? `true,FORMAT=${FORMAT ? "true":"false"}` : "false" }`
    const advisory= `
  ${grey(`SCRIPTEX-PASTEBOARD`)}

  ${green("✓")} ${white(`${NAME} v${VERSION}`)}

  ${grey(`size : `)}${kilobytes} kB
  ${grey(`file : out/preset.js (${fileState})`)}
  `
    stdin.write(code)
    stdin.end()
    console.info(advisory)
    return
  }
})

export default pasteBoard
