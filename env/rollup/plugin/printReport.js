import chalk from "chalk"

/**
 * A build reporter for the buildPreset process.
 *
 * @example
 *
 *         ✓ scriptex.plugin.project.template v0.1.0
 *
 *    file : out/preset.js
 *    size : 1.26 kB
 *    data : MINIFY=1,PBCOPY=0,HEADER=0,FORMAT=0
 *
 * @see [buildPreset]{@link env/gulp/task/build.js}
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
  ${chalk[pbcopyOn]("     ✓")} ${chalk.white(`${NAME}`)}${chalk.dim(` v${VERSION}`)}

  ${chalk.grey(`file : out/preset.js`)}
  ${chalk.grey(`size : `)}${chalk.dim(`${kilobytes} kB`)}
  ${chalk.grey(`conf : MINIFY=${MINIFY},PBCOPY=${PBCOPY},HEADER=${HEADER},FORMAT=${FORMAT}`)}
  `)
    return
  }
})

export default printReport
