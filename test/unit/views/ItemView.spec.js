/* global describe, it, beforeEach */
'use strict';


var assert = require('assert'),
	itemViewTemplate = require('../../../src/views/ItemView'),
	gameItems = require('../../../src/game/game-items');


describe('views/ItemView', function () {
	
	it('exports string', function () {
		assert.equal(typeof itemViewTemplate === 'string', true);
	
	});

	it('contains all items', function () {
		var str = '<div class="item {{title}}" data-id="{{id}}">',
			subs,
			regex;
		for(var i = 0; i < gameItems.itemsArray.length; i++) {
			subs = str.replace(/{{title}}/, gameItems.itemsArray[i].title);
			subs = subs.replace(/{{id}}/, gameItems.itemsArray[i].id);
			regex = new RegExp('.*' + subs + '.*');
			assert.equal(regex.test(itemViewTemplate), true);
		}
	});

});
