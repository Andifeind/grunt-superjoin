
/*
 * grunt-superjoin
 * https://github.com/andi-oxidant/grunt-superjoin
 *
 * Copyright (c) 2015 Andi Heinkelein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    superjoin: {
      bundle1: {
        options: {
          root: 'test/',
          main: './fixtures/module1.js',
          banner: '/*!\n * My Superbundle\n */'
        },
        src: ['./fixtures/module1.js', './fixtures/module2.js'],
        dest: 'tmp/bundle1.js'
      },
      bundle2: {
        options: {
          root: 'test/'
        },
        dest: 'tmp/bundle2.js'
      }
    },
    nodeunit: {
      tests: ['test/*_test.js']
    },
    release: {
        options: {
            npm: true,
            indentation: '    ',
            tagName: ' v<%= version %>', //default: '<%= version %>' 
            commitMessage: 'release v<%= version %>', //default: 'release <%= version %>' 
            tagMessage: 'release v<%= version %>' //default: 'Version <%= version %>', 
        }
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'superjoin', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
