/*
 * grunt-superjoin
 * https://github.com/Andifeind/grunt-superjoin
 *
 * Copyright (c) 2015 Andi Heinkelein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var path = require('path');

    var Superjoin = require('superjoin');

    grunt.registerMultiTask('superjoin', 'Grunt plugin for superjoin the module loader for the web', function(done) {
        var options = this.options();

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            if (f.orig.src) {
                options.files = f.orig.src.map(function(filepath) {
                    return filepath;
                });
            }

            if (f.dest) {
                options.outfile = f.dest;
            }
            
            var superjoin = new Superjoin(options);
            superjoin.build().then(function(data) {
                done();
            }).catch(function(err) {
                done(err);
            });
        });
    });
};
