/* global describe, context, it, beforeEach */
'use strict';

var assert = require('assert'),
	Future = require('../../src/Future');

describe('Future', function () {

	var testee;
	beforeEach(function () {
		testee = new Future();
	});

	describe('constructor', function () {
		it('sets up _callbacks as empty array', function () {
			assert.deepEqual(testee._callbacks, []);
		});
		it('sets up _val as null', function (){
			assert.strictEqual(testee._val, null);
		});
	});

	describe('then', function () {
		context('when Future has not yet resolved', function () {
			it('adds function to _callbacks array', function () {
				function func() {}
				testee.then(func);
				assert.equal(testee._callbacks.length, 1);
				assert.equal(testee._callbacks[0], func);
			});
		});
		context('when Future has already resolved', function () {
			it('calls function immediately with resolved value', function () {
				var val = null,
					expected = 'a value';
				function func (v) {
					val = v;
				}
				testee.resolve(expected);
				assert.strictEqual(val, null);
				testee.then(func);
				assert.strictEqual(val, expected);
			});
		});
	});

	describe('lock', function () {
		
		var locked;
		beforeEach(function () {
			locked = testee.lock();
		});

		it('returns a \'locked\' Future suitable for use outside the original object', function () {
			assert.equal(typeof locked.getVal === 'function', true);
			assert.equal(typeof locked.then === 'function', true);
			assert.equal(typeof locked.resolve === 'undefined', true);
		});

		describe('getVal', function () {
			describe('is alias to \'getVal\' on original Future', function () {
				it('returns the original Future\'s current value', function () {
					testee._val = 'things';
					assert.equal(locked.getVal(), testee._val);
				});
			});
		});

		describe('then', function () {
		
			describe('is alias to \'then\' on original Future', function () {
				context('when original Future has not yet resolved', function () {
					it('adds function to _callbacks array', function () {
						function func() {}
						locked.then(func);
						assert.equal(testee._callbacks.length, 1);
						assert.equal(testee._callbacks[0], func);
					});
				});
				context('when orignal Future has already resolved', function () {
					it('calls function immediately with resolved value', function () {
						var val = null,
						expected = 'a value';
						function func (v) {
							val = v;
						}
						testee.resolve(expected);
						assert.strictEqual(val, null);
						locked.then(func);
						assert.strictEqual(val, expected);
					});
				});	
			});

		});

	});

	describe('resolve', function () {
		context('Future has not already been resolved', function () {
			it('calls all callbacks with the resolved value', function () {
				var called = 0,
				expected = 'resolve val';
				function func(v) {
					assert.equal(v, expected);
					called++;
				}	
				for (var i = 100; i--;) {
					testee.then(func);
				}
				testee.resolve(expected);
				assert.equal(called, 100);
			});
			it('set _val to resolved value', function () {
				assert.strictEqual(testee._val, null);
				testee.resolve(12345);
				assert.equal(testee._val, 12345);
			});
		});
		context('Future has already been resolved', function () {
			it('does nothing', function () {
				testee.resolve('one');
				assert.equal(testee._val, 'one');
				testee.resolve('two');
				assert.equal(testee._val, 'one');
			});
		});	
	});

});

describe('Future.all', function () { 
	it('returns a \'locked\' future', function () {
		var fa = Future.all([]);
		assert.equal(typeof fa.getVal === 'function', true);
		assert.equal(typeof fa.then === 'function', true);
		assert.equal(typeof fa.resolve === 'undefined', true);
	});

	it('resolves with array of vals when all passed futures have resolved', function () {
		var f1 = new Future(),
			f2 = new Future(),
			fa = Future.all([f1.lock(), f2.lock()]),
			resVal = null,
			expected;
		function func(v) {
			resVal = v;
		}
		fa.then(func);
		f2.resolve('one');
		f1.resolve('two');
		expected = [f1.getVal(), f2.getVal()];
		assert.deepEqual(resVal, expected);
		assert.deepEqual(fa.getVal(), expected);
	});

	it('resolves immediately if all futures have already resolved', function () {
		var f1 = new Future(),
			f2 = new Future(),
			resVal = null,
			fa,
			expected;
		function func(v) {
			resVal = v;
		}
		f2.resolve('one');
		f1.resolve('two');
		
		fa = Future.all([f1.lock(), f2.lock()]);
		fa.then(func);
		expected = [f1.getVal(), f2.getVal()];
		assert.deepEqual(resVal, expected);
		assert.deepEqual(fa.getVal(), expected);
	});
});
