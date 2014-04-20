
module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({

    copy: {
      build: {
        cwd: 'source',
        src: [ '**' ],
        dest: 'BitcoinRate.wdgt',
        expand: true
      }
    },

    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      scripts: {
        options: {
          destPrefix: 'source/scripts/vendor'
        },
        files: {
          'd3/d3.min.js': 'd3/d3.min.js'
        }
      }
    }

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bowercopy');

  // define the tasks
};
