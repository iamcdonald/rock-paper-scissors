/* global describe, context, it, beforeEach */
'use strict';

var assert = require('assert'),
	Future = require('../../../src/Future'),
	Game = require('../../../src/game/Game'),
	ITEMS = require('../../../src/game/game-items').ITEMS,
	Human = require('../../../src/players/Human');

describe('game/Game', function () {
	
	var testee, p1, p2;
	beforeEach(function () {
		p1 = new Human();
		p2 = new Human();
		testee = new Game(p1, p2);
	});


	describe('constructor', function () {
		it('sets passed args correctly', function () {
			assert(testee.p1, p1);
			assert(testee.p2, p2);
		});
		it('sets _winner to Future', function () {
			assert.equal(testee._winner instanceof Future, true);
		});
		it('sets winner to \'locked\' Future', function () {
			assert.equal(typeof testee.winner.getVal === 'function', true);
			assert.equal(typeof testee.winner.then == 'function', true);
		});
	});
	
	describe('game resolves when both players have set selections', function () {
			
		context('if both players haven\'t made a selection', function () {
			it('returns null - I', function () {
				assert.strictEqual(testee.winner.getVal(), null);
			});
			it('returns null - II', function () {
				p1.setSelection(ITEMS.ROCK);
				assert.strictEqual(testee.winner.getVal(), null);
			});
			it('returns null - III', function () {
				p2.setSelection(ITEMS.SCISSORS);
				assert.strictEqual(testee.winner.getVal(), null);
			});

		});
		
		context('if players have made the same selection', function () {
			beforeEach(function () {
				p1.setSelection(ITEMS.ROCK);
				p2.setSelection(ITEMS.ROCK);
			});

			it('returns null', function () {
				assert.strictEqual(testee.winner.getVal(), null);	
			});	

		});

		context('if both players have made different selections return the winning player', function () {
		
			it('I', function () {
				p1.setSelection(ITEMS.ROCK);
				p2.setSelection(ITEMS.PAPER);
				assert.equal(testee.winner.getVal(), p2);
			});

			it('II', function () {
				p1.setSelection(ITEMS.SCISSORS);
				p2.setSelection(ITEMS.PAPER);
				assert.equal(testee.winner.getVal(), p1);
			});
		});	

	});

});
