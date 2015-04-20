/* global describe, context, it, beforeEach */
'use strict';

global.document = require('jsdom').jsdom();
global.document.body.innerHTML = '<div id="game-list"></div>';

var assert = require('assert'),
	gameItems = require('../../../src/game/game-items'),
	Game = require('../../../src/game/Game'),
	Human = require('../../../src/players/Human'),
	GameView = require('../../../src/views/GameView');

describe('views/GameView', function () {
	
	var testee,
		game;
	beforeEach(function () {
		game = new Game(new Human(), new Human());
		testee = new GameView(game); 
	});
	
	describe('constructor', function () {
		it('set game arg to game', function () {
			assert.equal(testee.game, game);
		});

		it('sets player1View to a PlayerViews given p1 from the game', function () {
			assert.equal(testee.player1View.player, game.p1);
		});
	
		it('sets player1View to a PlayerViews given p1 from the game', function () {
			assert.equal(testee.player2View.player, game.p2);
		});

		describe('callback added to game.winner Future', function () {
			it('adds callback', function () {
				assert.equal(testee.game._winner._callbacks.length, 1);
			});
			
			it('sets outcome correctly for draw', function () {
				testee.game.p1.setSelection(gameItems.ITEMS.ROCK);
				testee.game.p2.setSelection(gameItems.ITEMS.ROCK);
				assert.equal(/.*game-finished.*/.test(testee.view.className), true);
				var outcome = testee.view.getElementsByClassName('outcome')[0];
				assert.equal(/.*is-visible.*is-draw.*/.test(outcome.className), true);
				assert.equal(outcome.innerHTML, 'I\'m afraid it\'s a tie old chap.');
			});
			
			it('sets outcome correctly for win', function () {
				testee.game.p1.setSelection(gameItems.ITEMS.ROCK);
				testee.game.p2.setSelection(gameItems.ITEMS.SCISSORS);
				assert.equal(/.*game-finished.*/.test(testee.view.className), true);
				var outcome = testee.view.getElementsByClassName('outcome')[0];
				assert.equal(/.*is-visible.*is-win.*/.test(outcome.className), true);
				assert.equal(outcome.innerHTML, 'Whato, jolly good show. You\'ve won. I\'ll fetch the champagne.');
			});
			
			it('sets outcome correctly for lose', function () {
				testee.game.p1.setSelection(gameItems.ITEMS.ROCK);
				testee.game.p2.setSelection(gameItems.ITEMS.PAPER);
				assert.equal(/.*game-finished.*/.test(testee.view.className), true);
				var outcome = testee.view.getElementsByClassName('outcome')[0];
				assert.equal(/.*is-visible.*is-loss.*/.test(outcome.className), true);
				assert.equal(outcome.innerHTML,  'Looks like a spot of bad luck old bean. Better luck next time.');
			});
		});
			
		describe('render', function () {
			it('replaces {{id}} placeholder with auto increment id game-*', function () {
				assert.equal(/game-[^0]/.test(testee.view.id), true);
				var idx = parseInt(testee.view.id.match(/game-(.*)/)[1], 10);
				testee = new GameView(game);
				assert.equal(testee.view.id, 'game-' + (idx+1));
			});
			
			it('adds player views', function () {
				assert.equal(testee.view.getElementsByClassName('player').length, 2);
			});	

			it('inserts the view at the top of game-list div', function () {
				function getIndex(view) {
					return parseInt(view.id.match(/game-(.*)/)[1], 10);
				}
				var games = global.document.getElementsByClassName('game-finished'),
					idx = getIndex(games[0]),
					curr;
				
				for(var i = 1; i < games.length; i++) {
					curr = getIndex(games[i]);
					assert(curr < idx, true);
					idx = curr;
				}	
			});
		});
	});


});
