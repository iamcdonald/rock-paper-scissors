/* global describe, it, beforeEach */
'use strict';

var assert = require('assert'),
	Future = require('../../../src/Future'),
	Player = require('../../../src/players/Player'),
	Human = require('../../../src/players/Human');

describe('players/Human', function () {

	var testee;
	beforeEach(function () {
		testee = new Human();
	});

	it('inherits from Player', function () {
		assert.equal(testee instanceof Player, true);
	});

	describe('constructor', function () {
		it('passes title through to Player constructor', function () {
			var name = 'Jen';
			testee = new Human(name);
			assert.equal(testee.title, name);
		});
		
		it('initializes _selection to Future with null _val', function () {
			assert.equal(testee._selection instanceof Future, true);
			assert.strictEqual(testee._selection._val, null);
		});
		it('initializes selected to \'locked\' Future', function () {
			assert.equal(typeof testee.selected.getVal === 'function', true);
			assert.equal(typeof testee.selected.then === 'function', true);
		});
		it('sets type to \'human\'', function () {
			assert.equal(testee.type, 'human');
		});
	});

	describe('setSelection', function () {
		it('should set _selection', function () {
			var item = 'selected item';
			testee.setSelection(item);
			assert.equal(testee.selected.getVal(), item);
		});
	});

	describe('getSelection', function () {
		it('should get _selection', function () {
			var item = 'another item';
			testee.setSelection(item);
			testee.getSelection();
			assert.equal(testee.getSelection(), item);
		});
	});


});
