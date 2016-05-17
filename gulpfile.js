var gulp = require("gulp"),
	sass = require("gulp-sass"),
	jade = require("gulp-jade"),
	concat = require("gulp-concat");

gulp.task('sass',function(){
	gulp.src("css/estilos.scss")
	.pipe(sass("estilos.min.css"))
	.pipe(gulp.dest(""))
})
gulp.task('jade',function(){
	gulp.src("templates/*.jade")
	.pipe(jade({pretty:true}))
	.pipe(gulp.dest(""))
})

gulp.task("concat",function(){
	gulp.src("js/**/*.js")
	.pipe(concat("app.js"))
	.pipe(gulp.dest(""))
})


gulp.task("watch",["sass","jade","concat"],function(){
	gulp.watch("css/**/*.scss",["sass"])
	gulp.watch("templates/*.jade",["jade"])
	gulp.watch("js/**/*.js",["concat"])
})
gulp.task("default",["watch"])