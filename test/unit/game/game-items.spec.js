/* global describe, it */
'use strict';

var assert = require('assert'),
	proxyquire = require('proxyquire').noCallThru(),
	GameItem = require('../../../src/game/GameItem');

describe('game/game-items', function () {

	describe('creates array of game items read from config.json', function () {
	
		it('I', function () {
			var	config = [{
					'title': 'One',
					'beats': ['Two']
				}, {
					'title': 'Two',
					'beats': []
				}],
				gameItems = proxyquire('../../../src/game/game-items', {
					'../config.json': config				
				});
			
			for (var i = 0; i < config.length; i++) {
				assert.equal(gameItems.itemsArray[i] instanceof GameItem, true);
				assert.equal(gameItems.itemsArray[i].title, config[i].title);
				assert.equal(gameItems.itemsArray[i]._lesser, config[i].beats);
			}
		});
		
		it('II', function () {
			var	config = [{
					'title': 'a',
					'beats': ['c', 'b']
				}, {
					'title': 'c',
					'beats': ['b', 'e']
				}, {
					'title': 'b',
					'beats': ['c']
				}],
				gameItems = proxyquire('../../../src/game/game-items', {
					'../config.json': config				
				});
		
			for (var i = 0; i < config.length; i++) {
				assert.equal(gameItems.itemsArray[i] instanceof GameItem, true);
				assert.equal(gameItems.itemsArray[i].title, config[i].title);
				assert.equal(gameItems.itemsArray[i]._lesser, config[i].beats);
			}
		});
	});
	describe('creates map of game items read from config.json', function () {
	
		it('I', function () {
			var	config = [{
					'title': 'One',
					'beats': ['Two']
				}, {
					'title': 'Two',
					'beats': []
				}],
				gameItems = proxyquire('../../../src/game/game-items', {
					'../config.json': config				
				});
			
			assert.equal(gameItems.ITEMS.ONE instanceof GameItem, true);
			assert.equal(gameItems.ITEMS.ONE.title, config[0].title);
			assert.equal(gameItems.ITEMS.ONE._lesser, config[0].beats);
			assert.equal(gameItems.ITEMS.TWO instanceof GameItem, true);
			assert.equal(gameItems.ITEMS.TWO.title, config[1].title);
			assert.equal(gameItems.ITEMS.TWO._lesser, config[1].beats);
 
		});
		
		it('II', function () {
			var	config = [{
					'title': 'a',
					'beats': ['c', 'b']
				}, {
					'title': 'c',
					'beats': ['b', 'e']
				}, {
					'title': 'b',
					'beats': ['c']
				}],
				gameItems = proxyquire('../../../src/game/game-items', {
					'../config.json': config				
				});
			
			assert.equal(gameItems.ITEMS.A instanceof GameItem, true);
			assert.equal(gameItems.ITEMS.A.title, config[0].title);
			assert.equal(gameItems.ITEMS.A._lesser, config[0].beats);
			assert.equal(gameItems.ITEMS.C instanceof GameItem, true);
			assert.equal(gameItems.ITEMS.C.title, config[1].title);
			assert.equal(gameItems.ITEMS.C._lesser, config[1].beats);
			assert.equal(gameItems.ITEMS.B instanceof GameItem, true);
			assert.equal(gameItems.ITEMS.B.title, config[2].title);
			assert.equal(gameItems.ITEMS.B._lesser, config[2].beats);
		
		});
	});

});
