/* global describe, it, beforeEach */
'use strict';

var assert = require('assert'),
	GameItem = require('../../../src/game/GameItem');

describe('game/GameItem', function () {

	describe('constructor', function () {
		it ('sets title to the passed in value', function () {
			var title = 'A thing',
				testee = new GameItem(title);
			assert.equal(testee.title, title);
		});

		it('sets _lesser to passed in argument', function () {
			var lsr = ['One', 'Two'],
				testee = new GameItem('title', lsr);

			assert.equal(testee._lesser, lsr);
		});
		it('sets _lesser to empty array if no argument', function () {
			var testee = new GameItem('title');
			assert.deepEqual(testee._lesser, []);
		});
	});	

	describe('beats', function () {
		
		var testee1, testee2;
		beforeEach(function () {
			testee1 = new GameItem('title', ['One', 'Two']);
			testee2 = new GameItem('Two', ['One']);
		});
		
		it('returns true when passed in item has title found in _lesser', function () {
			assert.equal(testee1.beats(testee2), true);
		});
		
		it('returns false when passed in item has title not found in _lesser', function () {
			assert.equal(testee2.beats(testee1), false);
		});
	});
});
