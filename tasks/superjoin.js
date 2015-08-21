/*
 * grunt-superjoin
 * https://github.com/andi-oxidant/grunt-superjoin
 *
 * Copyright (c) 2015 Andi Heinkelein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var path = require('path');

    var Superjoin = require('superjoin');

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('superjoin', 'Grunt plugin for superjoin the module loader for the web', function() {
        var options = this.options({
            root: process.cwd(),
            dev: false
        });

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var files;

            var superjoin = new Superjoin(options);
            
            if (options.superjoinFile) {
                superjoin.confFiles = [options.superjoinFile];
            }

            var conf = superjoin.getConf();

            if (f.orig.src) {
                files = f.orig.src.map(function(filepath) {
                    return filepath;
                });
            }
            else {
                files = conf.files;
            }

            grunt.log.ok('Setting root dir:', superjoin.root);
            if (options.dev) {
                grunt.log.ok('Enabling developer mode!');
                superjoin.autoload = true;
            }

            superjoin.verbose = true;

            var main = options.main || conf.main;

            //Add banner
            superjoin.banner = options.banner;

            var out = superjoin.join(files, main);
            grunt.file.write(f.dest, out);
        });
    });

};
