'use strict';

var grunt = require('grunt');

exports.superjoin = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  bundle1: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/bundle1.js');
    var expected = grunt.file.read('test/expected/bundle1.js');
    test.equal(actual, expected, 'Should create a bundle of local modules');

    test.done();
  },
  bundle2: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/bundle2.js');
    var expected = grunt.file.read('test/expected/bundle2.js');
    test.equal(actual, expected, 'Should create a bundle, reads files from a superjoin.json file');

    test.done();
  }
};
