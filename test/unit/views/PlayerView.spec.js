/* global describe, context, it, beforeEach */
'use strict';

var assert = require('assert'),
	sinon = require('sinon'),
	gameItems = require('../../../src/game/game-items'),
	players = require('../../../src/players'),
	PlayerView = require('../../../src/views/PlayerView');

describe('views/PlayerView', function () {
	
	var testee,
		player;
	beforeEach(function () {
		player = new players.Human();
		testee = new PlayerView(player);
	});	

	describe('constructor', function () {
		it('sets passed in player to player', function () {
			assert.equal(testee.player, player);
		});

		describe('render', function () {
			
			function click(elem) {
				var ev = global.document.createEvent('MouseEvents');
				ev.initEvent('click', true, true);
				elem.dispatchEvent(ev);
			}

			beforeEach(function () {
				sinon.stub(testee.player, 'setSelection');	
			});

			it('replaces {{type}} and {{content}}', function () {
				assert.equal(/.*{{(type|content)}}.*/g.test(testee.view.innerHTML), false);
			});

			it('adds item view', function () {
				assert.equal(testee.view.getElementsByClassName('item').length, 3);
			});
			
			context('player is Human', function () {
				describe('adds click handler to view', function () {
					it('sets player selection to item clicked - ROCK', function () {
						click(testee.view.getElementsByClassName('item')[0]);
						assert.equal(testee.player.setSelection.callCount, 1);
						assert.equal(testee.player.setSelection.args[0][0], gameItems.ITEMS.ROCK);
					});
					
					it('sets player selection to item clicked - PAPER', function () {
						click(testee.view.getElementsByClassName('item')[1]);
						assert.equal(testee.player.setSelection.callCount, 1);
						assert.equal(testee.player.setSelection.args[0][0], gameItems.ITEMS.PAPER);
					});

					it('sets player selection to item clicked - SCISSOR', function () {
						click(testee.view.getElementsByClassName('item')[2]);
						assert.equal(testee.player.setSelection.callCount, 1);
						assert.equal(testee.player.setSelection.args[0][0], gameItems.ITEMS.SCISSORS);
					});
				});
			});

			context('player is not human', function () {
			
				beforeEach(function () {
					player = new players.Computer();
					testee = new PlayerView(player);
					sinon.stub(testee.player, 'setSelection');
				});

				it('does not add click handler', function () {
					click(testee.view.getElementsByClassName('item')[1]);
					assert.equal(testee.player.setSelection.callCount, 0);
				});

			});
		});
		
		describe('callback added to player.selected Future', function () {
			
			function findElem(dataId) {
				var childNodes = testee.view.childNodes;
				for(var i = 0; i < childNodes.length; i++) {
					if (childNodes[i].nodeType === 1 && childNodes[i].getAttribute('data-id') === dataId) {
						return childNodes[i];
					}
				}
			}

			it('adds callback', function () {
				assert.equal(testee.player._selection._callbacks.length, 1);
			});

			it('sets the selection made correctly for Rock', function () {
				testee.player.setSelection(gameItems.ITEMS.ROCK);
				assert.equal(/.*has-chosen.*/.test(testee.view.className), true);
				var rockElem = findElem(gameItems.ITEMS.ROCK.id);
				assert.equal(/.*is-selected.*/.test(rockElem.className), true);	
			});

			it('sets the selection made correctly for Paper', function () {
				testee.player.setSelection(gameItems.ITEMS.PAPER);
				assert.equal(/.*has-chosen.*/.test(testee.view.className), true);
				var paperElem = findElem(gameItems.ITEMS.PAPER.id);
				assert.equal(/.*is-selected.*/.test(paperElem.className), true);	
			});

			it('sets the selection made correctly for Scissors', function () {
				testee.player.setSelection(gameItems.ITEMS.SCISSORS);
				assert.equal(/.*has-chosen.*/.test(testee.view.className), true);
				var scissorsElem = findElem(gameItems.ITEMS.SCISSORS.id);
				assert.equal(/.*is-selected.*/.test(scissorsElem.className), true);	
			});
		});
	});

});
