import childProcess from "child_process"

/**
 * A utility plugin that reads the contents of the latest preset build file
 * and copies that into the system pasteboard.
 *
 * You can activate or deactivate this feature with an `.env` file put
 * into project root.
 *
 * ```shell
 * PBCOPY=1
 * ```
 */
const pasteBoard = () => ({

  name: "scriptex-pasteboard"

, generateBundle ( assetInfo, chunkInfo ) {
    const [ key ]= Object.keys(chunkInfo)
    const { code }= Reflect.get(chunkInfo, key)
    const { stdin }= childProcess.spawn('pbcopy');
    stdin.write(code)
    stdin.end()
    return
  }
})

export default pasteBoard
