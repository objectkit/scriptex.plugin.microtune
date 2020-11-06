/* @fix set cwd to project root */
process.chdir(`../../`)

import gulp from "gulp"
import { build, buildSource, buildPreset } from "./task/build.js"
import watch from "./task/watch.js"

gulp.task(buildSource)
gulp.task(buildPreset)
gulp.task(watch)
gulp.task(`build`, build)
gulp.task(`default`, gulp.series(build) )
