import childProcess from "child_process"
import dotenv from "dotenv"
import chalk from "chalk"

/**
 * A utility build plugin that prints build reports to the console.
 *
 */
const printReport= () => ({

  name: "scriptex-print-report"

, generateBundle ( assetInfo, chunkInfo ) {
    const {
      MINIFY=1, FORMAT=0, HEADER=0, PBCOPY=0, REPORT=0
    , npm_package_name: NAME
    , npm_package_version: VERSION
    }= process.env

    const [ key ]= Object.keys(chunkInfo)
    const { code }= Reflect.get(chunkInfo, key)

    const { length:bytes }= Buffer.from(code)
    const kilobytes= (bytes/1000).toFixed(2)

    const pbcopyOn= +PBCOPY ? `green` : `grey`

    console.info(`
  ${chalk[pbcopyOn]("     ✓")} ${chalk.white(`${NAME} v${VERSION}`)}

  ${chalk.grey(`file : out/preset.js`)}
  ${chalk.grey(`size : `)}${chalk.dim(`${kilobytes} kB`)}
  ${chalk.grey(`meta : MINIFY=${MINIFY}`)}
  ${chalk.grey(`     : PBCOPY=${PBCOPY}`)}
  ${chalk.grey(`     : HEADER=${HEADER}`)}
  ${chalk.grey(`     : FORMAT=${FORMAT}`)}
  `)
    return
  }
})

export default printReport
