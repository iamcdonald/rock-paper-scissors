'use strict';

var singleItemViewTemplate = require('./ItemViewTemplate.js'),
	gameItems = require('../game/game-items'),
	itemView = (function () {
		var template = '',
			replaceFunc = function (item) {
				return function (_, match) {
					return item[match];
				};	
			};
		for(var i = 0; i < gameItems.itemsArray.length; i++) {
			template += singleItemViewTemplate.replace(/{{([a-zA-Z]*)}}/g, replaceFunc(gameItems.itemsArray[i]));
		}
		return template;
	}());

module.exports = itemView;
