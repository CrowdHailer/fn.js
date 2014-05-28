var fs = require('fs');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
	scope: ['devDependencies']
});
var args = require('yargs').argv;
var spawn = require('child_process').spawn;

gulp.task('lint', function () {
	return gulp
		.src(['./src/index.js'])
		.pipe(plugins.eslint({
			globals: {
				'fn': true
			}
		}))
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failOnError());
});

gulp.task('test', ['lint'], function () {
	return gulp
		.src(['./tests/**/*.js'])
		.pipe(plugins.mocha({
			reporter: 'spec',
			bail: true,
			globals: ['fn']
		}));
});

gulp.task('wrap', ['test'], function () {
	return gulp
		.src(['./src/index.js'])
		.pipe(plugins.wrapUmd({
			exports: 'fn',
			namespace: 'fn',
			template: fs.readFileSync('./umd.jst', { encoding: 'utf8' })
		}))
		.pipe(plugins.rename('fn.js'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('default', ['wrap']);

gulp.task('bump', function () {
	if (!args.rev) {
		return console.error('You must provide a revision via --rev in order to continue.');
	}

	return gulp
		.src([
			'./package.json',
			'./bower.json'
		])
		.pipe(plugins.bump({ type: gulp.env.rev }))
		.pipe(gulp.dest('./'));
});

gulp.task('tag', ['bump'], function () {
	var pkg = require('./package.json');
	var version = 'v' + pkg.version;

	plugins.git
		.tag(version, 'Tagging release ' + version);
});

gulp.task('push', ['tag'], function () {
	plugins.git
		.push('origin', 'master', { args: '--tags' })
		.end();
});

gulp.task('npm-publish', ['push'], function (done) {
	spawn('npm', ['publish'], { stdio: 'inherit' })
		.on('close', done);
});

gulp.task('release', ['npm-publish']);