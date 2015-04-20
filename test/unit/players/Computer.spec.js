/* global describe, context, it, beforeEach */
'use strict';

var assert = require('assert'),
	itemsArray = require('../../../src/game/game-items').itemsArray,
	Future = require('../../../src/Future'),
	Player = require('../../../src/players/Player'),
	Computer = require('../../../src/players/Computer');

describe('players/Computer', function () {
	
	var testee;
	beforeEach(function () {
		testee = new Computer();
	});

	it('inherits from Player', function () {
		assert.equal(testee instanceof Player, true);
	});

	describe('constructor', function () {
		it('sets title to \'Computer\'', function () {
			assert.equal(testee.title, 'Computer');
		});
		
		it('it initializes _selection to Future with null _val', function () {
			assert.equal(testee._selection instanceof Future, true);
			assert.strictEqual(testee._selection._val, null);
		});
		it('set up selected as \'locked\' Future', function () {
			assert.equal(typeof testee.selected.getVal === 'function', true);
			assert(typeof testee.selected.then === 'function', true);
		});
		it('sets type to \'computer\'', function () {
			assert.equal(testee.type, 'computer');
		});
	});

	describe('setSelection', function () {
		
		context('_selection not already set', function () {
			it('randomly assigns a valid \'item\'', function () {
				var itemsCount = itemsArray.reduce(function (curr, item) {
						curr[item.title] = 0;
						return curr;
					}, {}),
					total = 0,
					iterations = 100 * itemsArray.length,
					i,
					l;

				for (i = iterations; i--;) {
					testee = new Computer();
					testee.setSelection();
					assert(testee.selected.getVal());
					itemsCount[testee.selected.getVal().title]++;
				}
				for (i = 0, l = itemsArray.length; i < l; i++) {
					total += itemsCount[itemsArray[i].title]; 
					assert(itemsCount[itemsArray[i].title] > 80 && itemsCount[itemsArray[i].title] < 120, 'expected ' + itemsArray[i].title + ' count (' + itemsCount[itemsArray[i].title] + ') to be between 80 and 120');
				}
				assert.equal(total, iterations);

			});	
		});

		context('_selection already set', function () {
			it('does nothing', function () {
				var initial = 'A Thing';
				testee._selection.resolve(initial);
				
				for(var i = 100; i--;) {
					testee.setSelection();	
				}
				assert.equal(testee.selected.getVal(), initial);
			});
		});
	});

	describe('getSelection', function () {
		it('returns the current selection value', function () {
			assert.strictEqual(testee.getSelection(), null);
			testee.setSelection();
			assert.equal(itemsArray.indexOf(testee.getSelection()) >= 0, true);
		});
	});
});
