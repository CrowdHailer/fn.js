var fs = require('fs');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
	scope: ['devDependencies']
});
var args = require('yargs').argv;

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

gulp.task('wrap', ['lint'], function () {
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

gulp.task('test', ['wrap'], function () {
	return gulp
		.src(['./tests/**/*.js'])
		.pipe(plugins.mocha({
			reporter: 'spec',
			bail: true,
			globals: ['fn']
		}));
});

gulp.task('default', ['test']);

gulp.task('bump', function () {
	if (!args.rev && !args.ver) {
		console.error('You must provide a revision via --rev or version via --ver to continue.');
		process.exit(1);
	}

	var options = {};

	if (args.rev) {
		options.type = args.rev;
	} else {
		options.version = args.ver;
	}

	return gulp
		.src([
			'./package.json',
			'./bower.json'
		])
		.pipe(plugins.bump(options))
		.pipe(gulp.dest('./'));
});

gulp.task('tag', function () {
	var pkg = require('./package.json');
	var version = 'v' + pkg.version;

	plugins.git
		.tag(version, 'Tagging release ' + version);

	return plugins.git
		.push('origin', 'master', { args: '--tags' })
		.end();
});