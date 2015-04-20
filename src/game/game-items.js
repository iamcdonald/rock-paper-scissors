'use strict';

var GameItem = require('./GameItem'),
	itemsArray = require('../config.json'),
	ITEMS = {};

itemsArray = itemsArray.map(function (item) {
	return new GameItem(item.title, item.beats);
});

for (var i = 0; i < itemsArray.length; i++) {
	ITEMS[itemsArray[i].title.toUpperCase()] = itemsArray[i];
}

module.exports = {
	ITEMS: ITEMS,
	itemsArray: itemsArray
};
