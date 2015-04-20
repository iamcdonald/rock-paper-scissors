/* global describe, context, it, beforeEach, afterEach */
'use strict';

var assert = require('assert'),
	proxyquire = require('proxyquire'),
	sinon = require('sinon'),
	Game = require('../../../src/game/Game'),
	players = require('../../../src/players'),
	HumanVsCompGame = require('../../../src/game/HumanVsCompGame');

describe('game/HumanVsCompGame', function () {

	var testee;
	beforeEach(function () {
		testee = new HumanVsCompGame();
	});
	
	it('inherits from Game', function () {
		assert.equal(testee instanceof Game, true);
	});

	describe('constructor', function () {
		var stubs;
		beforeEach(function () {
			sinon.spy(Game, 'call');
			testee = new HumanVsCompGame();
		});

		afterEach(function () {
			Game.call.restore();
		});

		it('calls Game constructor with \'this\' as context', function () {
			assert.equal(Game.call.callCount, 1);
			assert.equal(Game.call.args[0][0], testee);
		});

		it('calls Game constructor with Human and Computer player', function () {
			assert.equal(Game.call.args[0][1] instanceof players.Human, true);
			assert.equal(Game.call.args[0][2] instanceof players.Computer, true);
		});

		it('sets Human title to \'You\'', function () {
			assert.equal(testee.p1.title, 'You');
		});

		it('calls setSelection on Computer player', function () {
			var comp = Game.call.args[0][2];
			assert.equal(comp.getSelection() !== null, true);
		});
	
	});

});
