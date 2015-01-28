module.exports = function(grunt) {

	grunt.initConfig({
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				// Files in the right order to concat
				src: ['quiz-blocks/load.js', 'quiz-blocks/mainmenu.js', 'quiz-blocks/block.js', 'quiz-blocks/game.js', 'quiz-blocks/init.js'],
				dest: 'quiz-blocks.js' //TODO: make a package.json read from there (see https://github.com/gruntjs/grunt-contrib-concat)
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat']);

};