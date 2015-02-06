module.exports = function(grunt) {
	var quizBlocksPath = 'js/quiz-blocks';
	grunt.initConfig({
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				// Files in the right order to concat
				src: [quizBlocksPath + '/game.js', quizBlocksPath + '/mainmenu.js', quizBlocksPath + '/block.js', quizBlocksPath + '/question.js', quizBlocksPath + '/init.js'],
				dest: 'js/quiz-blocks.js' //TODO: make a package.json read from there (see https://github.com/gruntjs/grunt-contrib-concat)
			}
		},
		watch: {
			files: [quizBlocksPath + '/game.js', quizBlocksPath + '/mainmenu.js', quizBlocksPath + '/block.js', quizBlocksPath + '/question.js', quizBlocksPath + '/init.js'],
			tasks: ['concat']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat']);

};