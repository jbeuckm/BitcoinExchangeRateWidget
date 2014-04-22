
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
    clean: {
      build: {
        src: [ 'BitcoinRate.wdgt' ]
      },
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
    },


    command : {
      run_shell: {
        type : 'shell',
        cmd  : './clear_dock_cache.sh'
      },
    },

  });

  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory.',
    [ 'clean', 'command', 'bowercopy', 'copy' ]
  );

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-commands');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // define the tasks
};
