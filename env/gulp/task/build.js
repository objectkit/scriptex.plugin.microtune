import dotenv from "dotenv"
{
  dotenv.config({ path: `../../.env` })
}
import gulp from "gulp"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import multiEntry from "@rollup/plugin-multi-entry"
import includePaths from "rollup-plugin-includepaths"
import rollup from "@rollup/stream"
import source from "vinyl-source-stream"
import pasteBoard from "../../rollup/plugin/pasteBoard.js"
import printReport from "../../rollup/plugin/printReport.js"
import { terser } from "rollup-plugin-terser"
import path from "path"

const { series, parallel, dest }= gulp

/* metadata including build configuration */
const {
  MINIFY=1, PBCOPY=0, FORMAT=0, HEADER=0, REPORT=0
, npm_package_name: NAME
, npm_package_version: VERSION
, npm_package_license: LICENSE
}= process.env

/**
 * Bundle the source files, ignoring main files,
 * into a single es6 module.
 */
async function buildSource () {
  const multiEntryConf= { exports: true }

  const includePathsConf= { paths: [ `src/main/js` ] }

  const nodeResolveConf= { module: true }

  const terserSourceConf= {
    keep_classnames: true,
    keep_fnames: true,
    safari10: true,
    compress: {
      module: true
    },
    mangle: {
      properties: {
        regex: /^_|_$/
      }
    }
  }

  const buildSourceConf= {
    input: "src/main/js/**/[A-Z][!(main)]*.js"
  , output: {
      format: "es"
    }
  , plugins: [
      nodeResolve(nodeResolveConf)
    , multiEntry(multiEntryConf)
    , +MINIFY && terser(terserSourceConf)
    ]
  }

  return (
    rollup(buildSourceConf)
      .on(`error`, console.error)
      .pipe(source("source.js"))
      .pipe(dest("out"))
  )
}

/**
 * Build the plain text source code of a Scripter preset,
 * and copy that source code to the macOS pasteboard.
 *
 * Multiple `main` files detected in the system will
 * cause unpredictable results.
 */
async function buildPreset () {

  const nodeResolveConf= { module: true }

  const multiEntryConf= { exports: true }

  const includePathsConf= { paths: [ `src/main/js` ] }

  const preamble= `/** ${NAME} v${VERSION} license: ${LICENSE} */`

  const terserPresetConf= {
    keep_classnames: false
  , keep_fnames: false
  , safari10: true
  , mangle: {
      reserved: [`Scripter`]
    , properties: {
        regex: /^_|_$/
      }
    }
  , output: {
      beautify: +FORMAT,
      preamble: +HEADER ? preamble : ``
    }
  }

  const buildPresetConf= {
    input: [
      "./src/main/js/**/main.js"
    ]
  , output: {
      format: "es"
    }
  , plugins: [
      nodeResolve(nodeResolveConf),
      multiEntry(multiEntryConf),
      +REPORT && printReport(),
      +PBCOPY && pasteBoard(),
      +MINIFY && terser(terserPresetConf)
    ]
  }

  return (
    rollup(buildPresetConf)
      .on(`error`, console.error)
      .pipe(source(`preset.js`))
      .pipe(dest("out"))
  )
}

/**
 * Build the preset and source library in parallel
 */
const build= gulp.parallel(buildSource, buildPreset)
export { build, buildPreset, buildSource }
