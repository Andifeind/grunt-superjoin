'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.superjoin = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  bundle1: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/bundle1.js');
    var expected = grunt.file.read('test/expected/bundle1.js');
    test.equal(actual, expected, 'Should create a bundle of local modules');

    test.done();
  },
  bundle2: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/bundle2.js');
    var expected = grunt.file.read('test/expected/bundle2.js');
    test.equal(actual, expected, 'Should create a bundle, reads files from a superjoin.json file');

    test.done();
  }
};
