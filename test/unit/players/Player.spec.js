/* global describe, it, beforeEach */
'use strict';

var assert = require('assert'),
	Future = require('../../../src/Future'),
	Player = require('../../../src/players/Player');

describe('players/Player', function () {

	var testee;
	beforeEach(function () {
		testee = new Player();
	});

	describe('constructor', function () {
		describe('title', function () {
			it('sets it to empty string if no arg passed', function () {
				assert.equal(testee.title, ''); 
			});

			it('sets it to passed arg if given', function () {
				var name = 'Bobbo';
				testee = new Player(name);
				assert.equal(testee.title, name);
			});
		});
		
		it('initializes _selection to Future with null _val', function () {
			assert.equal(testee._selection instanceof Future, true);
			assert.strictEqual(testee._selection._val, null);
		});

		it('initializes selected to \'locked\' Future', function () {
			assert.equal(typeof testee.selected.getVal === 'function', true);
			assert.equal(typeof testee.selected.then === 'function', true);
		});
	});

	describe('setSelection', function () {
		it('should resolve _selection Future with passed val', function () {
			var item = 'an item';
			assert.strictEqual(testee.selected.getVal(), null);
			testee.setSelection(item);
			assert.equal(testee.selected.getVal(), item);
		});
	});

	describe('getSelection', function () {
		it('returns the current selection value', function () {
			var item = 'a thing';
			assert.strictEqual(testee.getSelection(), null);
			testee.setSelection(item);
			assert.equal(testee.getSelection(), item);
		});
	});
});
