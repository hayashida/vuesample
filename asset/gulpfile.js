const gulp = require('gulp');
const path = require('path');

const browserify = require('browserify');
const vueify = require('vueify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const jsEntities = {
	src: './js/',
	dest: '../js/',
	files: [
		'app.js'
	]
};

gulp.task('js', () => {
	jsEntities.files.forEach(entry => {
		browserify(path.join(jsEntities.src, entry), {
			debug: true,
			extensions: ['.js', '.vue'],
			transform: [
				vueify,
				babelify.configure({ 'presets': ['es2015'] })
			]
		})
		.bundle()
		.on('error', err => {
			console.log(err.message);
			console.log(err.stack);
		})
		.pipe(source(entry))
		.pipe(buffer())
		.pipe(gulp.dest(jsEntities.dest));
	});
});

gulp.task('default', () => {
	gulp.watch(path.join(jsEntities.src, '**/*.*'), ['js']);
});