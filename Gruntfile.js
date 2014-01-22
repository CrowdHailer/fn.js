module.exports = function (grunt) {

	grunt.initConfig({
		bump: {
			options: {
				commit: true,
				createTag: true,
				push: true,
				pushTo: 'origin'
			}
		},
		umd: {
			main: {
				src: 'src/index.js',
				dest: 'build/fn.js',
				objectToExport: 'fn',
				globalAlias: 'fn',
				deps: {}
			}
		},
		jshint: {
			main: {
				files: {
					src: ['src/**/*.js']
				},
				options: {
					jshintrc: '.jshintrc'
				}
			}
		},
		cafemocha: {
			main: {
				src: 'tests/**/*.js',
				options: {
					ui: 'tdd',
					reporter: 'spec',
					require: [
						'chai'
					]
				}
			}
		}
	});

	grunt.registerTask('default', ['jshint:main', 'umd:main', 'cafemocha:main']);

	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-umd');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-cafe-mocha');
};