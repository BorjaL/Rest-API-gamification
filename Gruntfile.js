module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
	    jshint: {
	    	options: {
	    		curly: true,
	    		eqeqeq: true,
	    		eqnull: true,
	    		expr: true
	    	},
	    	files: {
	    		src: ['model/**/*.js', '*.js', 'config/**/*.js', 'infraestructure/**/*.js', 'test/**/*.js']
		  	},
		},
	    mochaTest: {
	      test: {
	        options: {
	          reporter: 'spec',
	          clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false)
	        },
	        src: ['test/**/*.js']
	      }
	    }
	});
	grunt.registerTask('default', ['jshint','mochaTest']);
};