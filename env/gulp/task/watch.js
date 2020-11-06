import gulp from "gulp"
import { buildPreset, buildSource } from "./build.js"

export default async function watch () {
  return gulp.watch(
    `src/main/js/**/*.js`
  , gulp.series(buildSource, buildPreset)
  )
}
